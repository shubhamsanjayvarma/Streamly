"use client";

import React from "react";
import { Landmark, Percent, ShieldCheck } from "lucide-react";

export function TrustIndicators() {
  const benefits = [
    {
      icon: Landmark,
      title: "Instant",
      subtitle: "Bank Settlement",
    },
    {
      icon: Percent,
      title: "0%",
      subtitle: "Platform Deduction",
    },
    {
      icon: ShieldCheck,
      title: "100%",
      subtitle: "Support Reaches Creator",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full">
      {benefits.map((b, i) => {
        const Icon = b.icon;
        return (
          <div
            key={i}
            className="rounded-2xl bg-[#12101D] border border-[#27233D] p-3 sm:p-3.5 flex items-center gap-2.5 sm:gap-3 transition-colors hover:border-[#10E7B2]/30"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0F2321] border border-[#10E7B2]/30 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-[#10E7B2]" />
            </div>
            <div className="min-w-0">
              <div className="font-display font-extrabold text-xs sm:text-sm text-white leading-tight">
                {b.title}
              </div>
              <div className="text-[10px] sm:text-[11px] text-gray-400 leading-tight truncate">
                {b.subtitle}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
