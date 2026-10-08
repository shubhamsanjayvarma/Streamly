"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Heart, Zap, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-[#07060B] text-text-secondary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                <Image
                  src="/brand/streamly-icon.png"
                  alt="Streamly Icon"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-display font-black text-xl text-white tracking-wider">
                STREAMLY
              </span>
            </Link>
            <p className="text-xs text-text-muted leading-relaxed">
              India's #1 direct UPI stream tipping & livestream alerts platform. Built for gamers, content creators, and live communities.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Direct Bank Settlement</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#direct-bank" className="hover:text-white transition-colors">
                  Zero Payout Delay
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Savings Calculator
                </a>
              </li>
              <li>
                <a href="#payment-routes" className="hover:text-white transition-colors">
                  Supported UPI Apps
                </a>
              </li>
              <li>
                <a href="#widgets" className="hover:text-white transition-colors">
                  OBS Alert Box Widgets
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Subscription Plans
                </a>
              </li>
            </ul>
          </div>

          {/* Creators & Demos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Creator Pages
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/creator/casetoo" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Casetoo Gaming</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/creator/motato" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Motato Live</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/creator/nakul-dhull" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Nakul Dhull</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/overlay/alerts/demo" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>OBS Overlay Preview</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Actions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Account & Studio
            </h4>
            <div className="flex flex-col gap-2 pt-1">
              <Link
                href="/login"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-surface-card hover:bg-surface-cardHover border border-surface-border text-center transition-all"
              >
                Creator Login
              </Link>
              <Link
                href="/dashboard"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 text-center shadow-purple-glow transition-all"
              >
                Launch Dashboard
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-surface-border/50 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-4">
          <div>
            © {new Date().getFullYear()} Streamly Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>for Indian Gaming Streamers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
