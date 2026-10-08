"use client";

import React from "react";
import Image from "next/image";
import { Gamepad2, ArrowRight } from "lucide-react";

export function ContentGamesCard() {
  const games = [
    {
      name: "BGMI",
      image: "/images/games/bgmi.jpg",
    },
    {
      name: "Valorant",
      image: "/images/games/valorant.jpg",
    },
    {
      name: "GTA V",
      image: "/images/games/gtav.jpg",
    },
    {
      name: "Minecraft",
      image: "/images/games/minecraft.jpg",
    },
    {
      name: "Call of Duty",
      image: "/images/games/cod.jpg",
    },
    {
      name: "And More...",
      isPlaceholder: true,
    },
  ];

  return (
    <div className="w-full rounded-2xl bg-[#12101D] border border-[#27233D] p-5 sm:p-6 space-y-4 shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-[#A78BFA]" />
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight">
              Content & Games
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Games I play and types of content you&apos;ll find on my channel.
          </p>
        </div>

        <button
          type="button"
          className="text-xs font-semibold text-[#A78BFA] hover:text-[#C4B5FD] flex items-center gap-1 transition-colors group shrink-0"
        >
          <span>View All Games</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5">
        {games.map((g, i) => (
          <div
            key={i}
            className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-[#27233D] bg-[#161326] flex flex-col justify-end p-2 transition-all hover:border-[#6D3DF5]/60 hover:shadow-[0_0_15px_rgba(109,61,245,0.3)] cursor-pointer"
          >
            {g.image ? (
              <>
                <Image
                  src={g.image}
                  alt={g.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A12] via-[#0B0A12]/30 to-transparent" />
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#18142C] p-2 text-center">
                <Gamepad2 className="w-6 h-6 text-[#A78BFA] mb-1.5 transition-transform group-hover:scale-110" />
              </div>
            )}

            <span className="relative z-10 text-[11px] sm:text-xs font-display font-bold text-white text-center truncate drop-shadow">
              {g.name}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
