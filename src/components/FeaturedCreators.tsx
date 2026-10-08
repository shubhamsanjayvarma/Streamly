"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, CheckCircle, ExternalLink, Heart } from "lucide-react";

export function FeaturedCreators() {
  const creators = [
    {
      name: "Casetoo Gaming",
      slug: "casetoo",
      game: "BGMI & GTA V Live",
      avatar: "/images/creators/casetoo.jpg",
      quote:
        "Streamly changed my streaming income completely. Every single tip lands in my HDFC account right while I'm still streaming. No 30% cuts to YouTube!",
      verified: true,
      subscribers: "3.2M+",
    },
    {
      name: "Motato",
      slug: "motato",
      game: "Valorant & Variety Gaming",
      avatar: "/images/creators/motato.png",
      quote:
        "The Hinglish voice TTS is hilarious on stream! My chat loves donating ₹49 and ₹99 repeatedly to make funny sound alerts pop up on my screen.",
      verified: true,
      subscribers: "850K+",
    },
    {
      name: "Nakul Dhull",
      slug: "nakul-dhull",
      game: "Battle Royale & Story Games",
      avatar: "/images/creators/nakul-dhull.png",
      quote:
        "Zero delay and 0% commission on tips. It's clean, transparent, and built specifically for Indian streamers who rely on UPI.",
      verified: true,
      subscribers: "520K+",
    },
  ];

  return (
    <section id="creators" className="py-20 md:py-28 bg-[#09080F] border-t border-surface-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/30">
            <Users className="w-3.5 h-3.5" />
            Loved by India's Top Streamers
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white">
            Trusted by Creators With Millions of{" "}
            <span className="gradient-purple-text">Live Viewers</span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary">
            Join the fastest-growing community of Indian gaming streamers keeping 100% of their community love.
          </p>
        </div>

        {/* Creator Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {creators.map((c) => (
            <div
              key={c.slug}
              className="rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between border border-surface-border hover:border-brand-500/50 transition-all space-y-6 group"
            >
              <div className="space-y-4">
                {/* Creator Header */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-brand-500/40 group-hover:scale-105 transition-transform">
                    <Image
                      src={c.avatar}
                      alt={c.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-display font-bold text-lg text-white">
                        {c.name}
                      </h4>
                      {c.verified && (
                        <CheckCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                      )}
                    </div>
                    <span className="text-xs text-brand-300 font-medium">
                      {c.game}
                    </span>
                    <div className="text-[11px] text-text-muted mt-0.5">
                      {c.subscribers} Subscribers
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-sm text-gray-300 italic leading-relaxed pt-2">
                  "{c.quote}"
                </p>
              </div>

              {/* Tipping Page Link */}
              <Link
                href={`/creator/${c.slug}`}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-brand-300 bg-brand-950/50 hover:bg-brand-600 hover:text-white border border-brand-500/30 transition-all flex items-center justify-center gap-2 group/btn"
              >
                <Heart className="w-3.5 h-3.5 fill-brand-400 text-brand-400 group-hover/btn:fill-white group-hover/btn:text-white" />
                <span>Visit {c.name.split(" ")[0]}'s Public Tip Page</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
