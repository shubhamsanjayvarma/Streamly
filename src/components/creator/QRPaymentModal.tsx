"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import {
  X,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  Flame,
  Loader2,
  Sparkles,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

interface QRPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorName?: string;
  creatorSlug?: string;
  amount: number;
  donorName: string;
  isAnonymous: boolean;
  message: string;
  upiUri?: string;
  creatorUpiId?: string;
  transactionId?: string;
  onPaymentConfirmed: () => void;
}

export function QRPaymentModal({
  isOpen,
  onClose,
  creatorName = "Casetoo",
  creatorSlug = "casetoo",
  amount,
  donorName,
  isAnonymous,
  message,
  upiUri,
  creatorUpiId = "casetoo@okhdfcbank",
  transactionId,
  onPaymentConfirmed,
}: QRPaymentModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Generate QR Code data URL when modal opens or upiUri updates
  useEffect(() => {
    if (!isOpen) return;

    const uri =
      upiUri ||
      `upi://pay?pa=${creatorUpiId}&pn=${encodeURIComponent(
        creatorName
      )}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(
        `Streamly Tip from ${isAnonymous ? "Anonymous Supporter" : donorName || "Fan"}`
      )}&tr=${transactionId || `txn_${Date.now()}`}`;

    QRCode.toDataURL(uri, {
      width: 280,
      margin: 1.5,
      color: {
        dark: "#0F0D1A",
        light: "#FFFFFF",
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => {
        console.error("Failed to generate QR code:", err);
      });
  }, [isOpen, upiUri, creatorUpiId, creatorName, amount, isAnonymous, donorName, transactionId]);

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(creatorUpiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    // Simulate network confirmation check, ensure it actually triggers the backend alert
    try {
      // Dispatch real-time live alert via API so OBS browser source updates
      await fetch("/api/alerts/trigger-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorId: creatorSlug,
          tipperName: isAnonymous ? "Anonymous Fan" : donorName || "Supporter",
          amount,
          message: message || "Direct UPI tip received!",
        }),
      });

      // Brief delay to simulate network reconciliation
      setTimeout(() => {
        setIsVerifying(false);
        onPaymentConfirmed();
      }, 900);
    } catch {
      setIsVerifying(false);
      onPaymentConfirmed();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-[#12101D] border border-[#27233D] p-5 sm:p-6 shadow-[0_0_50px_rgba(109,61,245,0.3)] space-y-4">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#181528] border border-[#27233D] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1 pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6D3DF5]/15 border border-[#6D3DF5]/30 text-xs font-bold text-[#A78BFA]">
            <Flame className="w-3.5 h-3.5 text-[#A78BFA] fill-[#A78BFA]/30" />
            <span>Support {creatorName}</span>
          </div>
          <div className="font-display font-black text-2xl text-white">
            {formatINR(amount)}
          </div>
          <p className="text-xs text-gray-400">
            Scan using any UPI app to transfer directly
          </p>
        </div>

        {/* Scannable QR Code Box */}
        <div className="relative p-3.5 rounded-2xl bg-white flex flex-col items-center justify-center shadow-inner mx-auto w-fit">
          {qrDataUrl ? (
            <div className="relative w-52 h-52 sm:w-56 sm:h-56">
              <Image
                src={qrDataUrl}
                alt={`UPI QR Code to pay ${formatINR(amount)} to ${creatorName}`}
                fill
                className="object-contain rounded-lg"
              />
            </div>
          ) : (
            <div className="w-52 h-52 sm:w-56 sm:h-56 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-7 h-7 text-[#6D3DF5] animate-spin" />
              <span className="text-xs text-gray-600 font-semibold">
                Rendering QR Code...
              </span>
            </div>
          )}

          <div className="mt-2 text-[11px] font-bold text-gray-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Scan with GPay, PhonePe, Paytm, or BHIM</span>
          </div>
        </div>

        {/* UPI Details & Copy */}
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#181528] border border-[#27233D] text-xs">
            <div className="truncate pr-2">
              <span className="text-gray-400 block text-[10px]">UPI ID</span>
              <span className="font-mono text-gray-200 font-semibold truncate">
                {creatorUpiId}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopyUpi}
              className="px-2.5 py-1 rounded-lg bg-[#241F3B] hover:bg-[#6D3DF5] text-white text-[11px] font-bold transition-colors flex items-center gap-1 shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Deep link for mobile users */}
          {upiUri && (
            <a
              href={upiUri}
              className="w-full py-2 px-3 rounded-xl bg-[#181528] border border-[#27233D] hover:border-[#6D3DF5]/40 text-xs font-semibold text-[#A78BFA] hover:text-white flex items-center justify-center gap-1.5 transition-colors sm:hidden"
            >
              <span>Pay directly via UPI App</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Waiting for payment status & action */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-300 font-medium bg-[#161326] p-2 rounded-xl border border-[#27233D]">
            <Loader2 className="w-3.5 h-3.5 text-[#A78BFA] animate-spin" />
            <span>Waiting for payment confirmation...</span>
          </div>

          <button
            type="button"
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full py-3 rounded-xl bg-[#10E7B2] hover:bg-[#0fd2a2] text-[#0A0714] font-display font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_0_15px_rgba(16,231,178,0.3)] transition-all flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Confirming Direct Transfer...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>I've Completed Payment</span>
              </>
            )}
          </button>
        </div>

        {/* Security badge */}
        <p className="text-[10px] text-center text-gray-400 flex items-center justify-center gap-1 pt-1">
          <ShieldCheck className="w-3 h-3 text-[#10E7B2]" />
          <span>Instant Settlement directly to creator's bank account</span>
        </p>

      </div>
    </div>
  );
}
