"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AttendancePage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [message, setMessage] = useState("");

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

  const handlePresensi = () => {
    if (!userEmail) return;

    const today = new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    type AttendanceRecord = { date: string; status: string };

    const key = `history_${userEmail}`;
    const history = JSON.parse(localStorage.getItem(key) || "[]") as AttendanceRecord[];

    if (history.some((h: AttendanceRecord) => h.date === today)) {
      setMessage(`Kamu sudah presensi tanggal ${today}.`);
      return;
    }

    history.push({ date: today, status: "Hadir" });
    localStorage.setItem(key, JSON.stringify(history));
    setMessage(`Presensi tanggal ${today} berhasil disimpan!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.05),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.05),transparent_70%)]"></div>

      <div className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-10 w-[90%] max-w-md text-center text-white">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
          Presensi Hari Ini
        </h1>
        <p className="text-gray-400 mb-6">Login sebagai: {userEmail}</p>

        <button
          onClick={handlePresensi}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-transform hover:scale-105 shadow-lg"
        >
          Presensi Sekarang
        </button>

        {message && (
          <p className="mt-4 text-emerald-400 font-medium">{message}</p>
        )}

        <div className="flex justify-between mt-8 text-sm">
          <button
            onClick={() => router.push("/history")}
            className="text-blue-400 hover:underline"
          >
            Lihat Riwayat
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="text-gray-400 hover:underline"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
