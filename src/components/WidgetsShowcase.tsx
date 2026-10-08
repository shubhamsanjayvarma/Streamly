"use client";

import React from "react";
import Image from "next/image";
import { Radio, Volume2, Trophy, Target, Shield, Copy, Check } from "lucide-react";

export function WidgetsShowcase() {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="widgets" className="py-20 md:py-28 border-t border-surface-border/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-600/20 text-brand-300 border border-brand-500/30">
            <Radio className="w-3.5 h-3.5 text-brand-400" />
            OBS Studio & Streamlabs
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white">
            OBS Browser Widgets Built for{" "}
            <span className="gradient-purple-text">Indian Livestreams</span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary">
            Paste one transparent browser source link into OBS Studio. Everything runs smoothly with automatic reconnects and low latency.
          </p>
        </div>

        {/* 3 Widgets Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Live Alert Box with Hinglish TTS */}
          <div className="rounded-2xl glass-panel p-6 flex flex-col justify-between border border-surface-border hover:border-brand-500/40 transition-all space-y-6">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400 mb-4">
                <Volume2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Hinglish & Regional TTS
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Streamly speaks out donor messages naturally in Hindi, Hinglish, Tamil, Telugu, and English. Profanity filtering keeps your broadcast safe from strikes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#09080F] border border-surface-border text-xs text-brand-200 flex items-center gap-2">
              <span className="text-base">🎙️</span>
              <span>"Bhai clutch mara mast! Party de do!"</span>
            </div>
          </div>

          {/* Card 2: Live Stream Donation Goal */}
          <div className="rounded-2xl glass-panel p-6 flex flex-col justify-between border border-surface-border hover:border-brand-500/40 transition-all space-y-6">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Dynamic Goal Progress Bar
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Crowdfund your next gaming PC, monitor, or tournament entry. Progress bars update in real-time as soon as a confirmed tip arrives.
              </p>
            </div>

            {/* Mock Goal Widget */}
            <div className="p-4 rounded-xl bg-[#09080F] border border-surface-border space-y-2">
              <div className="flex justify-between text-xs font-semibold text-white">
                <span>New Streaming Monitor</span>
                <span className="text-emerald-400">₹32,500 / ₹50,000</span>
              </div>
              <div className="w-full h-2.5 bg-surface-card rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-brand-500 w-[65%]" />
              </div>
            </div>
          </div>

          {/* Card 3: Live Fan Leaderboard */}
          <div className="rounded-2xl glass-panel p-6 flex flex-col justify-between border border-surface-border hover:border-brand-500/40 transition-all space-y-6">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Top Tipper Leaderboard
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Spark healthy competition among your community. Give VIP badges, XP points, and stream recognition to your biggest supporters.
              </p>
            </div>

            {/* Mock Leaderboard Entry */}
            <div className="p-3 rounded-xl bg-[#09080F] border border-surface-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">#1</span>
                <span className="font-semibold text-white">Rohit_King</span>
              </div>
              <span className="font-mono text-emerald-400 font-bold">₹12,499</span>
            </div>
          </div>

        </div>

        {/* OBS Copy Overlay Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-surface-card to-brand-950/40 border border-brand-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-brand-400 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">
                Secured Tokenized Overlay URL
              </h4>
              <p className="text-xs text-text-secondary">
                Never exposes your streaming credentials. Tokens can be revoked anytime with 1 click.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-surface-cardHover hover:bg-brand-600 border border-surface-border hover:border-brand-500 transition-all flex items-center gap-2 flex-shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? "URL Copied to Clipboard!" : "Copy Sample OBS Browser URL"}
          </button>
        </div>

      </div>
    </section>
  );
}
