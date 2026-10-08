"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Zap, ShieldCheck, ArrowRight, Gamepad2, Lock, Mail } from "lucide-react";
import { CreatorLoginSchema } from "@/schemas/tipping";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("casetoo@streamly.in");
  const [password, setPassword] = useState("GamingPro2026!");
  const [platform, setPlatform] = useState<"YOUTUBE" | "TWITCH" | "KICK">("YOUTUBE");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const validation = CreatorLoginSchema.safeParse({ email, password, platform });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      setLoading(false);
      return;
    }

    // Simulate login and redirect to dashboard
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 700);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#07060B]">
      
      {/* Background Gaming Video Loop */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-[1px]"
      >
        <source src="/video/bg.mp4" type="video/mp4" />
      </video>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07060B] via-[#07060B]/80 to-transparent" />

      {/* Center Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl glass-panel p-8 shadow-2xl border border-brand-500/40 backdrop-blur-2xl">
        
        {/* Brand Header */}
        <div className="text-center mb-8 space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-purple-glow">
              <Image
                src="/brand/streamly-icon.png"
                alt="Streamly"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-display font-extrabold text-2xl text-white tracking-wider">
              STREAMLY
            </span>
          </Link>
          <h2 className="text-xl font-display font-bold text-white pt-2">
            Creator Studio Login
          </h2>
          <p className="text-xs text-text-secondary">
            Access your direct UPI tipping dashboard, OBS widgets, and revenue
          </p>
        </div>

        {/* Platform Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 mb-6 p-1 rounded-xl bg-surface-card border border-surface-border">
          {(["YOUTUBE", "TWITCH", "KICK"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlatform(p)}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                platform === p
                  ? "bg-brand-600 text-white shadow-purple-glow"
                  : "text-text-muted hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
              Email / Streaming ID
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-card border border-surface-border focus:border-brand-500 focus:outline-none text-sm text-white transition-colors"
                placeholder="streamer@gaming.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-card border border-surface-border focus:border-brand-500 focus:outline-none text-sm text-white transition-colors"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 shadow-purple-glow-lg transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-60 mt-2"
          >
            {loading ? (
              <span>Authenticating Studio...</span>
            ) : (
              <>
                <span>Enter Creator Studio</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-6 pt-6 border-t border-surface-border text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit Encrypted Creator Portal</span>
          </div>
          <Link
            href="/"
            className="block text-xs text-text-muted hover:text-white transition-colors"
          >
            ← Return to Streamly Homepage
          </Link>
        </div>

      </div>
    </div>
  );
}
