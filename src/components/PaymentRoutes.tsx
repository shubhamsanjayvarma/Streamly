"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Smartphone, Zap, Lock, Landmark } from "lucide-react";

export function PaymentRoutes() {
  const providers = [
    {
      name: "Google Pay",
      logo: "/images/providers/google-pay.webp",
      desc: "Fast UPI Intent & QR Scanner",
    },
    {
      name: "PhonePe",
      logo: "/images/providers/phonepe.webp",
      desc: "Instant Direct Bank UPI",
    },
    {
      name: "Paytm UPI",
      logo: "/images/providers/paytm.webp",
      desc: "All Bank Accounts & Wallets",
    },
    {
      name: "Amazon Pay",
      logo: "/images/providers/amazon-pay.svg",
      desc: "Amazon Pay UPI & Cards",
    },
    {
      name: "HDFC SmartHub",
      logo: "/images/providers/hdfc-smarthub.webp",
      desc: "Enterprise Banking Gateway",
    },
  ];

  return (
    <section id="payment-routes" className="py-20 md:py-28 bg-[#09080F] border-t border-surface-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Landmark className="w-3.5 h-3.5" />
            100% Direct Bank Settlement
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white">
            Supports Every UPI App in India —{" "}
            <span className="gradient-purple-text">Zero Middleman Wallet</span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary">
            Your viewers do not need to download a new app or register an account. They tip straight from Google Pay, PhonePe, Paytm, or BHIM.
          </p>
        </div>

        {/* Provider Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {providers.map((p) => (
            <div
              key={p.name}
              className="p-5 rounded-2xl bg-surface-card/70 border border-surface-border hover:border-brand-500/50 hover:bg-surface-cardHover transition-all flex flex-col items-center text-center space-y-3 group shadow-md"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10 group-hover:scale-105 transition-transform">
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={64}
                  height={64}
                  className="object-contain max-h-12 w-auto"
                />
              </div>
              <h4 className="text-sm font-bold text-white font-display">
                {p.name}
              </h4>
              <p className="text-[11px] text-text-muted leading-tight">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Security & Zero Escrow Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl glass-panel border border-brand-500/20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-brand-600/20 text-brand-400 border border-brand-500/30">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">Instant UPI Intent</h5>
              <p className="text-xs text-text-secondary mt-1">
                Fans on mobile are redirected straight to their UPI app with 1-tap verification.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">NPCI Compliant UPI</h5>
              <p className="text-xs text-text-secondary mt-1">
                Bank-grade 256-bit encryption. Never stores your UPI PIN or banking credentials.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">Zero Frozen Wallet Risk</h5>
              <p className="text-xs text-text-secondary mt-1">
                Since Streamly does not hold escrow funds, your earnings are safe from sudden platform freezes.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
