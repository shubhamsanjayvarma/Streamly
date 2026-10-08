"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle, ShieldCheck, Landmark, Percent } from "lucide-react";

interface CreatorHeroProps {
  creatorName?: string;
  category?: string;
  tagline?: string;
  bannerImage?: string;
  avatarImage?: string;
  showTrustPills?: boolean;
}

export function CreatorHero({
  creatorName = "Casetoo",
  category = "Gaming • Live Streaming • Community",
  tagline,
  bannerImage = "/images/creators/casetoo-banner.jpg",
  avatarImage = "/images/creators/casetoo-logo.jpg",
  showTrustPills = false,
}: CreatorHeroProps) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#27233D] bg-[#12101D] shadow-xl group">
      
      {/* Banner Image Container */}
      <div className="relative w-full h-56 sm:h-72 overflow-hidden bg-[#0A0714]">
        <Image
          src={bannerImage}
          alt={`${creatorName} Streaming Banner`}
          fill
          priority
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
        />

        {/* Ambient Dark Purple Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12101D] via-[#12101D]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0A12]/80 via-transparent to-[#0B0A12]/40" />

        {/* LIVE NOW Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 backdrop-blur-md border border-red-500/40 text-white text-xs font-bold tracking-wide shadow-[0_0_15px_rgba(239,68,68,0.5)]">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span className="w-2 h-2 rounded-full bg-white absolute" />
          <span className="ml-2 uppercase text-[11px] font-extrabold tracking-wider">
            Live Now
          </span>
        </div>
      </div>

      {/* Creator Profile Information Overlay */}
      <div className="relative px-5 pb-5 pt-0 -mt-14 sm:-mt-16 flex flex-col sm:flex-row sm:items-end gap-4 z-10">
        
        {/* Creator Avatar Square */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#080611] border-2 border-[#8B5CF6]/60 shadow-[0_0_25px_rgba(109,61,245,0.4)] shrink-0">
          <Image
            src={avatarImage}
            alt={creatorName}
            fill
            className="object-cover"
          />
        </div>

        {/* Creator Text Info */}
        <div className="space-y-1.5 sm:pb-1 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              {creatorName}
            </h1>
            <div className="relative">
              <CheckCircle className="w-5 h-5 text-[#8B5CF6] fill-[#8B5CF6]/20" />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 font-medium">
            {category}
          </p>

          {tagline ? (
            <p className="text-xs sm:text-sm font-semibold text-purple-200">
              {tagline}
            </p>
          ) : (
            <div className="flex items-center gap-1.5 pt-0.5 text-xs text-gray-300/90 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10E7B2]" />
              <span>Instant Bank Settlement • 0% Platform Deduction</span>
            </div>
          )}

          {/* Optional inline trust pills for About page */}
          {showTrustPills && (
            <div className="flex flex-wrap items-center gap-2.5 pt-3">
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#151224] border border-[#27233D] hover:border-[#10E7B2]/30 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-[#0F2321] border border-[#10E7B2]/30 flex items-center justify-center shrink-0">
                  <Landmark className="w-3.5 h-3.5 text-[#10E7B2]" />
                </div>
                <div>
                  <div className="font-display font-extrabold text-xs text-white leading-tight">Instant</div>
                  <div className="text-[10px] text-gray-400 leading-tight">Bank Settlement</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#151224] border border-[#27233D] hover:border-[#10E7B2]/30 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-[#0F2321] border border-[#10E7B2]/30 flex items-center justify-center shrink-0">
                  <Percent className="w-3.5 h-3.5 text-[#10E7B2]" />
                </div>
                <div>
                  <div className="font-display font-extrabold text-xs text-white leading-tight">0%</div>
                  <div className="text-[10px] text-gray-400 leading-tight">Platform Deduction</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#151224] border border-[#27233D] hover:border-[#10E7B2]/30 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-[#0F2321] border border-[#10E7B2]/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10E7B2]" />
                </div>
                <div>
                  <div className="font-display font-extrabold text-xs text-white leading-tight">100%</div>
                  <div className="text-[10px] text-gray-400 leading-tight">Support Reaches Creator</div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
