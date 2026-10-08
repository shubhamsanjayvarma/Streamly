"use client";

import React from "react";
import Image from "next/image";
import { Settings } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface MySetupCardProps {
  title?: string;
  currentAmount?: number;
  targetAmount?: number;
  setupImage?: string;
}

export function MySetupCard({
  title = "New 4K Dual PC Streaming Setup 🚀",
  currentAmount = 112450,
  targetAmount = 150000,
  setupImage = "/images/creators/casetoo-banner.jpg",
}: MySetupCardProps) {
  const percentage = Math.min(
    100,
    Math.max(0, Math.round((currentAmount / targetAmount) * 100))
  );

  return (
    <div className="w-full rounded-2xl bg-[#12101D] border border-[#27233D] p-5 sm:p-6 space-y-4 shadow-xl">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-[#A78BFA]" />
          <h2 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight">
            My Setup
          </h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          The setup I&apos;m working towards with your support!
        </p>
      </div>

      {/* Setup Box with Image on Left & Goal Progress on Right */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-[#161326] border border-[#27233D] rounded-xl p-3 sm:p-4">
        
        {/* Left: Setup Preview Thumbnail */}
        <div className="relative w-full sm:w-36 h-28 sm:h-28 rounded-lg overflow-hidden shrink-0 border border-[#27233D]">
          <Image
            src={setupImage}
            alt="Gaming Setup"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Right: Funding Goal Progress */}
        <div className="flex-1 w-full space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-display font-bold text-xs sm:text-sm text-white truncate">
              {title}
            </span>
            <span className="font-mono font-extrabold text-xs sm:text-sm text-[#10E7B2] shrink-0">
              {percentage}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-2.5 rounded-full bg-[#1A162B] overflow-hidden border border-[#27233D]/60 p-[2px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#6D3DF5] via-[#8B5CF6] to-[#10E7B2] transition-all duration-700 ease-out shadow-[0_0_10px_rgba(16,231,178,0.35)]"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Raised and Target Amount */}
          <div className="flex items-center justify-between text-[11px] font-mono text-gray-300">
            <span>
              {formatINR(currentAmount)} <span className="text-gray-400 font-sans font-normal">raised</span>
            </span>
            <span className="text-gray-400">
              Target: <span className="text-gray-300 font-semibold">{formatINR(targetAmount)}</span>
            </span>
          </div>

          <p className="text-[11px] text-gray-400 leading-relaxed font-normal pt-1">
            Help me upgrade to a 4K dual PC streaming setup for better quality content, more streams and an even bigger experience for you all! 💜
          </p>
        </div>

      </div>

    </div>
  );
}
