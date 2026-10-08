"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Heart,
  ShieldCheck,
  CheckCircle,
  Zap,
  Target,
  ArrowLeft,
  Smartphone,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";
import { formatINR } from "@/lib/utils";
import { useStreamlyStore } from "@/store";

export default function CreatorTipPage() {
  const params = useParams();
  const slug = params?.slug as string || "casetoo";
  const { currentCreator, triggerDemoAlert } = useStreamlyStore();

  const [selectedAmount, setSelectedAmount] = useState<number>(199);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [paymentApp, setPaymentApp] = useState<string>("GPAY");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  const amountToPay = customAmount ? Number(customAmount) : selectedAmount;

  const handlePresetSelect = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount("");
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amountToPay || amountToPay < 10) return;

    setIsProcessing(true);

    // Simulate direct UPI payment & server webhook confirmation
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6D3DF5", "#A78BFA", "#10B981", "#F59E0B"],
      });

      // Send alert to live OBS overlay
      triggerDemoAlert({
        tipperName: isAnonymous ? "Anonymous Supporter" : donorName || "Fan",
        amount: amountToPay,
        message: message || "Direct UPI Tip sent! GG!",
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#07060B] text-white flex flex-col justify-between py-6 px-4 sm:px-6 relative overflow-hidden radial-glow">
      
      {/* Top Bar with back link */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Streamly Home</span>
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Direct UPI</span>
        </div>
      </div>

      {/* Main Container - Mobile First */}
      <div className="max-w-md mx-auto w-full rounded-2xl glass-panel p-6 sm:p-8 border border-brand-500/30 shadow-2xl space-y-6">
        
        {/* Creator Info */}
        <div className="flex items-center gap-4 pb-4 border-b border-surface-border">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-brand-500 shadow-purple-glow">
            <Image
              src="/images/creators/casetoo.jpg"
              alt="Casetoo"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-display font-extrabold text-xl text-white">
                {currentCreator?.displayName || "Casetoo Gaming"}
              </h1>
              <CheckCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              {currentCreator?.bio || "Full time BGMI & GTA V Live Streamer"}
            </p>
          </div>
        </div>

        {/* Live Donation Goal Progress */}
        {currentCreator?.goal && (
          <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-brand-400" />
                {currentCreator.goal.title}
              </span>
              <span className="font-mono text-emerald-400 font-bold">
                {formatINR(currentCreator.goal.currentINR)} / {formatINR(currentCreator.goal.targetINR)}
              </span>
            </div>
            <div className="w-full h-2 bg-surface-dark rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-600 to-emerald-400 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(
                    100,
                    (currentCreator.goal.currentINR / currentCreator.goal.targetINR) * 100
                  )}%`,
                }}
              />
            </div>
          </div>
        )}

        {paymentSuccess ? (
          /* Payment Success State */
          <div className="py-8 text-center space-y-4 animate-alert-pop">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-extrabold text-white">
              Tip Sent Successfully!
            </h3>
            <p className="text-sm text-brand-200">
              {formatINR(amountToPay)} was deposited directly into the creator's bank account via UPI.
            </p>
            <div className="p-4 rounded-xl bg-[#09080F] border border-surface-border text-xs text-text-secondary">
              ⚡ Alert is now triggering on stream in OBS with Hinglish TTS!
            </div>
            <button
              type="button"
              onClick={() => {
                setPaymentSuccess(false);
                setMessage("");
              }}
              className="w-full py-3 rounded-xl bg-surface-card hover:bg-surface-cardHover text-white text-xs font-bold border border-surface-border"
            >
              Send Another Tip
            </button>
          </div>
        ) : (
          /* Tipping Form */
          <form onSubmit={handlePay} className="space-y-5">
            
            {/* Amount Selection */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                Choose Tip Amount
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[49, 99, 199, 499, 999].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handlePresetSelect(amt)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      selectedAmount === amt && !customAmount
                        ? "bg-brand-600 text-white border-brand-500 shadow-purple-glow"
                        : "bg-surface-card text-text-secondary border-surface-border hover:text-white"
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              {/* Custom amount input */}
              <div className="mt-3 relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-text-muted">
                  ₹
                </span>
                <input
                  type="number"
                  min="10"
                  max="100000"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(0);
                  }}
                  placeholder="Or enter custom amount (e.g. 500)"
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-surface-card border border-surface-border focus:border-brand-500 text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Supporter Name */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Your Display Name
                </label>
                <label className="flex items-center gap-1.5 text-xs text-text-muted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded bg-surface-card border-surface-border text-brand-600 focus:ring-0"
                  />
                  <span>Anonymous</span>
                </label>
              </div>
              <input
                type="text"
                disabled={isAnonymous}
                value={isAnonymous ? "Anonymous Fan" : donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="E.g. Aarav, GamingPro, Priya"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-card border border-surface-border focus:border-brand-500 text-sm text-white focus:outline-none disabled:opacity-50"
              />
            </div>

            {/* Message with TTS warning */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Stream Message (Speaks in TTS)
                </label>
                <span className="text-[11px] text-text-muted">
                  {message.length}/200
                </span>
              </div>
              <textarea
                rows={2}
                maxLength={200}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write message to streamer (speaks on stream with TTS)..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-card border border-surface-border focus:border-brand-500 text-sm text-white focus:outline-none resize-none"
              />
            </div>

            {/* Payment App Selector */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                Pay Via Direct UPI
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "GPAY", label: "GPay" },
                  { id: "PHONEPE", label: "PhonePe" },
                  { id: "PAYTM", label: "Paytm" },
                  { id: "ANY_UPI", label: "Any UPI" },
                ].map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => setPaymentApp(app.id)}
                    className={`py-2 text-[11px] font-bold rounded-xl border transition-all ${
                      paymentApp === app.id
                        ? "bg-brand-600/30 text-white border-brand-500 shadow-purple-glow"
                        : "bg-surface-card text-text-muted border-surface-border"
                    }`}
                  >
                    {app.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 shadow-purple-glow-lg transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-60"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>
                {isProcessing
                  ? "Verifying UPI Settlement..."
                  : `Send Tip ${formatINR(amountToPay)} Directly to Bank`}
              </span>
            </button>
          </form>
        )}

      </div>

      {/* Powered by Streamly Branding */}
      <div className="text-center mt-6 text-xs text-text-muted flex items-center justify-center gap-1.5">
        <span>Powered by</span>
        <Link href="/" className="font-bold text-white hover:text-brand-300">
          Streamly
        </Link>
        <span>• Direct UPI for Indian Streamers</span>
      </div>

    </div>
  );
}
