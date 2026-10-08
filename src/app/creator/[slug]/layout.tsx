import React from "react";
import { Navbar } from "@/components/creator/Navbar";

interface CreatorLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function CreatorLayout({
  children,
  params,
}: CreatorLayoutProps) {
  const { slug } = await params;
  const slugLower = slug?.toLowerCase() || "casetoo";
  const creatorDisplayName =
    slugLower === "casetoo"
      ? "Casetoo"
      : slugLower.charAt(0).toUpperCase() + slugLower.slice(1);

  return (
    <div className="min-h-screen bg-[#08070D] text-white flex flex-col relative selection:bg-[#6D3DF5] selection:text-white overflow-x-hidden">
      {/* Ambient Deep Purple Background Glows — Persistent across About <-> Support navigations */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#6D3DF5]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-10 w-96 h-96 bg-[#4B24B8]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Persistent Top Navigation Bar */}
      <Navbar creatorName={creatorDisplayName} creatorSlug={slugLower} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full">
        {children}
      </div>
    </div>
  );
}
