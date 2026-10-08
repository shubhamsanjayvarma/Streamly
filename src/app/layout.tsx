import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Streamly — India's #1 Direct UPI Tipping & Alerts for Streamers | 0% Payout Delay",
  description:
    "India's real first direct UPI tipping platform for live streamers. We don't hold your money — 100% of tips land directly in your bank account instantly with ₹0 platform commission and no delayed payout cycles.",
  keywords: [
    "Streamly",
    "UPI tipping for streamers",
    "Indian live stream donation",
    "OBS alertbox India",
    "YouTube superchat alternative",
    "Direct bank UPI tips",
    "0% payout delay",
  ],
  icons: {
    icon: "/brand/streamly-icon.png",
    shortcut: "/brand/favicon-32x32.png",
    apple: "/brand/streamly-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/brand/streamly-icon.png" />
      </head>
      <body className="bg-[#0B0A12] text-white min-h-screen selection:bg-brand-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
