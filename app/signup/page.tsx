"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import logo from "../logo.png";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "RIDER",
  });

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
          action: "register",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      router.push("/login?registered=true");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between px-8 pt-8 pb-4 bg-white">
        <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-[#7a0019]">
          Sign In
        </Link>
        <Link href="/" className="flex items-center" aria-label="MorrisGo home">
          <Image src={logo} alt="MorrisGo logo" width={140} height={40} className="h-10 w-auto" />
        </Link>
        <Link href="/bookings" className="text-sm text-gray-500 hover:text-[#7a0019]">
          My Bookings
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center">

          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create account</h2>
              <p className="mt-2 text-sm text-gray-600">
                Fill in your details to get started.
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
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:border-[#800000] focus:outline-none focus:ring-2 focus:ring-[#800000]/20"
                  placeholder="Full Name"
                />
              </div>

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
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:border-[#800000] focus:outline-none focus:ring-2 focus:ring-[#800000]/20"
                  placeholder="Password (min 6 characters)"
                />
              </div>

              <div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:border-[#800000] focus:outline-none focus:ring-2 focus:ring-[#800000]/20"
                  placeholder="Phone number (optional)"
                />
              </div>

              <div>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-[#800000] focus:outline-none focus:ring-2 focus:ring-[#800000]/20"
                >
                  <option value="RIDER">I want to book rides</option>
                  <option value="DRIVER">I want to offer rides</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-[#800000] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#660000] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-[#800000] hover:text-[#660000]">
                Sign in
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}