"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  Radio,
  Copy,
  Check,
  TrendingUp,
  Users,
  Target,
  ExternalLink,
  Volume2,
  Bell,
  Settings,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { useStreamlyStore } from "@/store";
import { formatINR } from "@/lib/utils";

export default function DashboardPage() {
  const { currentCreator, triggerDemoAlert } = useStreamlyStore();
  const [copied, setCopied] = useState(false);
  const [testSent, setTestSent] = useState(false);

  const overlayUrl = typeof window !== "undefined"
    ? `${window.location.origin}/overlay/alerts/demo`
    : "https://streamly.in/overlay/alerts/demo";

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(overlayUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendTestAlert = () => {
    setTestSent(true);
    triggerDemoAlert({
      tipperName: "Test Supporter",
      amount: 500,
      message: "This is a test alert from your Streamly Creator Studio!",
    });
    setTimeout(() => setTestSent(false), 3000);
  };

  // Recent simulated tips feed
  const recentTips = [
    { id: "tip-1", name: "Aarav Sharma", amount: 500, time: "2 mins ago", msg: "GG! Best clutch!" },
    { id: "tip-2", name: "Kunal Gaming", amount: 1000, time: "14 mins ago", msg: "Op sniper shot!" },
    { id: "tip-3", name: "Priya V.", amount: 250, time: "38 mins ago", msg: "Big fan! Keep it up" },
    { id: "tip-4", name: "Anonymous", amount: 150, time: "1 hour ago", msg: "Full support bro" },
  ];

  return (
    <div className="min-h-screen bg-[#07060B] text-white flex flex-col">
      
      {/* Dashboard Topbar */}
      <header className="border-b border-surface-border bg-[#0B0A12]/90 backdrop-blur-xl px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden">
              <Image
                src="/brand/streamly-icon.png"
                alt="Streamly"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-display font-extrabold text-lg tracking-wider text-white">
              STREAMLY STUDIO
            </span>
          </Link>
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-600/20 text-brand-300 border border-brand-500/30">
            <span>PRO PLAN</span> • 0% Cut
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/creator/${currentCreator?.slug || "casetoo"}`}
            target="_blank"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:text-white bg-surface-card hover:bg-surface-cardHover border border-surface-border flex items-center gap-1.5 transition-colors"
          >
            <span>View Public Tip Page</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </Link>
          <div className="flex items-center gap-2 pl-2 border-l border-surface-border">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-brand-500">
              <Image
                src="/images/creators/casetoo.jpg"
                alt="Avatar"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs font-bold text-white hidden md:inline">
              {currentCreator?.displayName || "Casetoo"}
            </span>
          </div>
        </div>
      </header>

      {/* Main Studio Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">
        
        {/* Welcome & Payout Status Bar */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-950/80 via-surface-card to-surface-card border border-brand-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-display font-extrabold text-white">
                Welcome back, {currentCreator?.displayName || "Streamer"}!
              </h2>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-xs sm:text-sm text-text-secondary">
              Direct UPI Auto-Settlement Active: <strong className="text-emerald-400">{currentCreator?.upiId || "casetoo@upi"}</strong> (0 Sec delay)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Bank Account Connected</span>
            </span>
          </div>
        </div>

        {/* 4 KPI Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl glass-panel border border-surface-border space-y-2">
            <div className="flex justify-between items-center text-xs text-text-secondary">
              <span className="uppercase font-semibold tracking-wider">Today's Earnings</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              {formatINR(4250)}
            </div>
            <div className="text-[11px] text-emerald-400 font-medium">
              +18% vs yesterday
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-surface-border space-y-2">
            <div className="flex justify-between items-center text-xs text-text-secondary">
              <span className="uppercase font-semibold tracking-wider">Total Confirmed</span>
              <Zap className="w-4 h-4 text-brand-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              {formatINR(84500)}
            </div>
            <div className="text-[11px] text-text-muted">
              Settled to your bank
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-surface-border space-y-2">
            <div className="flex justify-between items-center text-xs text-text-secondary">
              <span className="uppercase font-semibold tracking-wider">Unique Supporters</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              142 Fans
            </div>
            <div className="text-[11px] text-brand-300">
              Community growing
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-surface-border space-y-2">
            <div className="flex justify-between items-center text-xs text-text-secondary">
              <span className="uppercase font-semibold tracking-wider">Active Goal</span>
              <Target className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              56% Done
            </div>
            <div className="text-[11px] text-amber-400">
              {formatINR(84500)} / {formatINR(150000)}
            </div>
          </div>
        </div>

        {/* OBS Browser Source Hub */}
        <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-brand-500/40 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
            <div>
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-brand-400" />
                <h3 className="text-lg font-display font-bold text-white">
                  OBS Studio Browser Source URL
                </h3>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                Add this link as a Browser Source in OBS or Streamlabs. Resolution: 1920×1080. Transparent canvas.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSendTestAlert}
                disabled={testSent}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 transition-all shadow-purple-glow flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{testSent ? "Alert Sent to OBS!" : "Send Test Alert to OBS"}</span>
              </button>
              <Link
                href="/overlay/alerts/demo"
                target="_blank"
                className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-text-secondary hover:text-white bg-surface-card border border-surface-border transition-colors flex items-center gap-1.5"
              >
                <span>Live Preview</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* URL Input with 1-click Copy */}
          <div className="flex items-center gap-3 bg-[#07060B] p-2 rounded-xl border border-surface-border">
            <span className="text-xs font-mono text-brand-300 truncate pl-3 flex-1">
              {overlayUrl}
            </span>
            <button
              type="button"
              onClick={handleCopyUrl}
              className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-surface-card hover:bg-brand-600 transition-all flex items-center gap-1.5 flex-shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy URL"}</span>
            </button>
          </div>
        </div>

        {/* Recent Tip Feed */}
        <div className="p-6 rounded-2xl glass-panel border border-surface-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-display font-bold text-white">
              Recent Confirmed Stream Donations
            </h3>
            <span className="text-xs text-text-muted">Direct UPI Settled</span>
          </div>

          <div className="divide-y divide-surface-border">
            {recentTips.map((tip) => (
              <div key={tip.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center font-bold text-xs">
                    {tip.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{tip.name}</div>
                    <div className="text-xs text-text-secondary italic">"{tip.msg}"</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-display font-extrabold text-emerald-400">
                    +{formatINR(tip.amount)}
                  </div>
                  <div className="text-[11px] text-text-muted">{tip.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

    </div>
  );
}
