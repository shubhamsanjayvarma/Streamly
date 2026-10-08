"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Volume2 } from "lucide-react";
import { useStreamlyStore } from "@/store";
import { formatINR } from "@/lib/utils";

export default function OBSAlertOverlay() {
  const { currentAlert, triggerDemoAlert } = useStreamlyStore();
  const [activeAlert, setActiveAlert] = useState(currentAlert);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (currentAlert) {
      setActiveAlert(currentAlert);
      setVisible(true);

      // Play soft audio beep or chime using Web Audio API
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
      } catch (err) {
        // Audio playback auto-policy bypass
      }

      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [currentAlert]);

  return (
    <div className="w-screen h-screen bg-transparent flex items-center justify-center p-8 select-none overflow-hidden">
      
      {/* Alert Overlay Box */}
      {visible && activeAlert && (
        <div className="flex flex-col items-center text-center animate-alert-pop max-w-xl p-8 rounded-3xl bg-[#090810]/95 border-2 border-brand-500 shadow-[0_0_50px_rgba(109,61,245,0.6)] backdrop-blur-md">
          
          {/* Animated GIF */}
          <div className="relative w-36 h-36 mb-3">
            <Image
              src="/images/alerts/throwing-money.gif"
              alt="Stream Alert"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Tipper & Header */}
          <div className="text-2xl font-display font-extrabold text-white tracking-wide flex items-center gap-2">
            <span>{activeAlert.tipperName}</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-brand-600 text-white font-bold">
              NEW TIP!
            </span>
          </div>

          {/* Glowing Formatted Amount */}
          <div className="text-5xl font-display font-black text-amber-400 drop-shadow-[0_4px_16px_rgba(251,191,36,0.4)] my-2">
            {formatINR(activeAlert.amount)}
          </div>

          {/* Message */}
          {activeAlert.message && (
            <p className="text-base text-gray-100 italic bg-white/10 px-6 py-3 rounded-2xl max-w-md border border-white/15 my-2">
              "{activeAlert.message}"
            </p>
          )}

          {/* Hinglish TTS Indicator */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full bg-brand-600/30 text-brand-300 border border-brand-500/40 mt-1">
            <Volume2 className="w-4 h-4 text-brand-400 animate-pulse" />
            <span>Hinglish TTS Speaking On Stream...</span>
          </div>

        </div>
      )}

    </div>
  );
}
