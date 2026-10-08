"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Target, Sparkles } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface GoalData {
  title: string;
  targetAmount: number;
  currentAmount: number;
}

export default function OBSGoalOverlay() {
  const params = useParams();
  const creatorId = (params?.creatorId as string) || "demo";

  const [goal, setGoal] = useState<GoalData>({
    title: "Stream Goal: New Pro Audio Setup 🎙️",
    targetAmount: 50000,
    currentAmount: 37500,
  });

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const res = await fetch(`/api/goals?creatorId=${creatorId}`);
        const data = await res.json();
        if (data.success && data.data) {
          setGoal({
            title: data.data.title,
            targetAmount: data.data.targetAmount,
            currentAmount: data.data.currentAmount,
          });
        }
      } catch (err) {
        console.error("Failed to load goal:", err);
      }
    };

    fetchGoal();
    const interval = setInterval(fetchGoal, 10000); // 10s polling for live stream updates
    return () => clearInterval(interval);
  }, [creatorId]);

  const percentage = Math.min(
    100,
    Math.round((goal.currentAmount / goal.targetAmount) * 100)
  );

  return (
    <div className="w-screen h-screen bg-transparent flex items-start justify-center p-6 select-none overflow-hidden">
      {/* 100% Transparent Container with Styled Floating Bar for OBS */}
      <div className="w-full max-w-xl bg-[#090810]/90 backdrop-blur-md border border-brand-500/40 rounded-2xl p-4 shadow-[0_0_40px_rgba(109,61,245,0.4)]">
        
        {/* Goal Title & Status */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-600/30 border border-brand-500/50 flex items-center justify-center text-brand-400">
              <Target className="w-4 h-4" />
            </div>
            <span className="font-display font-bold text-white text-sm sm:text-base tracking-wide truncate max-w-[280px]">
              {goal.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold font-mono">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{percentage}%</span>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="relative w-full h-4 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/15">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-600 via-brand-400 to-emerald-400 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(16,185,129,0.5)]"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Amount Figures */}
        <div className="flex items-center justify-between text-xs font-bold mt-2 font-mono">
          <span className="text-emerald-400 drop-shadow">
            {formatINR(goal.currentAmount)}
          </span>
          <span className="text-gray-400">
            Target: {formatINR(goal.targetAmount)}
          </span>
        </div>

      </div>
    </div>
  );
}
