"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

// Reusable & Dedicated Creator Components
import { CreatorHero } from "@/components/creator/CreatorHero";
import { CreatorStats } from "@/components/creator/CreatorStats";
import { AboutBioCard } from "@/components/creator/AboutBioCard";
import { MySetupCard } from "@/components/creator/MySetupCard";
import { WhatIDoCard } from "@/components/creator/WhatIDoCard";
import { ContentGamesCard } from "@/components/creator/ContentGamesCard";
import { MySocialsCard } from "@/components/creator/MySocialsCard";

export default function CreatorAboutPage() {
  const params = useParams();
  const slugParam = (params?.slug as string) || "casetoo";
  const slug = slugParam.toLowerCase();
  const creatorDisplayName =
    slug === "casetoo"
      ? "Casetoo"
      : slug.charAt(0).toUpperCase() + slug.slice(1);

  // Goal data fetched dynamically from backend
  const [goal, setGoal] = useState({
    title: "New 4K Dual PC Streaming Setup 🚀",
    targetAmount: 150000,
    currentAmount: 112450,
  });

  // Performance measurement: Track mount latency from navigation click
  useEffect(() => {
    if (typeof performance !== "undefined") {
      performance.mark("about-mounted");
      try {
        performance.measure("nav-support-to-about", "nav-click-about", "about-mounted");
        const entry = performance.getEntriesByName("nav-support-to-about").pop();
        if (entry) {
          console.log(`[Streamly Perf] Support -> About navigation completed in ${entry.duration.toFixed(1)}ms`);
        }
      } catch {}
    }
  }, []);

  useEffect(() => {
    fetch(`/api/goals?creatorId=${slug}`)
      .then((res) => res.json())
      .then((d) => {
        if (d.success && d.data) {
          setGoal({
            title: d.data.title || "New 4K Dual PC Streaming Setup 🚀",
            targetAmount: d.data.targetAmount || 150000,
            currentAmount: d.data.currentAmount || 112450,
          });
        }
      })
      .catch(() => {});
  }, [slug]);

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5">
        
        {/* 2. Full-Width Creator Hero with Tagline & Trust Badges */}
        <CreatorHero
          creatorName={creatorDisplayName}
          category="Gaming • Live Streaming • Community"
          tagline="Good Games Brighter People 💜"
          showTrustPills={true}
        />

        {/* 3. Six Compact Creator Statistics Cards */}
        <CreatorStats
          followers="128K"
          watching="2.4K"
          totalViews="1.2M"
          extended={true}
        />

        {/* 4. Main Two-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* LEFT COLUMN: About Casetoo & My Setup */}
          <div className="lg:col-span-6 space-y-5">
            <AboutBioCard creatorName={creatorDisplayName} />
            <MySetupCard
              title={goal.title}
              currentAmount={goal.currentAmount}
              targetAmount={goal.targetAmount}
            />
          </div>

          {/* RIGHT COLUMN: What I Do, Content & Games, My Socials */}
          <div className="lg:col-span-6 space-y-5">
            <WhatIDoCard />
            <ContentGamesCard />
            <MySocialsCard />
          </div>

        </div>

      </main>
  );
}
