"use client";

import React from "react";
import { Zap, QrCode, ShieldCheck } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface TipPreset {
  amount: number;
  label: string;
}

interface TipCardProps {
  creatorName?: string;
  selectedAmount: number;
  customAmount: string;
  donorName: string;
  isAnonymous: boolean;
  message: string;
  isProcessing: boolean;
  onSelectPreset: (amt: number) => void;
  onCustomAmountChange: (amt: string) => void;
  onDonorNameChange: (name: string) => void;
  onAnonymousChange: (anon: boolean) => void;
  onMessageChange: (msg: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PRESETS: TipPreset[] = [
  { amount: 49, label: "Bro Support" },
  { amount: 99, label: "Keep Going" },
  { amount: 199, label: "Let's Go! 🔥" },
  { amount: 499, label: "Huge Support" },
];

export function TipCard({
  creatorName = "Casetoo",
  selectedAmount,
  customAmount,
  donorName,
  isAnonymous,
  message,
  isProcessing,
  onSelectPreset,
  onCustomAmountChange,
  onDonorNameChange,
  onAnonymousChange,
  onMessageChange,
  onSubmit,
}: TipCardProps) {
  const effectiveAmount = customAmount ? Number(customAmount) : selectedAmount;
  const isCustomActive = Boolean(customAmount);

  return (
    <div className="w-full rounded-2xl bg-[#12101D] border border-[#27233D] p-5 sm:p-6 space-y-5 shadow-xl">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" />
          <h2 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight">
            Send a Tip to {creatorName}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 font-medium">
          Show your support and help {creatorName} grow! 💜
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        
        {/* Preset Tip Buttons */}
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-2.5">
            Select Tip Amount
          </label>
          <div className="grid grid-cols-4 gap-2">
            {PRESETS.map((preset) => {
              const isSelected = !isCustomActive && selectedAmount === preset.amount;
              return (
                <button
                  key={preset.amount}
                  type="button"
                  onClick={() => onSelectPreset(preset.amount)}
                  className={`py-3 px-1.5 sm:px-2 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-1 border ${
                    isSelected
                      ? "bg-[#6D3DF5] text-white border-[#8B5CF6] shadow-[0_0_20px_rgba(109,61,245,0.45)] scale-[1.02]"
                      : "bg-[#181528] text-gray-300 border-[#27233D] hover:border-[#6D3DF5]/50 hover:bg-[#1E1B31]"
                  }`}
                >
                  <span className="font-mono font-extrabold text-sm sm:text-base leading-none">
                    ₹{preset.amount}
                  </span>
                  <span
                    className={`text-[10px] sm:text-[11px] leading-tight truncate max-w-full ${
                      isSelected ? "text-purple-100 font-semibold" : "text-gray-400"
                    }`}
                  >
                    {preset.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Custom Amount Input */}
          <div className="relative mt-2.5">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400 pointer-events-none">
              ₹
            </span>
            <input
              type="number"
              placeholder="Enter custom amount (min ₹10)"
              value={customAmount}
              onChange={(e) => onCustomAmountChange(e.target.value)}
              min="10"
              max="100000"
              className={`w-full pl-8 pr-4 py-2.5 rounded-xl bg-[#181528] border text-white text-xs sm:text-sm placeholder:text-gray-500 focus:outline-none transition-colors ${
                isCustomActive
                  ? "border-[#6D3DF5] shadow-[0_0_12px_rgba(109,61,245,0.25)]"
                  : "border-[#27233D] focus:border-[#6D3DF5]"
              }`}
            />
          </div>
        </div>

        {/* Supporter Information */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="donorName" className="font-bold text-gray-300">
              Your Name
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-gray-400 hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => onAnonymousChange(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-[#27233D] bg-[#181528] text-[#6D3DF5] focus:ring-0 cursor-pointer accent-[#6D3DF5]"
              />
              <span className="text-[11px]">Tip as Anonymous Fan</span>
            </label>
          </div>
          <input
            id="donorName"
            type="text"
            placeholder="e.g. Aarav Sharma"
            disabled={isAnonymous}
            value={isAnonymous ? "" : donorName}
            onChange={(e) => onDonorNameChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#181528] border border-[#27233D] text-white text-xs sm:text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#6D3DF5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Message for Stream & Hinglish TTS */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="streamMessage" className="font-bold text-gray-300">
              Message for Stream
            </label>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#A78BFA]">
              <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>Hinglish TTS Enabled</span>
            </span>
          </div>
          <div className="relative">
            <textarea
              id="streamMessage"
              rows={3}
              placeholder="Drop your clutch cheer or message here..."
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
              maxLength={200}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#181528] border border-[#27233D] text-white text-xs sm:text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#6D3DF5] transition-colors resize-none pb-6"
            />
            <span className="absolute right-3 bottom-2 text-[10px] text-gray-400 font-mono">
              {message.length}/200
            </span>
          </div>
        </div>

        {/* Primary CTA: Generate QR Code */}
        <button
          type="submit"
          disabled={isProcessing || !effectiveAmount || effectiveAmount < 10}
          className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#6D3DF5] via-[#7C3AED] to-[#8B5CF6] hover:from-[#7C3AED] hover:to-[#9333EA] text-white font-display font-extrabold text-sm sm:text-base tracking-wide shadow-[0_0_25px_rgba(109,61,245,0.45)] hover:shadow-[0_0_35px_rgba(109,61,245,0.6)] transition-all flex items-center justify-center gap-2.5 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <QrCode className="w-5 h-5 text-white stroke-[2.5]" />
          <span>
            {isProcessing ? "Preparing QR Code..." : "Generate QR Code"}
          </span>
        </button>

        {/* Direct UPI Guarantee Badge */}
        <p className="text-[11px] text-center text-gray-400 flex items-center justify-center gap-1.5 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#10E7B2]" />
          <span>0% Platform Commission • 100% Instant Bank Deposit</span>
        </p>

      </form>

    </div>
  );
}
