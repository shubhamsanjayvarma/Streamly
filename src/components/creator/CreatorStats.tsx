"use client";

import React from "react";
import { Heart, Users, Play, Calendar, Gamepad2, Sparkles } from "lucide-react";

interface CreatorStatsProps {
  followers?: string;
  watching?: string;
  totalViews?: string;
  extended?: boolean;
}

export function CreatorStats({
  followers = "128K",
  watching = "2.4K",
  totalViews = "1.2M",
  extended = false,
}: CreatorStatsProps) {
  const baseStats = [
    {
      icon: Heart,
      value: followers,
      label: "Followers",
      iconClass: "text-[#A78BFA] fill-[#A78BFA]/30",
    },
    {
      icon: Users,
      value: watching,
      label: "Watching",
      iconClass: "text-[#A78BFA]",
    },
    {
      icon: Play,
      value: totalViews,
      label: "Total Views",
      iconClass: "text-[#A78BFA] fill-[#A78BFA]/40 ml-0.5",
    },
  ];

  const extendedStats = [
    ...baseStats,
    {
      icon: Calendar,
      value: "2021",
      label: "Started Streaming",
      iconClass: "text-[#A78BFA]",
    },
    {
      icon: Gamepad2,
      value: "PC & Console",
      label: "Main Platform",
      iconClass: "text-[#A78BFA]",
    },
    {
      icon: Users,
      value: "Active",
      label: "Amazing Community",
      iconClass: "text-[#A78BFA]",
    },
  ];

  const stats = extended ? extendedStats : baseStats;

  return (
    <div
      className={`grid gap-2.5 sm:gap-3 w-full ${
        extended
          ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          : "grid-cols-3"
      }`}
    >
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className={`rounded-2xl bg-[#12101D] border border-[#27233D] p-3 sm:p-3.5 transition-colors hover:border-[#6D3DF5]/40 ${
              extended ? "flex items-center gap-3" : "flex flex-col justify-center"
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-[#1B172E] flex items-center justify-center shrink-0">
              <Icon className={`w-4 h-4 ${stat.iconClass}`} />
            </div>
            <div className="min-w-0">
              <div className="font-display font-extrabold text-xs sm:text-sm lg:text-sm text-white tracking-tight truncate">
                {stat.value}
              </div>
              <div className="text-[10px] text-gray-400 font-medium truncate">
                {stat.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
