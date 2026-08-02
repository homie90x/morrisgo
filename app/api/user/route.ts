import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper to verify token
function verifyToken(request: Request) {
  const token = request.headers.get("authorization")?.split(" ")[1];
  if (!token) return null;
  
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as { 
      userId: string; 
      email: string; 
      role: string;
    };
  } catch {
    return null;
  }
}

// GET - Fetch user profile
export async function GET(request: Request) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Login or Register
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, phone, role, action } = body;

    // ============ LOGIN ============
    if (action === "login") {
      if (!email || !password) {
        return NextResponse.json(
          { error: "Email and password are required" },
          { status: 400 }
        );
      }

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 }
        );
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 }
        );
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "7d" }
      );

      const { password: _, ...userWithoutPassword } = user;

      return NextResponse.json({
        user: userWithoutPassword,
        token,
      });
    }

    // ============ REGISTER ============
    if (action === "register") {
      if (!email || !password || !name) {
        return NextResponse.json(
          { error: "Email, password, and name are required" },
          { status: 400 }
        );
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          phone: phone || null,
          role: role || "RIDER",
        },
      });

      const { password: _, ...userWithoutPassword } = user;

      return NextResponse.json({
        user: userWithoutPassword,
        message: "User created successfully",
      });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update user profile
export async function PUT(request: Request) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, phone } = body;

    const user = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        name: name || undefined,
        phone: phone || undefined,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}