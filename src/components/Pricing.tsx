"use client";

import React from "react";
import Link from "next/link";
import { Check, Zap, Sparkles, ShieldCheck } from "lucide-react";

export function Pricing() {
  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      period: "forever",
      desc: "Perfect for budding streamers starting their livestream journey.",
      features: [
        "₹0 Platform Commission on tips",
        "Instant Direct Bank UPI Settlement",
        "Standard Animated Alert Box",
        "Basic English & Hindi TTS",
        "Live Donation Goal Widget",
        "Mandatory 'Powered by Streamly' badge",
      ],
      popular: false,
      cta: "Get Started Free",
      href: "/login",
    },
    {
      id: "pro",
      name: "Creator Pro",
      price: "₹499",
      period: "/month",
      desc: "For full-time creators who want custom brand overlays and zero branding.",
      features: [
        "₹0 Platform Commission on tips",
        "Remove 'Powered by Streamly' branding",
        "Custom Animated GIF / Video Alerts",
        "Advanced Hinglish & Regional TTS",
        "Supporter XP, Badges & VIP Levels",
        "Live Stream Leaderboard Widget",
        "Custom CSS & Sound FX upload",
      ],
      popular: true,
      cta: "Upgrade to Pro",
      href: "/login",
    },
    {
      id: "plus",
      name: "Creator Plus",
      price: "₹999",
      period: "/month",
      desc: "For top-tier streamers needing AI insights, combos, and fan challenges.",
      features: [
        "Everything in Creator Pro",
        "AI-Powered Supporter & Tip Insights",
        "Donation Combos & Multipliers",
        "Interactive Community Stream Challenges",
        "Creator Store Foundation (Merch/Packs)",
        "Advanced Profanity & AI Moderation",
        "24/7 Priority Discord Support",
      ],
      popular: false,
      cta: "Get Creator Plus",
      href: "/login",
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 border-t border-surface-border/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-600/20 text-brand-300 border border-brand-500/30">
            <Zap className="w-3.5 h-3.5" />
            Transparent Subscriptions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white">
            Simple Plans with{" "}
            <span className="gradient-purple-text">0% Tipping Commission</span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary">
            We monetize through optional software subscriptions — <strong>never</strong> by skimming percentages off your audience's love.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                p.popular
                  ? "bg-gradient-to-b from-brand-950 via-surface-card to-surface-card border-2 border-brand-500 shadow-purple-glow-lg -translate-y-2"
                  : "glass-panel border border-surface-border hover:border-brand-500/40"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-brand-600 to-brand-500 text-white uppercase tracking-wider shadow-md">
                  MOST POPULAR FOR STREAMERS
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-display font-bold text-white">
                    {p.name}
                  </h3>
                  <p className="text-xs text-text-muted mt-1 min-h-[32px]">
                    {p.desc}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-display font-black text-white">
                    {p.price}
                  </span>
                  <span className="text-xs text-text-muted">{p.period}</span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-surface-border text-xs sm:text-sm text-gray-200">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href={p.href}
                  className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    p.popular
                      ? "bg-brand-600 hover:bg-brand-500 text-white shadow-purple-glow active:scale-98"
                      : "bg-surface-cardHover hover:bg-brand-600/30 text-white border border-surface-border hover:border-brand-500/40"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer Note */}
        <div className="mt-12 text-center text-xs text-text-muted max-w-2xl mx-auto">
          * Streamly takes ₹0 platform commission on your tips across all plans. Standard payment gateway processing charges (typically ~2-3%) apply directly to the banking provider.
        </div>

      </div>
    </section>
  );
}
