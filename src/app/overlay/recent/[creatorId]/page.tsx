"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Zap, Sparkles } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface RecentTip {
  id: string;
  name: string;
  amount: number;
  time: string;
}

export default function OBSRecentTipsTicker() {
  const params = useParams();
  const creatorId = (params?.creatorId as string) || "demo";

  const [tips, setTips] = useState<RecentTip[]>([
    { id: "1", name: "Aarav Sharma", amount: 500, time: "Just now" },
    { id: "2", name: "Kunal Gaming", amount: 1000, time: "10m ago" },
    { id: "3", name: "Priya V.", amount: 250, time: "25m ago" },
  ]);

  useEffect(() => {
    // Listen to live SSE events for any incoming tip
    let es: EventSource | null = null;
    try {
      es = new EventSource(`/api/alerts/events?creatorId=${creatorId}`);
      es.addEventListener("alert", (event) => {
        try {
          const alert = JSON.parse(event.data);
          setTips((prev) => [
            {
              id: alert.id || String(Date.now()),
              name: alert.tipperName || "Supporter",
              amount: alert.amount || 100,
              time: "Just now",
            },
            ...prev.slice(0, 4),
          ]);
        } catch {}
      });
    } catch {}

    return () => {
      es?.close();
    };
  }, [creatorId]);

  return (
    <div className="w-screen h-screen bg-transparent flex items-start justify-center p-4 select-none overflow-hidden">
      <div className="flex items-center gap-3 bg-[#090810]/90 backdrop-blur-md border border-brand-500/40 rounded-2xl px-4 py-2.5 shadow-[0_0_30px_rgba(109,61,245,0.4)]">
        
        {/* Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-600 text-white text-xs font-bold shrink-0">
          <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
          <span>RECENT TIPS</span>
        </div>

        {/* Ticker Items */}
        <div className="flex items-center gap-4 text-xs">
          {tips.map((tip, idx) => (
            <div key={tip.id} className="flex items-center gap-1.5 shrink-0">
              <span className="font-bold text-white">{tip.name}</span>
              <span className="font-mono font-extrabold text-amber-400">
                {formatINR(tip.amount)}
              </span>
              {idx < tips.length - 1 && (
                <span className="text-gray-600 font-bold ml-2">•</span>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
