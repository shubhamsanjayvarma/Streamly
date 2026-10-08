"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, Volume2, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useStreamlyStore } from "@/store";
import { formatINR } from "@/lib/utils";

export function Hero() {
  const { currentAlert, isSimulating, triggerDemoAlert } = useStreamlyStore();

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden radial-glow-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Messaging & Value Prop */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <span>👑</span> The Original • India's #1 UPI Stream Tipping Platform
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Direct Bank Transfer • Zero Hold
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1]">
              Receive Live Stream Tips{" "}
              <span className="gradient-purple-text">
                Directly in Your Bank Account
              </span>
            </h1>

            {/* Zero-Delay Callout Banner */}
            <div className="w-full p-4 rounded-xl bg-gradient-to-r from-brand-900/40 via-surface-card to-brand-900/30 border border-brand-500/30 text-sm sm:text-base text-brand-100 flex items-start gap-3 shadow-lg">
              <span className="text-xl">💸</span>
              <div>
                <strong className="text-white">We do not hold your money!</strong> Every single tip goes straight into your bank account via UPI in real-time. Zero waiting for weekly or 30-day payout cycles.
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Display live OBS stream alerts with Hinglish TTS voice, power real-time donation goals, and keep <strong>up to 95%+ of your earnings</strong> without high platform cuts.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 shadow-purple-glow-lg transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>🚀 Launch Creator Dashboard</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#calculator"
                className="px-6 py-4 rounded-xl text-base font-semibold text-white bg-surface-card hover:bg-surface-cardHover border border-surface-border transition-all flex items-center justify-center gap-2"
              >
                Calculate Your Savings
              </a>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 border-t border-surface-border/80 w-full max-w-xl">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  0 Sec
                </span>
                <span className="text-xs sm:text-sm text-text-secondary font-medium">
                  Instant Settlement
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-emerald-400">
                  ₹0
                </span>
                <span className="text-xs sm:text-sm text-text-secondary font-medium">
                  Platform Commission
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-brand-400">
                  95%+
                </span>
                <span className="text-xs sm:text-sm text-text-secondary font-medium">
                  Take-Home Payout
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Live OBS Alert Preview Box */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl glass-panel p-6 shadow-2xl border border-brand-500/30 overflow-hidden">
              
              {/* Box Header */}
              <div className="flex items-center justify-between pb-4 border-b border-surface-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Live OBS Alert Simulation
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  OBS BROWSER SOURCE
                </span>
              </div>

              {/* Alert Stage (What viewer & streamer sees on stream) */}
              <div className="my-6 min-h-[310px] bg-[#07060B]/90 rounded-xl p-5 border border-brand-900/60 flex flex-col items-center justify-center text-center relative overflow-hidden">
                {currentAlert ? (
                  <div
                    key={currentAlert.id}
                    className="w-full flex flex-col items-center animate-alert-pop space-y-3"
                  >
                    {/* Throwing Money GIF Animation */}
                    <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-brand-950/40 p-1 border border-brand-500/20">
                      <Image
                        src="/images/alerts/throwing-money.gif"
                        alt="Throwing Money Alert"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>

                    {/* Tipper Name & Tag */}
                    <div className="text-lg sm:text-xl font-display font-extrabold text-white flex items-center gap-2">
                      <span>{currentAlert.tipperName}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-brand-600/30 text-brand-300 font-medium">
                        Supporter
                      </span>
                    </div>

                    {/* Formatted Amount with Glowing Purple Pill */}
                    <div className="text-3xl sm:text-4xl font-display font-black text-amber-400 drop-shadow-md tracking-tight">
                      {formatINR(currentAlert.amount)}
                    </div>

                    {/* Tipper Message */}
                    <p className="text-sm sm:text-base text-gray-200 italic bg-white/5 px-4 py-2 rounded-lg max-w-sm border border-white/10">
                      "{currentAlert.message}"
                    </p>

                    {/* Hinglish TTS Audio Waveform Bar */}
                    <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-600/20 text-brand-300 border border-brand-500/30">
                      <Volume2 className="w-3.5 h-3.5 text-brand-400 animate-bounce" />
                      <span>{currentAlert.audioVoice}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-text-muted text-sm">
                    Waiting for stream donations...
                  </div>
                )}
              </div>

              {/* Interactive Control to test right in browser */}
              <div className="pt-2 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => triggerDemoAlert()}
                  disabled={isSimulating}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-brand-600 hover:bg-brand-500 active:scale-98 transition-all shadow-purple-glow flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  {isSimulating ? "Simulating Live Alert in OBS..." : "⚡ Trigger Real-Time Test Alert"}
                </button>
                <div className="flex items-center justify-between text-[11px] text-text-muted px-1">
                  <span>Transparent 1920×1080 canvas</span>
                  <span>Audio chime synced</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
