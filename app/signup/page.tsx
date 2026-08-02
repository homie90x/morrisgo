"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../logo.png";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleCreateAccount() {
    console.log("Signup form submitted", { email, password });
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between px-8 pt-8 pb-4 bg-white">
        <Link href="/signup" className="text-sm font-medium text-gray-500 hover:text-[#7a0019]">
          Sign Up
        </Link>
        <Link href="/" className="flex items-center" aria-label="MorrisGo home">
          <Image src={logo} alt="MorrisGo logo" width={140} height={40} className="h-10 w-auto" />
        </Link>
        <Link href="/" className="text-sm text-gray-500 hover:text-[#7a0019]">
          My Bookings
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <section className="mb-10 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl tracking-[-0.05em] text-[#800000] leading-[0.9]">
            Sign Up
          </h1>
        </section>

        <section>
          <div className="bg-white rounded-2xl border p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border rounded-lg px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#800000]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                id="password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="border rounded-lg px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#800000]"
              />
            </div>

            <button
              type="button"
              onClick={handleCreateAccount}
              className="bg-[#800000] text-white py-3 rounded-xl font-semibold hover:bg-[#660000] mt-2"
            >
              Create New Account  
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}