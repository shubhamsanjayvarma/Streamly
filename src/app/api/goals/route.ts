import { NextRequest, NextResponse } from "next/server";
import { Goal, GoalSchema, UpdateGoalSchema } from "@/schemas/goal";

// In-memory Goal store for creators
const goalsDb: Record<string, Goal> = {
  casetoo: {
    id: "goal-casetoo-1",
    creatorId: "casetoo",
    title: "New 4K Dual PC Streaming Setup 🚀",
    targetAmount: 150000,
    currentAmount: 112450,
    active: true,
  },
  dynamogaming: {
    id: "goal-dynamo-1",
    creatorId: "dynamogaming",
    title: "Charity Stream: Community Education Fund 🎗️",
    targetAmount: 500000,
    currentAmount: 385000,
    active: true,
  },
  mortal: {
    id: "goal-mortal-1",
    creatorId: "mortal",
    title: "LAN Tournament Bootcamp Fund 🏆",
    targetAmount: 250000,
    currentAmount: 198000,
    active: true,
  },
  demo: {
    id: "goal-demo-1",
    creatorId: "demo",
    title: "Stream Goal: New Pro Mic & Audio Mixer 🎙️",
    targetAmount: 50000,
    currentAmount: 37500,
    active: true,
  },
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const creatorId = searchParams.get("creatorId") || "demo";

  const goal = goalsDb[creatorId.toLowerCase()] || {
    id: `goal-${creatorId}-1`,
    creatorId,
    title: "Live Stream Goal 🎯",
    targetAmount: 50000,
    currentAmount: 22000,
    active: true,
  };

  return NextResponse.json({ success: true, data: goal });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = UpdateGoalSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid goal update payload",
          issues: validated.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { creatorId, title, targetAmount, currentAmount } = validated.data;
    const existing = goalsDb[creatorId.toLowerCase()] || {
      id: `goal-${creatorId}-${Date.now()}`,
      creatorId,
      title: "Stream Goal",
      targetAmount: 50000,
      currentAmount: 0,
      active: true,
    };

    const updated: Goal = {
      ...existing,
      ...(title !== undefined && { title }),
      ...(targetAmount !== undefined && { targetAmount }),
      ...(currentAmount !== undefined && { currentAmount }),
    };

    goalsDb[creatorId.toLowerCase()] = updated;

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating goal:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update goal" },
      { status: 500 }
    );
  }
}
