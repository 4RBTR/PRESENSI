"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("currentUser");

    if (!token || !email) {
      router.replace("/");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserEmail(email);
  }, [router]);

  const logout = () => {
    localStorage.clear();
    router.replace("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.05),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.05),transparent_70%)]"></div>

      <div className="relative z-10 text-white backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-10 w-[90%] max-w-md text-center">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Dashboard Presensi
        </h1>
        <p className="text-gray-400 mt-2 mb-6">
          Selamat datang, <span className="font-semibold">{userEmail}</span>
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push("/attendance")}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-3 rounded-xl font-semibold shadow-lg transition-transform hover:scale-105"
          >
            Presensi Sekarang
          </button>

          <button
            onClick={() => router.push("/history")}
            className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 py-3 rounded-xl font-semibold shadow-lg transition-transform hover:scale-105"
          >
            Riwayat Presensi
          </button>

          <button
            onClick={logout}
            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 py-3 rounded-xl font-semibold shadow-lg transition-transform hover:scale-105"
          >
            Keluar
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-8">
          © 2025 Presensi App - UKL
        </p>
      </div>
    </div>
  );
}
