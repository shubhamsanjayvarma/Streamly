"use client";

import React from "react";
import { Star, Landmark, Percent, ShieldCheck } from "lucide-react";

interface AboutBioCardProps {
  creatorName?: string;
}

export function AboutBioCard({ creatorName = "Casetoo" }: AboutBioCardProps) {
  const benefits = [
    {
      icon: Landmark,
      title: "Instant",
      subtitle: "Bank Settlement",
      description: "Tips go directly to me",
    },
    {
      icon: Percent,
      title: "0%",
      subtitle: "Platform Deduction",
      description: "You pay what I get",
    },
    {
      icon: ShieldCheck,
      title: "100%",
      subtitle: "Support Reaches Creator",
      description: "No hidden cuts",
    },
  ];

  return (
    <div className="w-full rounded-2xl bg-[#12101D] border border-[#27233D] p-5 sm:p-6 space-y-5 shadow-xl">
      
      {/* Header with Star and Purple Accent Underline */}
      <div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <h2 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight">
            About {creatorName}
          </h2>
        </div>
        <div className="h-0.5 w-12 bg-[#6D3DF5] rounded-full mt-2 shadow-[0_0_8px_#6D3DF5]" />
      </div>

      {/* Bio Paragraphs */}
      <div className="space-y-3.5 text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
        <p>
          Hey everyone! I&apos;m {creatorName}, a passionate gamer and content creator who loves to create entertaining, high-energy and community-driven live streams.
        </p>
        <p>
          This channel is all about good games, brighter people 💜 — where we play, learn, chill and build an amazing community together. From competitive gameplay to fun custom rooms, variety streams and community interactions, there&apos;s always something exciting happening here.
        </p>
        <p>
          Your support helps me keep doing what I love and take the content to the next level. Let&apos;s make this journey even bigger together! 🚀
        </p>
      </div>

      {/* Support Benefits Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
        {benefits.map((b, i) => {
          const Icon = b.icon;
          return (
            <div
              key={i}
              className="rounded-xl bg-[#161326] border border-[#27233D] p-3 flex flex-col justify-between space-y-2 hover:border-[#10E7B2]/30 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#0F2321] border border-[#10E7B2]/30 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-[#10E7B2]" />
                </div>
                <div>
                  <div className="font-display font-extrabold text-xs text-white leading-tight">
                    {b.title}
                  </div>
                  <div className="text-[10px] text-gray-400 leading-tight">
                    {b.subtitle}
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-gray-400 font-medium">
                {b.description}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
