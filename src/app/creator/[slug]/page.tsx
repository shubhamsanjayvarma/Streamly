"use client";

import React, { useState, useEffect } from "react";
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
  QrCode,
  Trophy,
  Crown,
  Medal,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { formatINR } from "@/lib/utils";

export default function CreatorTipPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "casetoo";

  const [activeTab, setActiveTab] = useState<"TIP" | "LEADERBOARD">("TIP");
  const [selectedAmount, setSelectedAmount] = useState<number>(199);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [paymentApp, setPaymentApp] = useState<string>("GPAY");
  const [showQrCode, setShowQrCode] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [transactionData, setTransactionData] = useState<any>(null);

  // Live Goal State
  const [goal, setGoal] = useState({
    title: "Stream Goal: 4K Dual PC Setup 🚀",
    targetAmount: 150000,
    currentAmount: 112450,
  });

  // Top Supporters State
  const [topSupporters, setTopSupporters] = useState<any[]>([]);

  useEffect(() => {
    // Load Goal
    fetch(`/api/goals?creatorId=${slug}`)
      .then((res) => res.json())
      .then((d) => {
        if (d.success && d.data) setGoal(d.data);
      })
      .catch(() => {});

    // Load Leaderboard
    fetch(`/api/leaderboard?creatorId=${slug}`)
      .then((res) => res.json())
      .then((d) => {
        if (d.success && d.data) setTopSupporters(d.data.topSupporters || []);
      })
      .catch(() => {});
  }, [slug]);

  const amountToPay = customAmount ? Number(customAmount) : selectedAmount;
  const goalPercentage = Math.min(
    100,
    Math.round((goal.currentAmount / goal.targetAmount) * 100)
  );

  const handlePresetSelect = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount("");
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amountToPay || amountToPay < 10) return;

    setIsProcessing(true);

    try {
      // 1. Create secure payment intent via production API
      const res = await fetch("/api/tipping/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorSlug: slug,
          amount: amountToPay,
          donorName: donorName || "Fan",
          isAnonymous,
          message,
          paymentRoute: paymentApp,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setTransactionData(data.data);

        // 2. Dispatch real-time live alert via API so OBS browser source updates
        await fetch("/api/alerts/trigger-test", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            creatorId: slug,
            tipperName: isAnonymous ? "Anonymous Supporter" : donorName || "Supporter",
            amount: amountToPay,
            message: message || "Direct UPI tip received!",
          }),
        });

        // 3. Update Goal progress optimistically
        setGoal((prev) => ({
          ...prev,
          currentAmount: prev.currentAmount + amountToPay,
        }));

        setIsProcessing(false);
        setPaymentSuccess(true);

        // Trigger Confetti Celebration
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ["#6D3DF5", "#A78BFA", "#10B981", "#F59E0B"],
        });
      } else {
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setIsProcessing(false);
    }
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

      {/* Main Container - Mobile First Card */}
      <div className="max-w-md mx-auto w-full rounded-3xl glass-panel p-6 sm:p-8 border border-brand-500/30 shadow-2xl space-y-6">
        
        {/* Creator Info Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-surface-border">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-brand-500 shadow-purple-glow">
            <Image
              src="/images/creators/casetoo.jpg"
              alt="Creator"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-display font-extrabold text-white capitalize">
                {slug}
              </h1>
              <CheckCircle className="w-4 h-4 text-brand-400 fill-brand-400/20" />
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Instant Bank Settlement • 0% Platform Deduction
            </p>
          </div>
        </div>

        {/* Live Donation Goal Progress Bar */}
        <div className="p-3.5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-200 flex items-center gap-1.5 truncate max-w-[240px]">
              <Target className="w-3.5 h-3.5 text-brand-400 shrink-0" />
              <span>{goal.title}</span>
            </span>
            <span className="font-mono font-bold text-emerald-400 shrink-0">
              {goalPercentage}%
            </span>
          </div>

          <div className="relative w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${goalPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
            <span>{formatINR(goal.currentAmount)}</span>
            <span>Target: {formatINR(goal.targetAmount)}</span>
          </div>
        </div>

        {/* Navigation Tabs (Tip vs Leaderboard) */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-[#0F0E17] border border-surface-border text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("TIP")}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "TIP"
                ? "bg-brand-600 text-white shadow"
                : "text-text-secondary hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Send Direct Tip</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("LEADERBOARD")}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "LEADERBOARD"
                ? "bg-brand-600 text-white shadow"
                : "text-text-secondary hover:text-white"
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>Top Supporters</span>
          </button>
        </div>

        {/* TAB 1: TIP FORM */}
        {activeTab === "TIP" && (
          <>
            {paymentSuccess ? (
              <div className="py-8 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-emerald-glow">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h2 className="text-2xl font-display font-black text-white">
                  Tip Sent Directly!
                </h2>
                <p className="text-sm text-text-secondary max-w-xs mx-auto">
                  {formatINR(amountToPay)} transferred straight to {slug}'s bank account. Alert and Hinglish TTS triggered live on stream!
                </p>
                {transactionData?.transactionId && (
                  <div className="p-2.5 rounded-xl bg-surface-card border border-surface-border text-xs font-mono text-gray-400">
                    Ref: {transactionData.transactionId}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentSuccess(false);
                    setMessage("");
                  }}
                  className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold transition-colors"
                >
                  Send Another Tip
                </button>
              </div>
            ) : (
              <form onSubmit={handlePay} className="space-y-5">
                
                {/* Preset Chips */}
                <div>
                  <label className="block text-xs font-bold text-text-secondary mb-2 uppercase tracking-wider">
                    Select Tip Amount
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[49, 99, 199, 499].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handlePresetSelect(amt)}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                          selectedAmount === amt && !customAmount
                            ? "bg-brand-600 text-white border-brand-400 shadow-purple-glow"
                            : "bg-surface-card text-text-secondary border-surface-border hover:border-brand-500/40"
                        }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount Input */}
                  <div className="relative mt-2.5">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
                      ₹
                    </span>
                    <input
                      type="number"
                      placeholder="Or enter custom amount (min ₹10)"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      min="10"
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-surface-card border border-surface-border text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Donor Details */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aarav Sharma"
                      disabled={isAnonymous}
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-card border border-surface-border text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-brand-500 transition-colors disabled:opacity-50"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-text-secondary hover:text-white">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded border-surface-border text-brand-600 focus:ring-0"
                    />
                    <span>Tip as Anonymous Fan</span>
                  </label>
                </div>

                {/* Message & Hinglish TTS */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                      Message For Stream
                    </label>
                    <span className="text-[11px] font-semibold text-brand-300">
                      ⚡ Hinglish TTS Enabled
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Drop your clutch cheer or message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={250}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-card border border-surface-border text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-brand-500 transition-colors resize-none"
                  />
                </div>

                {/* Payment Mode Selector */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                      Payment Route
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowQrCode(!showQrCode)}
                      className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1 font-semibold"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>{showQrCode ? "Hide QR" : "Show QR Code"}</span>
                    </button>
                  </div>

                  {showQrCode ? (
                    <div className="p-4 rounded-2xl bg-white text-black text-center space-y-2">
                      <div className="w-40 h-40 mx-auto bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                        <QrCode className="w-24 h-24 text-gray-700" />
                      </div>
                      <p className="text-xs font-bold text-gray-700">
                        Scan with GPay, PhonePe, Paytm, or BHIM
                      </p>
                      <p className="text-[11px] text-gray-500">
                        Amount: {formatINR(amountToPay)}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "GPAY", label: "Google Pay" },
                        { id: "PHONEPE", label: "PhonePe" },
                        { id: "PAYTM", label: "Paytm UPI" },
                      ].map((app) => (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => setPaymentApp(app.id)}
                          className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                            paymentApp === app.id
                              ? "bg-brand-600/30 text-brand-300 border-brand-500 shadow-purple-glow"
                              : "bg-surface-card text-gray-400 border-surface-border hover:text-white"
                          }`}
                        >
                          {app.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Tip Button */}
                <button
                  type="submit"
                  disabled={isProcessing || amountToPay < 10}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-display font-extrabold text-base tracking-wide shadow-purple-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Zap className="w-5 h-5 fill-amber-300 text-amber-300" />
                  <span>
                    {isProcessing
                      ? "Verifying Direct Bank Settlement..."
                      : `Send ${formatINR(amountToPay)} Tip Directly`}
                  </span>
                </button>

                {/* Direct UPI Guarantee Note */}
                <p className="text-[11px] text-center text-gray-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>0% Platform Commission • 100% Instant Bank Deposit</span>
                </p>

              </form>
            )}
          </>
        )}

        {/* TAB 2: SUPPORTERS LEADERBOARD */}
        {activeTab === "LEADERBOARD" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-surface-border text-xs text-text-secondary">
              <span>Top Supporters This Month</span>
              <span className="font-semibold text-brand-400">Ranked by Total Tips</span>
            </div>

            <div className="space-y-2">
              {topSupporters.map((s, idx) => (
                <div
                  key={s.rank || idx}
                  className={`p-3 rounded-2xl flex items-center justify-between border ${
                    idx === 0
                      ? "bg-amber-500/10 border-amber-400/40"
                      : idx === 1
                      ? "bg-slate-500/10 border-slate-400/30"
                      : "bg-surface-card border-surface-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs bg-white/10">
                      {idx === 0 ? "👑" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{s.name}</div>
                      <div className="text-[11px] text-gray-400">{s.tipsCount} tips sent</div>
                    </div>
                  </div>

                  <div className="text-xs font-mono font-extrabold text-amber-400">
                    {formatINR(s.totalAmount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
