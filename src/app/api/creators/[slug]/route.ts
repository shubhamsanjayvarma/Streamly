import { NextRequest, NextResponse } from "next/server";

const creatorsDb: Record<string, any> = {
  casetoo: {
    slug: "casetoo",
    name: "Casetoo",
    avatar: "/images/creators/casetoo.jpg",
    verified: true,
    upiId: "casetoo@okhdfcbank",
    category: "Gaming & Esports",
    subscribers: "1.4M",
    activeGoal: "New 4K Dual PC Setup 🚀",
  },
  dynamogaming: {
    slug: "dynamogaming",
    name: "Dynamo Gaming",
    avatar: "/images/creators/casetoo.jpg",
    verified: true,
    upiId: "dynamo@icici",
    category: "BGMI / PC Gaming",
    subscribers: "10.1M",
    activeGoal: "Charity Stream: Community Education Fund 🎗️",
  },
  shubham: {
    slug: "shubham",
    name: "Shubham Varma",
    avatar: "/brand/streamly-icon.png",
    verified: true,
    upiId: "shubhamvarma@okhdfcbank",
    category: "Creator & Dev Streams",
    subscribers: "500K",
    activeGoal: "Stream Goal: Pro Audio Setup 🎙️",
  },
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const normalizedSlug = slug?.toLowerCase();

  const creator = creatorsDb[normalizedSlug] || {
    slug: normalizedSlug,
    name: normalizedSlug.charAt(0).toUpperCase() + normalizedSlug.slice(1),
    avatar: "/brand/streamly-icon.png",
    verified: true,
    upiId: `${normalizedSlug}@okhdfcbank`,
    category: "Streamer",
    subscribers: "100K",
    activeGoal: "Live Stream Goal 🎯",
  };

  return NextResponse.json({
    success: true,
    data: creator,
  });
}
