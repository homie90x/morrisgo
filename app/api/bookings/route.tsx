import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";


function verifyToken(request: Request) {
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) return null;

    try {
        return jwt.verify(token, process.env.JWT_SECRET || "your secret-key") as {
            userId: string;
            email: string;
            role: string;
        };
    } catch {
        return null;
    }
}


export async function GET(request: Request) {
    try {
        const decoded = verifyToken(request);
        if (!decoded) {
            return NextResponse.json({error: "Unauthorized" }, { status: 401 });

        }


    //Get user to check role

        const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
        });

    let bookings;

    if (user?.role === "DRIVER") {
        bookings = await prisma.booking.findMany({
            where: {
                OR: [
                    { driverId: decoded.userId },
                    {
                        AND: [
                            { driverId: null },
                            { status: "PENDING" },
                        ]
                    }
                ]
            },
            include: {
                rider: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    }
                },
                driver: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    }
                },

                ride: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    } else {
        bookings = await prisma.booking.findMany({
            where: {
                riderId: decoded.userId,

            },
        include: {
          rider: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            }
          },
          driver: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            }
          },
          ride: true,
        },
        orderBy: {
          createdAt: "desc"
        }
      });
    }

    return NextResponse.json(bookings);
} catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
        { error: "Failed to fetch bookings" },
        { status: 500 }
    );
}
}

