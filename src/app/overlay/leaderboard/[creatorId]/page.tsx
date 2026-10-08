"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Crown, Trophy, Medal, Star } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface Supporter {
  rank: number;
  name: string;
  totalAmount: number;
  badge: string;
}

export default function OBSLeaderboardOverlay() {
  const params = useParams();
  const creatorId = (params?.creatorId as string) || "demo";

  const [supporters, setSupporters] = useState<Supporter[]>([
    { rank: 1, name: "Vikram Rajput", totalAmount: 25000, badge: "👑 VIP King" },
    { rank: 2, name: "Aarav Sharma", totalAmount: 18500, badge: "🥈 Diamond" },
    { rank: 3, name: "Kunal Gaming", totalAmount: 12000, badge: "🥉 Gold" },
  ]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`/api/leaderboard?creatorId=${creatorId}`);
        const data = await res.json();
        if (data.success && data.data?.topSupporters) {
          setSupporters(data.data.topSupporters.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to load leaderboard:", err);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 15000);
    return () => clearInterval(interval);
  }, [creatorId]);

  return (
    <div className="w-screen h-screen bg-transparent flex items-start justify-center p-6 select-none overflow-hidden">
      {/* 100% Transparent Container with Styled Floating Leaderboard for OBS */}
      <div className="w-full max-w-lg bg-[#090810]/95 backdrop-blur-md border border-brand-500/40 rounded-2xl p-4 shadow-[0_0_40px_rgba(109,61,245,0.4)]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-display font-extrabold text-white text-sm tracking-wider uppercase">
              TOP STREAM SUPPORTERS
            </span>
          </div>
          <span className="text-[11px] font-bold text-brand-300 bg-brand-500/20 px-2.5 py-0.5 rounded-full border border-brand-500/30">
            THIS MONTH
          </span>
        </div>

        {/* Top 3 Supporters Cards */}
        <div className="flex items-center justify-between gap-2">
          {supporters.map((s) => {
            const isRank1 = s.rank === 1;
            const isRank2 = s.rank === 2;
            const isRank3 = s.rank === 3;

            return (
              <div
                key={s.rank}
                className={`flex-1 rounded-xl p-2.5 flex flex-col items-center text-center transition-all ${
                  isRank1
                    ? "bg-amber-500/15 border-2 border-amber-400/60 shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                    : isRank2
                    ? "bg-slate-400/10 border border-slate-300/40"
                    : "bg-amber-800/10 border border-amber-700/40"
                }`}
              >
                <div className="mb-1">
                  {isRank1 && <Crown className="w-5 h-5 text-amber-400" />}
                  {isRank2 && <Medal className="w-4 h-4 text-slate-300" />}
                  {isRank3 && <Star className="w-4 h-4 text-amber-600" />}
                </div>

                <div className="text-xs font-bold text-white truncate max-w-[90px] mb-0.5">
                  {s.name}
                </div>

                <div className="text-xs font-mono font-extrabold text-amber-400">
                  {formatINR(s.totalAmount)}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
