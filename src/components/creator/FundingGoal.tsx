"use client";

import React from "react";
import { Target } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface FundingGoalProps {
  title?: string;
  currentAmount?: number;
  targetAmount?: number;
}

export function FundingGoal({
  title = "New 4K Dual PC Streaming Setup 🚀",
  currentAmount = 112450,
  targetAmount = 150000,
}: FundingGoalProps) {
  const percentage = Math.min(
    100,
    Math.max(0, Math.round((currentAmount / targetAmount) * 100))
  );

  return (
    <div className="w-full rounded-2xl bg-[#12101D] border border-[#27233D] p-4 sm:p-5 space-y-3.5 shadow-lg">
      
      {/* Title & Percentage Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-[#241A4A] flex items-center justify-center shrink-0">
            <Target className="w-3.5 h-3.5 text-[#A78BFA]" />
          </div>
          <h2 className="font-display font-bold text-sm sm:text-base text-white truncate">
            {title}
          </h2>
        </div>
        <span className="font-mono font-extrabold text-sm sm:text-base text-[#10E7B2] shrink-0 tracking-tight">
          {percentage}%
        </span>
      </div>

      {/* Horizontal Progress Bar */}
      <div className="relative w-full h-3 rounded-full bg-[#1A162B] overflow-hidden border border-[#27233D]/60 p-[2px]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#6D3DF5] via-[#8B5CF6] to-[#10E7B2] transition-all duration-700 ease-out shadow-[0_0_12px_rgba(16,231,178,0.35)]"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Amounts Raised & Target */}
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="font-semibold text-gray-200">
          {formatINR(currentAmount)} <span className="text-gray-400 font-sans font-normal">raised</span>
        </span>
        <span className="text-gray-400">
          Target: <span className="font-semibold text-gray-300">{formatINR(targetAmount)}</span>
        </span>
      </div>

    </div>
  );
}
