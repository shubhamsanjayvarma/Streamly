"use client";

import React, { useState, useEffect } from "react";
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
  Layers,
  Sliders,
  DollarSign,
  Download,
} from "lucide-react";
import { useStreamlyStore } from "@/store";
import { formatINR } from "@/lib/utils";

export default function DashboardPage() {
  const { currentCreator, triggerDemoAlert } = useStreamlyStore();
  
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "WIDGETS" | "SETTINGS" | "GOALS">("OVERVIEW");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [testSent, setTestSent] = useState<string | null>(null);

  // Settings State
  const [minAlertAmount, setMinAlertAmount] = useState<number>(50);
  const [soundVolume, setSoundVolume] = useState<number>(80);
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(true);
  const [savedSettings, setSavedSettings] = useState<boolean>(false);

  // Goal State
  const [goalTitle, setGoalTitle] = useState<string>("New 4K Dual PC Streaming Setup 🚀");
  const [goalTarget, setGoalTarget] = useState<number>(150000);
  const [goalCurrent, setGoalCurrent] = useState<number>(112450);
  const [goalSaved, setGoalSaved] = useState<boolean>(false);

  const creatorSlug = currentCreator?.slug || "casetoo";
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://streamly-amber.vercel.app";

  const widgets = [
    {
      id: "alerts",
      title: "OBS Alert Box Overlay",
      desc: "Pop-up animation, audio chime, and Hinglish TTS for live stream tips.",
      url: `${baseUrl}/overlay/alerts/${creatorSlug}`,
      recommendedDim: "800 x 600",
    },
    {
      id: "goals",
      title: "Live Donation Goal Bar",
      desc: "Transparent glowing goal progress bar showing target and progress %.",
      url: `${baseUrl}/overlay/goals/${creatorSlug}`,
      recommendedDim: "700 x 120",
    },
    {
      id: "leaderboard",
      title: "Top Supporters Ticker",
      desc: "Monthly leaderboard ticker showcasing your VIP tippers with gold badges.",
      url: `${baseUrl}/overlay/leaderboard/${creatorSlug}`,
      recommendedDim: "650 x 160",
    },
  ];

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTriggerTest = async (type: string) => {
    setTestSent(type);
    
    // Call server API to broadcast real SSE event to active OBS browser sources
    await fetch("/api/alerts/trigger-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        creatorId: creatorSlug,
        tipperName: "Aarav Sharma (VIP)",
        amount: 500,
        message: "OP stream bro! Clutch gameplay tonight! 🔥",
      }),
    });

    // Also trigger client store for local preview
    triggerDemoAlert({
      tipperName: "Aarav Sharma (VIP)",
      amount: 500,
      message: "OP stream bro! Clutch gameplay tonight! 🔥",
    });

    setTimeout(() => setTestSent(null), 3000);
  };

  const handleSaveGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        creatorId: creatorSlug,
        title: goalTitle,
        targetAmount: Number(goalTarget),
        currentAmount: Number(goalCurrent),
      }),
    });
    setGoalSaved(true);
    setTimeout(() => setGoalSaved(false), 2500);
  };

  const recentTips = [
    { id: "TXN_784920", name: "Aarav Sharma", amount: 500, time: "2 mins ago", msg: "GG! Best clutch gameplay!", status: "SETTLED" },
    { id: "TXN_784919", name: "Kunal Gaming", amount: 1000, time: "14 mins ago", msg: "Op sniper shot!", status: "SETTLED" },
    { id: "TXN_784918", name: "Priya V.", amount: 250, time: "38 mins ago", msg: "Big fan! Keep it up!", status: "SETTLED" },
    { id: "TXN_784917", name: "Anonymous", amount: 150, time: "1 hour ago", msg: "Full support bro", status: "SETTLED" },
  ];

  return (
    <div className="min-h-screen bg-[#07060B] text-white flex flex-col">
      
      {/* Topbar */}
      <header className="border-b border-surface-border bg-[#0B0A12]/90 backdrop-blur-xl px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-40">
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
            <span>PRO CREATOR</span> • 0% Platform Cut
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/creator/${creatorSlug}`}
            target="_blank"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:text-white bg-surface-card hover:bg-surface-cardHover border border-surface-border flex items-center gap-1.5 transition-colors"
          >
            <span>Public Tip Page</span>
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
            <span className="text-xs font-bold text-white hidden md:inline capitalize">
              {creatorSlug}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-surface-border pb-3 overflow-x-auto">
          {[
            { id: "OVERVIEW", label: "Studio Overview", icon: Radio },
            { id: "WIDGETS", label: "OBS Widget Hub", icon: Layers },
            { id: "GOALS", label: "Donation Goals", icon: Target },
            { id: "SETTINGS", label: "Alert & TTS Settings", icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
                  active
                    ? "bg-brand-600 text-white shadow-purple-glow"
                    : "text-text-secondary hover:text-white hover:bg-surface-card"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "OVERVIEW" && (
          <div className="space-y-8 animate-fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { title: "Today's Direct Earnings", value: "₹14,850", badge: "+24% vs yesterday", icon: TrendingUp },
                { title: "Platform Cut Saved", value: "₹4,455", badge: "0% Commission", icon: ShieldCheck },
                { title: "Monthly Total", value: "₹1,84,200", badge: "100% Direct Settlement", icon: DollarSign },
                { title: "Unique Supporters", value: "348", badge: "94% Active Retention", icon: Users },
              ].map((kpi, idx) => {
                const Icon = kpi.icon;
                return (
                  <div key={idx} className="p-5 rounded-2xl glass-panel border border-surface-border space-y-2">
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span>{kpi.title}</span>
                      <Icon className="w-4 h-4 text-brand-400" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                      {kpi.value}
                    </div>
                    <div className="text-[11px] font-semibold text-emerald-400">
                      {kpi.badge}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Test Alert Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-900/40 via-brand-800/20 to-purple-900/30 border border-brand-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-display font-bold text-lg text-white flex items-center justify-center sm:justify-start gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Test Real-Time OBS Broadcast</span>
                </h3>
                <p className="text-xs text-gray-300">
                  Sends an instantaneous ₹500 tip alert with Hinglish TTS audio wave to all active OBS overlays.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleTriggerTest("overview")}
                disabled={testSent === "overview"}
                className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-purple-glow transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
              >
                <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span>{testSent === "overview" ? "Alert Dispatched to OBS!" : "Trigger Test Alert Now"}</span>
              </button>
            </div>

            {/* Recent Live Tips Ledger */}
            <div className="rounded-3xl glass-panel border border-surface-border p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    Live Tips Feed & Bank Settlements
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Every transaction is settled directly into your linked UPI account with 0 delay.
                  </p>
                </div>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg bg-surface-card hover:bg-surface-cardHover border border-surface-border text-xs font-semibold text-gray-300 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-surface-border text-text-secondary uppercase">
                      <th className="pb-3 font-semibold">Ref ID</th>
                      <th className="pb-3 font-semibold">Supporter</th>
                      <th className="pb-3 font-semibold">Message</th>
                      <th className="pb-3 font-semibold">Amount</th>
                      <th className="pb-3 font-semibold">Time</th>
                      <th className="pb-3 font-semibold">Settlement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border/50">
                    {recentTips.map((tip) => (
                      <tr key={tip.id} className="hover:bg-white/[0.02]">
                        <td className="py-3.5 font-mono text-gray-400">{tip.id}</td>
                        <td className="py-3.5 font-bold text-white">{tip.name}</td>
                        <td className="py-3.5 text-gray-300 max-w-xs truncate">{tip.msg}</td>
                        <td className="py-3.5 font-mono font-bold text-emerald-400">{formatINR(tip.amount)}</td>
                        <td className="py-3.5 text-gray-400">{tip.time}</td>
                        <td className="py-3.5">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            {tip.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OBS WIDGET HUB */}
        {activeTab === "WIDGETS" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-display font-bold text-white">
                OBS Studio Browser Sources
              </h2>
              <p className="text-xs text-text-secondary mt-1">
                Copy these URLs directly into OBS Studio / Streamlabs as a <b>Browser Source</b>. Keep background transparent.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {widgets.map((widget) => (
                <div
                  key={widget.id}
                  className="p-6 rounded-3xl glass-panel border border-surface-border flex flex-col justify-between space-y-4 hover:border-brand-500/40 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-brand-400 bg-brand-500/15 px-2.5 py-0.5 rounded-full border border-brand-500/30">
                        {widget.recommendedDim}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {widget.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {widget.desc}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="p-2.5 rounded-xl bg-black/40 border border-surface-border flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-gray-400 truncate">
                        {widget.url}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(widget.id, widget.url)}
                        className="p-1.5 rounded-lg bg-surface-card hover:bg-surface-cardHover text-gray-300 hover:text-white shrink-0"
                      >
                        {copiedKey === widget.id ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleTriggerTest(widget.id)}
                        disabled={testSent === widget.id}
                        className="flex-1 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-colors disabled:opacity-50"
                      >
                        {testSent === widget.id ? "Testing..." : "Send Test Alert"}
                      </button>
                      <Link
                        href={widget.url}
                        target="_blank"
                        className="p-2 rounded-xl bg-surface-card hover:bg-surface-cardHover border border-surface-border text-gray-300 hover:text-white"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: GOALS MANAGER */}
        {activeTab === "GOALS" && (
          <div className="max-w-xl mx-auto rounded-3xl glass-panel border border-surface-border p-6 sm:p-8 space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-brand-400" />
                <span>Live Stream Donation Goal</span>
              </h2>
              <p className="text-xs text-text-secondary mt-1">
                Customize the goal displayed on your public tip page and OBS Goal overlay.
              </p>
            </div>

            <form onSubmit={handleSaveGoal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase">
                  Goal Title
                </label>
                <input
                  type="text"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-card border border-surface-border text-white text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase">
                    Target Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={goalTarget}
                    onChange={(e) => setGoalTarget(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-card border border-surface-border text-white text-sm focus:outline-none focus:border-brand-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase">
                    Current Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={goalCurrent}
                    onChange={(e) => setGoalCurrent(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-card border border-surface-border text-white text-sm focus:outline-none focus:border-brand-500 font-mono"
                  />
                </div>
              </div>

              {/* Live Preview */}
              <div className="p-4 rounded-2xl bg-surface-card border border-surface-border space-y-2">
                <div className="text-xs text-gray-400">Preview:</div>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>{goalTitle}</span>
                  <span className="text-emerald-400 font-mono">
                    {Math.round((goalCurrent / goalTarget) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-500 to-emerald-400"
                    style={{ width: `${Math.min(100, Math.round((goalCurrent / goalTarget) * 100))}%` }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold transition-colors"
              >
                {goalSaved ? "Goal Saved Live!" : "Update Stream Goal"}
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {activeTab === "SETTINGS" && (
          <div className="max-w-xl mx-auto rounded-3xl glass-panel border border-surface-border p-6 sm:p-8 space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-brand-400" />
                <span>OBS Alert & TTS Preferences</span>
              </h2>
              <p className="text-xs text-text-secondary mt-1">
                Configure minimum thresholds, voice synthesis, and volume.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase">
                  Minimum Tip Amount to Trigger OBS Alert: ₹{minAlertAmount}
                </label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={minAlertAmount}
                  onChange={(e) => setMinAlertAmount(Number(e.target.value))}
                  className="w-full accent-brand-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase">
                  Audio Chime Volume: {soundVolume}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={soundVolume}
                  onChange={(e) => setSoundVolume(Number(e.target.value))}
                  className="w-full accent-brand-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-card border border-surface-border">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-brand-400" />
                    <span>Hinglish Text-To-Speech (TTS)</span>
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Reads tip donor name and message out loud on your stream
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={ttsEnabled}
                  onChange={(e) => setTtsEnabled(e.target.checked)}
                  className="rounded border-surface-border text-brand-600 focus:ring-0 w-4 h-4 cursor-pointer"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setSavedSettings(true);
                  setTimeout(() => setSavedSettings(false), 2000);
                }}
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold transition-colors"
              >
                {savedSettings ? "Settings Saved!" : "Save Alert Settings"}
              </button>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
