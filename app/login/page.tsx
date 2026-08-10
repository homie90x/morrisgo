"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setAuthData } from "@/lib/auth-client";
import logo from "../logo.png";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          action: "login",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      setAuthData(data.token, data.user);

      if (data.user.role === "DRIVER") {
        router.push("/rides");
      } else {
        router.push("/bookings");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between px-8 pt-8 pb-4 bg-white">
        <Link href="/signup" className="text-sm font-medium text-gray-500 hover:text-[#7a0019]">
          Sign Up
        </Link>
        <Link href="/" className="flex items-center" aria-label="MorrisGo home">
          <Image src={logo} alt="MorrisGo logo" width={140} height={40} className="h-10 w-auto" />
        </Link>
        <Link href="/bookings" className="text-sm text-gray-500 hover:text-[#7a0019]">
          My Bookings
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <section className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#800000]">
              Welcome back
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-[-0.04em] text-[#800000] leading-tight">
              Sign in to continue your ride.
            </h1>
            <p className="text-lg text-gray-600">
              Book rides, track your upcoming trips, and get where you need to go with MorrisGo.
            </p>

            <div className="rounded-[18px] bg-[#800000] p-6 text-white shadow-lg">
              <div className="text-2xl font-semibold">Travel with confidence</div>
              <div className="mt-2 text-sm text-white/90">
                A simple and reliable experience for riders and drivers across Morris and nearby cities.
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Sign in</h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter your email and password to continue.
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:border-[#800000] focus:outline-none focus:ring-2 focus:ring-[#800000]/20"
                  placeholder="Email address"
                />
              </div>

              <div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:border-[#800000] focus:outline-none focus:ring-2 focus:ring-[#800000]/20"
                  placeholder="Password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-[#800000] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#660000] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              New here?{' '}
              <Link href="/signup" className="font-medium text-[#800000] hover:text-[#660000]">
                Create an account
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}