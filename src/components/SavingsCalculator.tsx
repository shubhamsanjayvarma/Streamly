"use client";

import React from "react";
import { useStreamlyStore } from "@/store";
import { formatINR } from "@/lib/utils";
import { Check, X, ArrowUpRight, TrendingUp, Sparkles } from "lucide-react";

export function SavingsCalculator() {
  const { monthlyDonationVolume, setMonthlyDonationVolume } = useStreamlyStore();

  // Calculations
  const ytCutPercent = 0.30; // 30% YouTube Super Chat cut
  const ytLostMonthly = monthlyDonationVolume * ytCutPercent;
  const ytCreatorGets = monthlyDonationVolume - ytLostMonthly;

  const streamlyCutPercent = 0.00; // 0% Streamly platform fee on tips
  const pspEstimatedFee = monthlyDonationVolume * 0.035; // ~2-3.5% PG fee
  const streamlyCreatorGets = monthlyDonationVolume - pspEstimatedFee;

  const monthlyExtraKept = streamlyCreatorGets - ytCreatorGets;
  const yearlyExtraKept = monthlyExtraKept * 12;

  return (
    <section id="calculator" className="py-20 md:py-28 border-t border-surface-border/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-600/20 text-brand-300 border border-brand-500/30">
            <TrendingUp className="w-3.5 h-3.5" />
            ROI & Payout Economics
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white">
            See How Much Money You Are{" "}
            <span className="gradient-purple-text">Leaving on the Table</span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary">
            YouTube Super Chat takes 30% of your hard-earned tips and delays payout for a month. With Streamly, keep up to 95%+ of your money with 0 seconds wait.
          </p>
        </div>

        {/* Interactive Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Slider Controls */}
          <div className="lg:col-span-5 rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between space-y-8">
            <div>
              <div className="flex justify-between items-center mb-4">
                <label
                  htmlFor="donation-slider"
                  className="text-sm font-semibold uppercase tracking-wider text-text-secondary"
                >
                  Monthly Livestream Tips
                </label>
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  {formatINR(monthlyDonationVolume)}
                </span>
              </div>

              {/* Range Slider */}
              <input
                id="donation-slider"
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={monthlyDonationVolume}
                onChange={(e) => setMonthlyDonationVolume(Number(e.target.value))}
                className="w-full h-2.5 bg-surface-card rounded-lg appearance-none cursor-pointer accent-brand-600"
              />

              <div className="flex justify-between text-xs text-text-muted mt-2 font-mono">
                <span>₹5,000/mo</span>
                <span>₹2,50,000/mo</span>
                <span>₹5,00,000/mo</span>
              </div>
            </div>

            {/* Annual Savings Highlight Card */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-brand-900/60 via-brand-950 to-surface-card border border-brand-500/40 text-center space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-brand-300">
                Extra Cash in Your Pocket Each Year
              </span>
              <div className="text-4xl sm:text-5xl font-display font-black text-emerald-400 drop-shadow-md">
                +{formatINR(yearlyExtraKept)}
              </div>
              <p className="text-xs text-brand-200/80">
                Enough to upgrade your streaming camera, mic, or dual-PC setup!
              </p>
            </div>
          </div>

          {/* Right Column: Comparative Breakdown Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Streamly Card */}
            <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-brand-950/70 to-surface-card border-2 border-brand-500/60 shadow-purple-glow flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-600 text-white uppercase tracking-wider">
                RECOMMENDED
              </div>
              
              <div>
                <h3 className="text-xl font-display font-bold text-white mb-1">
                  Streamly Direct UPI
                </h3>
                <span className="text-xs text-brand-300 font-medium">
                  ₹0 Platform Commission on tips
                </span>
                
                <div className="mt-6 mb-2">
                  <span className="text-xs text-text-muted">You Take Home Approx:</span>
                  <div className="text-3xl font-display font-extrabold text-white">
                    {formatINR(streamlyCreatorGets)}
                    <span className="text-xs font-normal text-text-muted">/mo</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-gray-200">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>0 Sec:</strong> Instant direct bank settlement</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>₹0:</strong> No monthly platform cut on donations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>OBS Live Alerts:</strong> Animated GIF + Hinglish TTS</span>
                </li>
              </ul>
            </div>

            {/* YouTube Super Chat Card */}
            <div className="rounded-2xl p-6 sm:p-8 bg-surface-card/60 border border-surface-border flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-xl font-display font-bold text-gray-300 mb-1">
                  YouTube Super Chat
                </h3>
                <span className="text-xs text-rose-400 font-medium">
                  30% Mandatory Platform Cut
                </span>
                
                <div className="mt-6 mb-2">
                  <span className="text-xs text-text-muted">You Take Home Only:</span>
                  <div className="text-3xl font-display font-extrabold text-gray-400">
                    {formatINR(ytCreatorGets)}
                    <span className="text-xs font-normal text-text-muted">/mo</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-text-secondary">
                <li className="flex items-center gap-2 text-rose-300">
                  <X className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span><strong>30% Cut:</strong> Loses {formatINR(ytLostMonthly)}/mo</span>
                </li>
                <li className="flex items-center gap-2 text-rose-300">
                  <X className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span><strong>30-Day Delay:</strong> AdSense monthly cycle</span>
                </li>
                <li className="flex items-center gap-2 text-text-muted">
                  <X className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>No custom Hinglish/regional voice alerts</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
