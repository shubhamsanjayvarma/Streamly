import { NextRequest, NextResponse } from "next/server";

interface Supporter {
  rank: number;
  name: string;
  totalAmount: number;
  tipsCount: number;
  badge: string;
  avatar: string;
}

const mockLeaderboards: Record<string, Supporter[]> = {
  casetoo: [
    { rank: 1, name: "Vikram Rajput", totalAmount: 25000, tipsCount: 14, badge: "👑 VIP King", avatar: "/brand/streamly-icon.png" },
    { rank: 2, name: "Aarav Sharma", totalAmount: 18500, tipsCount: 9, badge: "🥈 Diamond", avatar: "/brand/streamly-icon.png" },
    { rank: 3, name: "Kunal Gaming", totalAmount: 12000, tipsCount: 6, badge: "🥉 Gold", avatar: "/brand/streamly-icon.png" },
    { rank: 4, name: "Priya V.", totalAmount: 7500, tipsCount: 4, badge: "⭐ Silver", avatar: "/brand/streamly-icon.png" },
    { rank: 5, name: "GamerBro99", totalAmount: 5000, tipsCount: 3, badge: "⭐ Supporter", avatar: "/brand/streamly-icon.png" },
  ],
  dynamogaming: [
    { rank: 1, name: "Hydra Fan #1", totalAmount: 50000, tipsCount: 20, badge: "👑 VIP King", avatar: "/brand/streamly-icon.png" },
    { rank: 2, name: "Sneha Patel", totalAmount: 32000, tipsCount: 12, badge: "🥈 Diamond", avatar: "/brand/streamly-icon.png" },
    { rank: 3, name: "Amit B.", totalAmount: 21500, tipsCount: 8, badge: "🥉 Gold", avatar: "/brand/streamly-icon.png" },
  ],
  demo: [
    { rank: 1, name: "Aarav Sharma", totalAmount: 15000, tipsCount: 8, badge: "👑 VIP King", avatar: "/brand/streamly-icon.png" },
    { rank: 2, name: "Kunal Gaming", totalAmount: 9500, tipsCount: 5, badge: "🥈 Diamond", avatar: "/brand/streamly-icon.png" },
    { rank: 3, name: "Priya V.", totalAmount: 6000, tipsCount: 4, badge: "🥉 Gold", avatar: "/brand/streamly-icon.png" },
  ],
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const creatorId = searchParams.get("creatorId") || "demo";
  const period = searchParams.get("period") || "monthly"; // 'all_time' | 'monthly' | 'weekly'

  const supporters = mockLeaderboards[creatorId.toLowerCase()] || mockLeaderboards.demo;

  return NextResponse.json({
    success: true,
    data: {
      creatorId,
      period,
      topSupporters: supporters,
      totalRaised: supporters.reduce((acc, s) => acc + s.totalAmount, 0),
    },
  });
}
