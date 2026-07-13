"use client";

import Image from "next/image";
import { useState } from "react";
import logo from "./logo.png";

const FAKE_RIDES = [
  {
    id: 1,
    driver: "Alex Johnson",
    from: "Downtown",
    to: "Airport",
    time: "9:00 AM",
    seats: 3,
    price: "$12",
  },
  {
    id: 2,
    driver: "Maria Garcia",
    from: "Uptown",
    to: "Mall",
    time: "10:30 AM",
    seats: 2,
    price: "$8",
  },
  {
    id: 3,
    driver: "Sam Lee",
    from: "East Side",
    to: "University",
    time: "11:00 AM",
    seats: 4,
    price: "$6",
  },
];

export default function Dashboard() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [rides, setRides] = useState<typeof FAKE_RIDES>([]);
  const [searched, setSearched] = useState(false);

  function handleSearch() {
    // Later this will call the real API
    setRides(FAKE_RIDES);
    setSearched(true);
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 pt-8 pb-4 bg-white">
        <a href="/signup/signup.tsx" className="text-sm font-medium text-gray-500 hover:text-[#7a0019]">Sign Up</a>
        <a href="/" className="flex items-center" aria-label="MorrisGo home">
          <Image src={logo} alt="MorrisGo logo" width={140} height={40} className="h-10 w-auto" />
        </a>
        <a href="/" className="text-sm text-gray-500 hover:text-[#7a0019]">My Bookings</a>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <section className="mb-12 flex flex-col items-left gap-8 text-left">
          <div className="space-y-3">
            <h1 className="text-7xl sm:text-8xl md:text-9xl tracking-[-0.05em] text-[#800000] leading-[0.9]">
              Need a ride? <br /> MorrisGo is here.
            </h1>
            <p className="text-2xl sm:text-3xl tracking-[-0.06em] text-[#800000]/90">Request a ride</p>
          </div>
          <div className="w-full max-w-3xl">

          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#800000] tracking-[-0.06em] mb-6 text-center">Book a Ride</h2>

          {/* Booking Form */}
          <div className="bg-white rounded-2xl border p-6 flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Pickup Location</label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="border rounded-lg px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#800000]"
              >
                <option value="">Select pickup location</option>
                <option value="Morris">Morris</option>
                <option value="Minneapolis">Minneapolis</option>
                <option value="Alexandria">Alexandria</option>
                <option value="St. Cloud">St. Cloud</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Drop-off Location</label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="border rounded-lg px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#800000]"
              >
                <option value="">Select drop-off location</option>
                <option value="Morris">Morris</option>
                <option value="Minneapolis">Minneapolis</option>
                <option value="Alexandria">Alexandria</option>
                <option value="St. Cloud">St. Cloud</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Date & Time</label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#800000]"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-[#800000] text-white py-3 rounded-xl font-semibold hover:bg-[#660000] mt-2"
            >
              Find Available Rides
            </button>

          </div>
        </section>
    
        {/* Results */}
        {searched && (
          <div className="mt-8 flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-[#800000] tracking-[-0.06em] mb-6 text-center">Available Rides</h3>

            {rides.map((ride) => (
              <div
                key={ride.id}
                className="bg-white border rounded-2xl p-5 flex items-center justify-between shadow-sm"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-gray-800">{ride.driver}</span>
                  <span className="text-sm text-gray-500">
                    {ride.from} → {ride.to}
                  </span>
                  <span className="text-sm text-gray-400">{ride.time} · {ride.seats} seats left</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-lg font-bold text-[#800000]">{ride.price}</span>
                  <button className="bg-[#800000] text-white text-sm px-4 py-1.5 rounded-lg hover:bg-[#660000]">
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!searched && (
          <div className="mt-10 text-center text-gray-400 text-sm">
            Your upcoming bookings will appear here.
          </div>
        )}

        <section className="mb-12 flex flex-col items-center gap-8 text-left">
          <div className="space-y-3">
            <h1 className="text-7xl text-center sm:text-8xl md:text-9xl tracking-[-0.05em] text-[#800000] leading-[0.9]">
              Transportation made easy.
            </h1>
          </div>
          <div className="w-full max-w-3xl">

          </div>
        </section>
      </div>


    </main>
  );
}