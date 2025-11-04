"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface HistoryItem {
  date: string;
  status: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);
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
    const key = `history_${email}`;
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    setHistory(stored);
  }, [router]);

  const clearHistory = () => {
    if (!userEmail) return;
    const key = `history_${userEmail}`;
    localStorage.setItem(key, JSON.stringify([]));
    setHistory([]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.05),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.05),transparent_70%)]"></div>

      <div className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 w-[90%] max-w-md text-white">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent text-center mb-6">
          Riwayat Presensi
        </h1>

        {history.length === 0 ? (
          <p className="text-center text-gray-400">Belum ada data presensi.</p>
        ) : (
          <ul className="space-y-3">
            {history.map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-white/10 border border-white/10 rounded-lg p-3 shadow-sm"
              >
                <span>{item.date}</span>
                <span className="text-green-400 font-semibold">{item.status}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-between mt-8 text-sm">
          <button
            onClick={() => router.push("/attendance")}
            className="text-blue-400 hover:underline"
          >
            ← Kembali
          </button>
          <button
            onClick={clearHistory}
            className="text-red-400 hover:underline"
          >
            Hapus Riwayat
          </button>
        </div>
      </div>
    </div>
  );
}
