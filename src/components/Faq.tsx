"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the direct bank transfer with zero payout delay work?",
      a: "Unlike traditional streaming platforms that hold your money in an escrow account for 30 days before paying out, Streamly processes tips directly to your linked UPI bank account in real-time. When a viewer tips on your public page, the transaction settles immediately via NPCI UPI.",
    },
    {
      q: "Does Streamly really take 0% commission on my tips?",
      a: "Yes! Streamly does not charge any platform commission on creator donations. You keep 100% of the tipping amount after standard third-party payment gateway processing fees. We sustain our platform purely through optional creator subscriptions.",
    },
    {
      q: "How do I set up the live alert box in OBS Studio or Streamlabs?",
      a: "It takes under 30 seconds! Go to your Streamly Dashboard, copy your private Overlay Browser URL, open OBS Studio, add a new 'Browser' source, paste the URL, and set width to 1920 and height to 1080. Check 'Shutdown source when not visible'. Your alerts will now pop up with animation and audio on stream!",
    },
    {
      q: "What UPI apps can my viewers use to tip?",
      a: "Viewers can use ANY UPI application in India — including Google Pay, PhonePe, Paytm, Amazon Pay, BHIM, Cred, and all bank UPI apps. Viewers do not need to register on Streamly to send a tip.",
    },
    {
      q: "How does Streamly protect against vulgar, abusive, or strike-inducing messages?",
      a: "Streamly features automated real-time profanity filtering and offensive phrase detection built specifically for Indian livestream communities (Hindi, Hinglish, and English). Filtered messages will have offensive words muted or blocked from OBS on-screen display and TTS speech.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#09080F] border-t border-surface-border/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-600/20 text-brand-300 border border-brand-500/30">
            <HelpCircle className="w-3.5 h-3.5" />
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-text-secondary">
            Everything you need to know about setting up Streamly for your livestreams.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl glass-panel border border-surface-border overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-white hover:text-brand-300 transition-colors"
                >
                  <span>{f.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-text-secondary leading-relaxed border-t border-surface-border/50 pt-4">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
