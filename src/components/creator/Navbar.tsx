"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle, Moon, Play, Flame } from "lucide-react";

interface NavbarProps {
  creatorName?: string;
  creatorSlug?: string;
  activeTab?: "Home" | "About" | "Support";
}

export function Navbar({
  creatorName = "Casetoo",
  creatorSlug = "casetoo",
  activeTab: explicitActiveTab,
}: NavbarProps) {
  const pathname = usePathname();

  // Dynamically resolve active tab from URL path
  const resolvedTab = (() => {
    if (explicitActiveTab) return explicitActiveTab;
    if (pathname?.includes(`/creator/${creatorSlug}/about`)) return "About";
    if (pathname?.includes(`/creator/${creatorSlug}`)) return "Support";
    if (pathname === "/") return "Home";
    return "Support";
  })();

  const [activeTab, setActiveTab] = useState<"Home" | "About" | "Support">(resolvedTab);

  // Sync with browser pathname changes
  useEffect(() => {
    setActiveTab(resolvedTab);
  }, [resolvedTab, pathname]);

  const navLinks = [
    { name: "Home", href: `/` },
    { name: "About", href: `/creator/${creatorSlug}/about` },
    { name: "Support", href: `/creator/${creatorSlug}` },
  ] as const;

  const handleTabClick = (tabName: "Home" | "About" | "Support") => {
    if (typeof performance !== "undefined") {
      performance.mark(`nav-click-${tabName.toLowerCase()}`);
      console.log(`[Streamly Nav] Clicked ${tabName} at ${performance.now().toFixed(1)}ms`);
    }
    setActiveTab(tabName);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08070D]/95 backdrop-blur-md border-b border-[#1F1C33] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand / Creator Identity */}
        <div className="flex items-center gap-3">
          <Link href={`/creator/${creatorSlug}`} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6D3DF5] to-[#4B24B8] p-0.5 shadow-[0_0_15px_rgba(109,61,245,0.4)] flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#0D0B18] rounded-[10px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#A78BFA] fill-[#8B5CF6]/40" />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-lg tracking-tight text-white group-hover:text-purple-200 transition-colors">
                {creatorName}
              </span>
              <CheckCircle className="w-4 h-4 text-[#8B5CF6] fill-[#8B5CF6]/30" />
            </div>
          </Link>
        </div>

        {/* Center: Minimal Navigation Tabs (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <Link
                key={tab.name}
                href={tab.href}
                prefetch={true}
                onClick={() => handleTabClick(tab.name)}
                className={`relative py-5 font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <span className="relative z-10">{tab.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6D3DF5] shadow-[0_0_12px_#6D3DF5] rounded-full transition-all duration-300 ease-out" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Watch Live & Theme Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="https://youtube.com/@casetoo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#CC0000] hover:bg-[#E60000] text-white text-xs font-bold transition-all shadow-[0_2px_10px_rgba(204,0,0,0.3)] hover:scale-105 active:scale-95"
          >
            <span className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center">
              <Play className="w-2.5 h-2.5 fill-white text-white ml-0.5" />
            </span>
            <span>Watch Live</span>
          </a>

          <button
            type="button"
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-full bg-[#151324] border border-[#27233D] hover:border-[#6D3DF5]/50 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <Moon className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Mobile Navigation Tabs Bar */}
      <div className="flex md:hidden items-center justify-around border-t border-[#1F1C33]/60 px-4 py-2 bg-[#0A0814]/90 backdrop-blur-sm">
        {navLinks.map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              prefetch={true}
              onClick={() => handleTabClick(tab.name)}
              className={`relative py-1.5 px-3 text-xs font-medium rounded-lg transition-all ${
                isActive
                  ? "text-white bg-[#6D3DF5]/20 font-bold border border-[#6D3DF5]/40"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <span>{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
