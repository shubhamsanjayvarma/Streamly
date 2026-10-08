"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Check, ShieldCheck, Zap } from "lucide-react";
import { formatINR } from "@/lib/utils";

// Creator Components
import { CreatorHero } from "@/components/creator/CreatorHero";
import { CreatorStats } from "@/components/creator/CreatorStats";
import { FundingGoal } from "@/components/creator/FundingGoal";
import { TrustIndicators } from "@/components/creator/TrustIndicators";
import { SupportersList } from "@/components/creator/SupportersList";
import { TipCard } from "@/components/creator/TipCard";
import { LiveChat } from "@/components/creator/LiveChat";

// Heavy payment modal dynamically loaded only when user triggers QR payment
const QRPaymentModal = dynamic(
  () => import("@/components/creator/QRPaymentModal").then((m) => m.QRPaymentModal),
  { ssr: false }
);

export default function CreatorPage() {
  const params = useParams();
  const slugParam = (params?.slug as string) || "casetoo";
  const slug = slugParam.toLowerCase();
  const creatorDisplayName =
    slug === "casetoo"
      ? "Casetoo"
      : slug.charAt(0).toUpperCase() + slug.slice(1);

  // Tip form state
  const [selectedAmount, setSelectedAmount] = useState<number>(199);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // Payment & Modal state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [transactionData, setTransactionData] = useState<any>(null);

  // Live Goal State
  const [goal, setGoal] = useState({
    title: "New 4K Dual PC Streaming Setup 🚀",
    targetAmount: 150000,
    currentAmount: 112450,
  });

  // Top / Recent Supporters
  const [recentSupporters, setRecentSupporters] = useState<any[]>([
    {
      id: "s1",
      rank: 1,
      name: "RohanOP",
      message: "Keep going legend! 🔥",
      amount: 199,
      timeAgo: "2 min ago",
      avatar: "/images/avatars/rohan.jpg",
    },
    {
      id: "s2",
      rank: 2,
      name: "Sneha",
      message: "Amazing content! 💜",
      amount: 99,
      timeAgo: "8 min ago",
      avatar: "/images/avatars/sneha.jpg",
    },
    {
      id: "s3",
      rank: 3,
      name: "Aryan",
      message: "Best streamer!",
      amount: 499,
      timeAgo: "15 min ago",
      avatar: "/images/creators/motato.png",
    },
    {
      id: "s4",
      rank: 4,
      name: "Kunal",
      message: "4K setup soon! 🚀",
      amount: 49,
      timeAgo: "23 min ago",
      avatar: "/images/creators/nakul-dhull.png",
    },
    {
      id: "s5",
      rank: 5,
      name: "Priya",
      message: "Love your streams 💜",
      amount: 99,
      timeAgo: "32 min ago",
      avatar: "/images/avatars/sneha.jpg",
    },
  ]);

  const [topSupporters, setTopSupporters] = useState<any[]>([
    {
      id: "t1",
      rank: 1,
      name: "Aryan",
      message: "Best streamer! 🔥",
      amount: 25000,
      timeAgo: "Top Donor",
      avatar: "/images/creators/motato.png",
    },
    {
      id: "t2",
      rank: 2,
      name: "Vikram Rajput",
      message: "Dual PC setup donation! 👑",
      amount: 18500,
      timeAgo: "VIP King",
      avatar: "/images/avatars/rohan.jpg",
    },
    {
      id: "t3",
      rank: 3,
      name: "RohanOP",
      message: "Always backing Casetoo!",
      amount: 12000,
      timeAgo: "Diamond Tier",
      avatar: "/images/avatars/rohan.jpg",
    },
    {
      id: "t4",
      rank: 4,
      name: "Priya",
      message: "Keep smashing records! 💜",
      amount: 7500,
      timeAgo: "Elite Supporter",
      avatar: "/images/avatars/sneha.jpg",
    },
    {
      id: "t5",
      rank: 5,
      name: "Kunal",
      message: "Bro never stops grinding 🚀",
      amount: 5000,
      timeAgo: "Super Supporter",
      avatar: "/images/creators/nakul-dhull.png",
    },
  ]);

  // Performance measurement: Track mount latency from navigation click
  useEffect(() => {
    if (typeof performance !== "undefined") {
      performance.mark("support-mounted");
      try {
        performance.measure("nav-about-to-support", "nav-click-support", "support-mounted");
        const entry = performance.getEntriesByName("nav-about-to-support").pop();
        if (entry) {
          console.log(`[Streamly Perf] About -> Support navigation completed in ${entry.duration.toFixed(1)}ms`);
        }
      } catch {}
    }
  }, []);

  // Load backend Goal and Leaderboard data asynchronously in parallel
  useEffect(() => {
    Promise.allSettled([
      fetch(`/api/goals?creatorId=${slug}`).then((res) => res.json()),
      fetch(`/api/leaderboard?creatorId=${slug}`).then((res) => res.json()),
    ]).then(([goalsResult, leaderboardResult]) => {
      if (
        goalsResult.status === "fulfilled" &&
        goalsResult.value?.success &&
        goalsResult.value.data
      ) {
        setGoal({
          title: goalsResult.value.data.title || "New 4K Dual PC Streaming Setup 🚀",
          targetAmount: goalsResult.value.data.targetAmount || 150000,
          currentAmount: goalsResult.value.data.currentAmount || 112450,
        });
      }

      if (
        leaderboardResult.status === "fulfilled" &&
        leaderboardResult.value?.success &&
        leaderboardResult.value.data?.topSupporters?.length > 0
      ) {
        const formatted = leaderboardResult.value.data.topSupporters.map(
          (s: any, idx: number) => ({
            id: `top-${idx}`,
            rank: s.rank || idx + 1,
            name: s.name,
            message: s.badge || "VIP Supporter",
            amount: s.totalAmount,
            timeAgo: "Top Donor",
            avatar: idx % 2 === 0 ? "/images/avatars/rohan.jpg" : "/images/avatars/sneha.jpg",
          })
        );
        setTopSupporters(formatted);
      }
    });
  }, [slug]);

  const amountToPay = customAmount ? Number(customAmount) : selectedAmount;

  const handleSelectPreset = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount("");
  };

  const handleGenerateQR = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amountToPay || amountToPay < 10) return;

    setIsProcessing(true);

    try {
      const res = await fetch("/api/tipping/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorSlug: slug,
          amount: amountToPay,
          donorName: isAnonymous ? "Anonymous Fan" : donorName || "Fan",
          isAnonymous,
          message: message || "",
          paymentRoute: "UPI_INTENT",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setTransactionData(data.data);
        setIsProcessing(false);
        setShowQrModal(true);
      } else {
        // Fallback local transaction data
        setTransactionData({
          transactionId: `txn_${Date.now()}_local`,
          amount: amountToPay,
          creatorSlug: slug,
          creatorUpiId: `${slug}@okhdfcbank`,
        });
        setIsProcessing(false);
        setShowQrModal(true);
      }
    } catch {
      // In case of network error, still open QR with local intent URI
      setTransactionData({
        transactionId: `txn_${Date.now()}_local`,
        amount: amountToPay,
        creatorSlug: slug,
        creatorUpiId: `${slug}@okhdfcbank`,
      });
      setIsProcessing(false);
      setShowQrModal(true);
    }
  };

  const handlePaymentConfirmed = () => {
    setShowQrModal(false);
    setPaymentSuccess(true);

    // Update Goal optimistically
    setGoal((prev) => ({
      ...prev,
      currentAmount: prev.currentAmount + amountToPay,
    }));

    // Add to recent supporters list
    const newSupporter = {
      id: `new_${Date.now()}`,
      rank: 1,
      name: isAnonymous ? "Anonymous Fan" : donorName || "Awesome Fan",
      message: message || "Keep going legend! 🔥",
      amount: amountToPay,
      timeAgo: "Just now",
      avatar: "/images/avatars/rohan.jpg",
    };
    setRecentSupporters((prev) => [newSupporter, ...prev.slice(0, 4)]);

    // Trigger celebration confetti (dynamically loaded)
    try {
      import("canvas-confetti").then((mod) => {
        const confettiFn = mod.default;
        confettiFn({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#6D3DF5", "#A78BFA", "#10E7B2", "#F59E0B"],
        });
      });
    } catch {}
  };

  return (
    <>
      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* DESKTOP LAYOUT (2 Columns) */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6 items-start">
          
          {/* LEFT COLUMN: Creator Profile, Stats, Goal, Trust, Supporters */}
          <div className="lg:col-span-7 space-y-5">
            <CreatorHero creatorName={creatorDisplayName} />
            <CreatorStats />
            <FundingGoal
              title={goal.title}
              currentAmount={goal.currentAmount}
              targetAmount={goal.targetAmount}
            />
            <TrustIndicators />
            <SupportersList
              recentSupporters={recentSupporters}
              topSupporters={topSupporters}
            />
          </div>

          {/* RIGHT COLUMN: Tip Form / Success & Live Chat */}
          <div className="lg:col-span-5 space-y-5 sticky top-20">
            {paymentSuccess ? (
              <div className="w-full rounded-2xl bg-[#12101D] border border-[#27233D] p-6 text-center space-y-4 shadow-xl animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#10E7B2]/20 border-2 border-[#10E7B2] text-[#10E7B2] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,231,178,0.3)]">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-xl font-display font-extrabold text-white">
                  Tip Transferred Directly!
                </h3>
                <p className="text-xs text-gray-300 max-w-xs mx-auto leading-relaxed">
                  {formatINR(amountToPay)} transferred instantly to {creatorDisplayName}'s bank account. Alert and Hinglish TTS triggered live on stream!
                </p>
                {transactionData?.transactionId && (
                  <div className="p-2.5 rounded-xl bg-[#181528] border border-[#27233D] text-[11px] font-mono text-gray-400">
                    Ref ID: {transactionData.transactionId}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentSuccess(false);
                    setMessage("");
                  }}
                  className="w-full py-3.5 rounded-xl bg-[#6D3DF5] hover:bg-[#7C3AED] text-white text-xs sm:text-sm font-bold transition-all shadow-[0_0_20px_rgba(109,61,245,0.4)] cursor-pointer"
                >
                  Send Another Tip
                </button>
              </div>
            ) : (
              <TipCard
                creatorName={creatorDisplayName}
                selectedAmount={selectedAmount}
                customAmount={customAmount}
                donorName={donorName}
                isAnonymous={isAnonymous}
                message={message}
                isProcessing={isProcessing}
                onSelectPreset={handleSelectPreset}
                onCustomAmountChange={setCustomAmount}
                onDonorNameChange={setDonorName}
                onAnonymousChange={setIsAnonymous}
                onMessageChange={setMessage}
                onSubmit={handleGenerateQR}
              />
            )}

            <LiveChat />
          </div>

        </div>

        {/* MOBILE LAYOUT (Strict Single Column Ordered as Specified in Requirements) */}
        {/* Order: Creator Hero -> Stats -> Funding Goal -> Tip Card -> Trust Indicators -> Supporters -> Live Chat */}
        <div className="flex flex-col space-y-5 lg:hidden">
          {/* 1. Creator Hero */}
          <CreatorHero creatorName={creatorDisplayName} />

          {/* 2. Stats */}
          <CreatorStats />

          {/* 3. Funding Goal */}
          <FundingGoal
            title={goal.title}
            currentAmount={goal.currentAmount}
            targetAmount={goal.targetAmount}
          />

          {/* 4. Tip Card (or Success state) placed prominently near top on mobile */}
          {paymentSuccess ? (
            <div className="w-full rounded-2xl bg-[#12101D] border border-[#27233D] p-6 text-center space-y-4 shadow-xl animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#10E7B2]/20 border-2 border-[#10E7B2] text-[#10E7B2] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,231,178,0.3)]">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="text-xl font-display font-extrabold text-white">
                Tip Transferred Directly!
              </h3>
              <p className="text-xs text-gray-300 max-w-xs mx-auto leading-relaxed">
                {formatINR(amountToPay)} transferred instantly to {creatorDisplayName}'s bank account. Alert and Hinglish TTS triggered live on stream!
              </p>
              {transactionData?.transactionId && (
                <div className="p-2.5 rounded-xl bg-[#181528] border border-[#27233D] text-[11px] font-mono text-gray-400">
                  Ref ID: {transactionData.transactionId}
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  setPaymentSuccess(false);
                  setMessage("");
                }}
                className="w-full py-3.5 rounded-xl bg-[#6D3DF5] hover:bg-[#7C3AED] text-white text-xs sm:text-sm font-bold transition-all shadow-[0_0_20px_rgba(109,61,245,0.4)]"
              >
                Send Another Tip
              </button>
            </div>
          ) : (
            <TipCard
              creatorName={creatorDisplayName}
              selectedAmount={selectedAmount}
              customAmount={customAmount}
              donorName={donorName}
              isAnonymous={isAnonymous}
              message={message}
              isProcessing={isProcessing}
              onSelectPreset={handleSelectPreset}
              onCustomAmountChange={setCustomAmount}
              onDonorNameChange={setDonorName}
              onAnonymousChange={setIsAnonymous}
              onMessageChange={setMessage}
              onSubmit={handleGenerateQR}
            />
          )}

          {/* 5. Trust Indicators */}
          <TrustIndicators />

          {/* 6. Supporters */}
          <SupportersList
            recentSupporters={recentSupporters}
            topSupporters={topSupporters}
          />

          {/* 7. Live Chat */}
          <LiveChat />
        </div>

      </main>

      {/* QR Code Payment Modal */}
      <QRPaymentModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        creatorName={creatorDisplayName}
        creatorSlug={slug}
        amount={amountToPay}
        donorName={donorName}
        isAnonymous={isAnonymous}
        message={message}
        upiUri={transactionData?.upiUri}
        creatorUpiId={transactionData?.creatorUpiId || `${slug}@okhdfcbank`}
        transactionId={transactionData?.transactionId}
        onPaymentConfirmed={handlePaymentConfirmed}
      />
    </>
  );
}
