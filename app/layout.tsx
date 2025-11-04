import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aplikasi Presensi Online",
  description: "Frontend untuk sistem presensi berbasis web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-gray-100 text-gray-800">{children}</body>
    </html>
  );
}
