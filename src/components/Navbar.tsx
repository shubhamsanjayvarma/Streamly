"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, Menu, X, ShieldCheck, ArrowRight, User } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-border/60 bg-[#0B0A12]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-purple-glow transition-transform group-hover:scale-105">
            <Image
              src="/brand/streamly-icon.png"
              alt="Streamly Icon"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl tracking-wider text-white">
                STREAMLY
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-600/20 text-brand-400 border border-brand-500/30">
                PROD v1.0
              </span>
            </div>
            <span className="text-[10px] font-medium text-text-secondary tracking-widest uppercase">
              Direct UPI • 0% Cut
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <a
            href="#direct-bank"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-brand-400" />
            0% Payout Delay
          </a>
          <a href="#payment-routes" className="hover:text-white transition-colors">
            UPI Modes
          </a>
          <a href="#calculator" className="hover:text-white transition-colors">
            Calculator
          </a>
          <a href="#widgets" className="hover:text-white transition-colors">
            OBS Overlays
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-text-secondary hover:text-white hover:bg-surface-card transition-all flex items-center gap-2 border border-transparent hover:border-surface-border"
          >
            <User className="w-4 h-4" />
            Creator Login
          </Link>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 shadow-purple-glow hover:shadow-purple-glow-lg transition-all flex items-center gap-2 active:scale-95"
          >
            <Zap className="w-4 h-4 fill-white" />
            Dashboard
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-text-secondary hover:text-white rounded-lg focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-surface-border bg-surface-dark px-6 py-6 flex flex-col gap-4 text-base">
          <a
            href="#direct-bank"
            onClick={() => setMobileMenuOpen(false)}
            className="text-text-secondary hover:text-white py-1"
          >
            Zero Payout Delay
          </a>
          <a
            href="#payment-routes"
            onClick={() => setMobileMenuOpen(false)}
            className="text-text-secondary hover:text-white py-1"
          >
            Payment Modes
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="text-text-secondary hover:text-white py-1"
          >
            Savings Calculator
          </a>
          <a
            href="#widgets"
            onClick={() => setMobileMenuOpen(false)}
            className="text-text-secondary hover:text-white py-1"
          >
            OBS Overlays
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="text-text-secondary hover:text-white py-1"
          >
            Pricing
          </a>
          <div className="pt-4 border-t border-surface-border flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg border border-surface-border text-white font-medium"
            >
              Creator Login
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-brand-600 text-white font-semibold shadow-purple-glow"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
