"use client";

import React from "react";
import { Gamepad2, Radio, Video, Users, Star, Play } from "lucide-react";

export function WhatIDoCard() {
  const features = [
    {
      icon: Radio,
      title: "Live Streaming",
      description: "Daily live streams with high-energy gameplay and fun interactions.",
      iconColor: "text-[#A78BFA]",
      iconBg: "bg-[#241A4A]",
    },
    {
      icon: Video,
      title: "YouTube Content",
      description: "Highlights, montages, gameplay videos and special content.",
      iconColor: "text-[#A78BFA]",
      iconBg: "bg-[#241A4A]",
    },
    {
      icon: Users,
      title: "Community",
      description: "Custom rooms, events and an amazing supportive community.",
      iconColor: "text-[#A78BFA]",
      iconBg: "bg-[#241A4A]",
    },
    {
      icon: Star,
      title: "Variety Games",
      description: "From competitive to casual, always exploring new and exciting games.",
      iconColor: "text-amber-400 fill-amber-400",
      iconBg: "bg-[#2D241E]",
    },
  ];

  return (
    <div className="w-full rounded-2xl bg-[#12101D] border border-[#27233D] p-5 sm:p-6 space-y-4 shadow-xl">
      
      {/* Header with Title and Watch Live CTA Button */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-[#A78BFA]" />
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight">
              What I Do
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            More about my content and what I stream.
          </p>
        </div>

        <a
          href="https://youtube.com/@casetoo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#CC0000] hover:bg-[#E60000] text-white text-xs font-bold transition-all shadow-[0_2px_10px_rgba(204,0,0,0.3)] hover:scale-105 shrink-0"
        >
          <Play className="w-2.5 h-2.5 fill-white text-white" />
          <span>Watch Live</span>
        </a>
      </div>

      {/* 2x2 Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="rounded-xl bg-[#161326] border border-[#27233D] p-3.5 space-y-2 hover:border-[#6D3DF5]/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg ${f.iconBg} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-3.5 h-3.5 ${f.iconColor}`} />
                </div>
                <h3 className="font-display font-bold text-xs sm:text-sm text-white">
                  {f.title}
                </h3>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed font-normal">
                {f.description}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
