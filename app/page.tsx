"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Email dan password wajib diisi!");
      return;
    }

    localStorage.setItem("token", "dummy-token");
    localStorage.setItem("currentUser", email.trim());

    const key = `history_${email.trim()}`;
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify([]));
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Efek bintang latar */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.05),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.05),transparent_70%)]"></div>

      {/* Kartu login */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-8 w-[90%] max-w-sm text-white"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
            <span className="text-white text-xl font-bold">⮞</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Presensi App</h1>
          <p className="text-sm text-gray-400">SMK Telkom Malang</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className="w-full bg-white/10 text-white placeholder-gray-400 rounded-lg p-3 outline-none border border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-600 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="w-full bg-white/10 text-white placeholder-gray-400 rounded-lg p-3 outline-none border border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-600 transition"
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-transform hover:scale-[1.02] shadow-lg"
          >
            Masuk
          </button>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          © 2025 Presensi App — All rights reserved
        </p>
      </form>
    </div>
  );
}
