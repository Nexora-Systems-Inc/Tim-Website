import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Galerie Artistes — Sherbrooke",
  description: "A curated collection of Québécois masters. Timeless works for discerning collectors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grain">{children}</body>
    </html>
  );
}
