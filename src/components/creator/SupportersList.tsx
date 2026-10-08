"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Users, Trophy, ArrowRight } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface SupporterItem {
  id: string;
  rank: number;
  name: string;
  message: string;
  amount: number;
  timeAgo: string;
  avatar?: string;
  badge?: string;
}

interface SupportersListProps {
  recentSupporters?: SupporterItem[];
  topSupporters?: SupporterItem[];
}

const defaultRecentSupporters: SupporterItem[] = [
  {
    id: "s1",
    rank: 1,
    name: "RohanOP",
    message: "Keep going legend! 🔥",
    amount: 199,
    timeAgo: "2 min ago",
    avatar: "/images/avatars/rohan.jpg",
  },
  {
    id: "s2",
    rank: 2,
    name: "Sneha",
    message: "Amazing content! 💜",
    amount: 99,
    timeAgo: "8 min ago",
    avatar: "/images/avatars/sneha.jpg",
  },
  {
    id: "s3",
    rank: 3,
    name: "Aryan",
    message: "Best streamer!",
    amount: 499,
    timeAgo: "15 min ago",
    avatar: "/images/creators/motato.png",
  },
  {
    id: "s4",
    rank: 4,
    name: "Kunal",
    message: "4K setup soon! 🚀",
    amount: 49,
    timeAgo: "23 min ago",
    avatar: "/images/creators/nakul-dhull.png",
  },
  {
    id: "s5",
    rank: 5,
    name: "Priya",
    message: "Love your streams 💜",
    amount: 99,
    timeAgo: "32 min ago",
    avatar: "/images/avatars/sneha.jpg",
  },
];

const defaultTopSupporters: SupporterItem[] = [
  {
    id: "t1",
    rank: 1,
    name: "Aryan",
    message: "Best streamer! 🔥",
    amount: 25000,
    timeAgo: "All Time VIP",
    avatar: "/images/creators/motato.png",
  },
  {
    id: "t2",
    rank: 2,
    name: "Vikram Rajput",
    message: "Dual PC setup donation! 👑",
    amount: 18500,
    timeAgo: "Top Donor",
    avatar: "/images/avatars/rohan.jpg",
  },
  {
    id: "t3",
    rank: 3,
    name: "RohanOP",
    message: "Always backing Casetoo!",
    amount: 12000,
    timeAgo: "Legend Tier",
    avatar: "/images/avatars/rohan.jpg",
  },
  {
    id: "t4",
    rank: 4,
    name: "Priya",
    message: "Keep smashing records! 💜",
    amount: 7500,
    timeAgo: "Elite Supporter",
    avatar: "/images/avatars/sneha.jpg",
  },
  {
    id: "t5",
    rank: 5,
    name: "Kunal",
    message: "Bro never stops grinding 🚀",
    amount: 5000,
    timeAgo: "Super Supporter",
    avatar: "/images/creators/nakul-dhull.png",
  },
];

export function SupportersList({
  recentSupporters = defaultRecentSupporters,
  topSupporters = defaultTopSupporters,
}: SupportersListProps) {
  const [activeTab, setActiveTab] = useState<"RECENT" | "TOP">("RECENT");
  const list = activeTab === "RECENT" ? recentSupporters : topSupporters;

  return (
    <div className="w-full rounded-2xl bg-[#12101D] border border-[#27233D] p-4 sm:p-5 space-y-4 shadow-lg">
      
      {/* Header Tabs */}
      <div className="flex items-center justify-between border-b border-[#1F1C33] pb-3">
        <div className="flex items-center gap-6 text-xs sm:text-sm">
          <button
            type="button"
            onClick={() => setActiveTab("RECENT")}
            className={`relative pb-3 flex items-center gap-2 font-bold transition-colors ${
              activeTab === "RECENT"
                ? "text-white"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <Users className="w-4 h-4 text-[#A78BFA]" />
            <span>Recent Supporters</span>
            {activeTab === "RECENT" && (
              <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#6D3DF5] shadow-[0_0_8px_#6D3DF5]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("TOP")}
            className={`relative pb-3 flex items-center gap-2 font-bold transition-colors ${
              activeTab === "TOP"
                ? "text-white"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Top Supporters</span>
            {activeTab === "TOP" && (
              <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#6D3DF5] shadow-[0_0_8px_#6D3DF5]" />
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setActiveTab(activeTab === "RECENT" ? "TOP" : "RECENT")}
          className="text-xs font-semibold text-[#A78BFA] hover:text-[#C4B5FD] flex items-center gap-1 transition-colors group"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Supporter Rows */}
      <div className="space-y-2.5">
        {list.slice(0, 5).map((supporter, idx) => {
          const rank = idx + 1;
          return (
            <div
              key={supporter.id || idx}
              className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-[#161326]/70 hover:bg-[#1A162D] border border-transparent hover:border-[#27233D] transition-colors"
            >
              {/* Rank & User Info */}
              <div className="flex items-center gap-3 min-w-0">
                {/* Rank Badge */}
                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                  {rank === 1 ? (
                    <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/50 flex items-center justify-center font-bold text-xs shadow-[0_0_8px_rgba(245,158,11,0.25)]">
                      1
                    </div>
                  ) : rank === 2 ? (
                    <div className="w-6 h-6 rounded-md bg-slate-400/20 text-slate-200 border border-slate-400/50 flex items-center justify-center font-bold text-xs">
                      2
                    </div>
                  ) : rank === 3 ? (
                    <div className="w-6 h-6 rounded-md bg-amber-700/20 text-amber-500 border border-amber-700/50 flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                  ) : (
                    <span className="text-gray-400 font-bold text-xs">
                      {rank}
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#241F3B] border border-[#3A3359] shrink-0">
                  {supporter.avatar ? (
                    <Image
                      src={supporter.avatar}
                      alt={supporter.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-[#A78BFA]">
                      {supporter.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Name & Message */}
                <div className="min-w-0">
                  <div className="font-display font-bold text-xs sm:text-sm text-white truncate">
                    {supporter.name}
                  </div>
                  <div className="text-[11px] text-gray-400 truncate">
                    {supporter.message}
                  </div>
                </div>
              </div>

              {/* Amount & Timestamp */}
              <div className="text-right shrink-0 pl-3">
                <div className="font-mono font-extrabold text-xs sm:text-sm text-white">
                  {formatINR(supporter.amount)}
                </div>
                <div className="text-[10px] text-gray-400">
                  {supporter.timeAgo}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
