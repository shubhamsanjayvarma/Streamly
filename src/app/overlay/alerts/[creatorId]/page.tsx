"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Volume2, Sparkles } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { AlertEvent } from "@/schemas/overlay";

export default function OBSAlertOverlay() {
  const params = useParams();
  const creatorId = (params?.creatorId as string) || "demo";

  const [activeAlert, setActiveAlert] = useState<AlertEvent | null>(null);
  const [visible, setVisible] = useState(false);

  // Play audio chime and speak with Web Speech API
  const playAlertEffects = (alert: AlertEvent) => {
    // 1. Synthesize soft celebratory chime using Web Audio API
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.7);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.7);
    } catch (e) {
      console.warn("Audio autoplay policy prevented sound chime");
    }

    // 2. Hinglish / English Text-To-Speech using Web Speech API
    if (alert.ttsEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        const textToSpeak = `${alert.tipperName} ne ${alert.amount} rupees tip kiya! ${alert.message || ""}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 1.0;
        utterance.pitch = 1.05;

        // Try to pick Hindi or Indian English voice if available in user's OS
        const voices = window.speechSynthesis.getVoices();
        const indianVoice = voices.find(
          (v) =>
            v.lang.includes("hi-IN") ||
            v.lang.includes("en-IN") ||
            v.name.toLowerCase().includes("india")
        );
        if (indianVoice) {
          utterance.voice = indianVoice;
        }

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("TTS speech synthesis error:", err);
      }
    }
  };

  // Connect to live Server-Sent Events stream for real-time OBS alerts
  useEffect(() => {
    let eventSource: EventSource | null = null;

    try {
      eventSource = new EventSource(`/api/alerts/events?creatorId=${creatorId}`);

      eventSource.addEventListener("alert", (event) => {
        try {
          const alertData: AlertEvent = JSON.parse(event.data);
          setActiveAlert(alertData);
          setVisible(true);
          playAlertEffects(alertData);

          setTimeout(() => {
            setVisible(false);
          }, 6000);
        } catch (err) {
          console.error("Failed to parse incoming alert event:", err);
        }
      });
    } catch (err) {
      console.error("SSE connection error:", err);
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [creatorId]);

  return (
    <div className="w-screen h-screen bg-transparent flex items-center justify-center p-8 select-none overflow-hidden">
      
      {/* 100% Transparent OBS Canvas with Pop-in Alert */}
      {visible && activeAlert && (
        <div className="flex flex-col items-center text-center animate-alert-pop max-w-xl p-8 rounded-3xl bg-[#090810]/95 border-2 border-brand-500 shadow-[0_0_60px_rgba(109,61,245,0.7)] backdrop-blur-md">
          
          {/* Animated GIF */}
          <div className="relative w-36 h-36 mb-2">
            <Image
              src={activeAlert.gifUrl || "/images/alerts/throwing-money.gif"}
              alt="Stream Alert"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Tipper & Header */}
          <div className="text-2xl font-display font-extrabold text-white tracking-wide flex items-center gap-2">
            <span>{activeAlert.tipperName}</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-brand-600 text-white font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              NEW TIP!
            </span>
          </div>

          {/* Formatted Glowing Amount */}
          <div className="text-5xl font-display font-black text-amber-400 drop-shadow-[0_4px_16px_rgba(251,191,36,0.5)] my-2">
            {formatINR(activeAlert.amount)}
          </div>

          {/* Message */}
          {activeAlert.message && (
            <p className="text-base text-gray-100 italic bg-white/10 px-6 py-3 rounded-2xl max-w-md border border-white/15 my-2">
              "{activeAlert.message}"
            </p>
          )}

          {/* Hinglish TTS Audio Wave Indicator */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full bg-brand-600/30 text-brand-300 border border-brand-500/40 mt-1">
            <Volume2 className="w-4 h-4 text-brand-400 animate-pulse" />
            <span>Hinglish TTS Voice Speaking Live...</span>
          </div>

        </div>
      )}

    </div>
  );
}
