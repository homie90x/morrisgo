"use client";

import Image from "next/image";
import { useState } from "react";
import logo from "./logo.png";

type Ride = {
  id: number;
  driver_name: string;
  from_location: string;
  to_location: string;
  departure_time: string;
  seats_left: number;
  price: number;
};

export default function Dashboard() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [rides, setRides] = useState<Ride[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  async function handleSearch() {
    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const params = new URLSearchParams();
      if (from) params.set("from_location", from);
      if (to) params.set("to_location", to);
      if (date) params.set("date", date);

      const response = await fetch(`http://127.0.0.1:8000/rides?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Unable to load rides right now.");
      }

      const data = (await response.json()) as Ride[];
      setRides(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setRides([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 pt-8 pb-4 bg-white">
        <a href="/signup" className="text-sm font-medium text-gray-500 hover:text-[#7a0019]">Sign Up</a>
        <a href="/" className="flex items-center" aria-label="MorrisGo home">
          <Image src={logo} alt="MorrisGo logo" width={140} height={40} className="h-10 w-auto" />
        </a>
        <a href="/bookings" className="text-sm text-gray-500 hover:text-[#7a0019]">My Bookings</a>
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

            {loading && <p className="text-center text-sm text-gray-500">Loading rides...</p>}

            {!loading && error && <p className="text-center text-sm text-red-600">{error}</p>}

            {!loading && !error && rides.map((ride) => (
              <div
                key={ride.id}
                className="bg-white border rounded-2xl p-5 flex items-center justify-between shadow-sm"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-gray-800">{ride.driver_name}</span>
                  <span className="text-sm text-gray-500">
                    {ride.from_location} → {ride.to_location}
                  </span>
                  <span className="text-sm text-gray-400">{ride.departure_time} · {ride.seats_left} seats left</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-lg font-bold text-[#800000]">${ride.price}</span>
                  <button className="bg-[#800000] text-white text-sm px-4 py-1.5 rounded-lg hover:bg-[#660000]">
                    Book
                  </button>
                </div>
              </div>
            ))}

            {!loading && !error && rides.length === 0 && searched && (
              <p className="text-center text-sm text-gray-500">No rides found for that search.</p>
            )}
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
              Transportation to the cities made easy.
            </h1>
          </div>
        </section>
          <div className="w-full flex flex-col gap-6">
            <div className="rounded-[18px] bg-[#800000] p-6 text-white shadow-lg w-full h-48 flex flex-col justify-center">
              <div className="text-3xl mb-2">Request a Ride to Minneapolis.</div>
              <div className="text-sm text-white/90">Make sure to request rides a few weeks in advance to ensure availability</div>
            </div>

            <div className="rounded-[18px] bg-[#800000] p-6 text-white shadow-lg w-full h-48 flex flex-col justify-center">
              <div className="text-3xl mb-2 text-right">Take the Weekend Shuttle</div>
              <div className="text-sm text-white/90 text-right">Subject to availability.</div>
            </div>
          </div>
      </div>

      <footer className="bg-[#800000] text-white py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-lg font-semibold">Nothing to see here yet...</div>
          <div className="mt-2 text-sm text-white/90">Production</div>
        </div>
      </footer>

    </main>
  );
}