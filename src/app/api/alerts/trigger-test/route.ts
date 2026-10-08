import { NextRequest, NextResponse } from "next/server";
import { realtimeHub } from "@/lib/realtime";
import { AlertEvent } from "@/schemas/overlay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const alert: AlertEvent = {
      id: `alert_${Date.now()}`,
      creatorId: body.creatorId || "demo",
      tipperName: body.tipperName || "Rohit Sharma",
      amount: Number(body.amount) || 500,
      message: body.message || "GG! Insane clutch in the last round! Keep grinding!",
      timestamp: Date.now(),
      soundEnabled: body.soundEnabled ?? true,
      ttsEnabled: body.ttsEnabled ?? true,
      gifUrl: body.gifUrl || "/images/alerts/throwing-money.gif",
    };

    realtimeHub.broadcast(alert);

    return NextResponse.json({
      success: true,
      message: "Alert dispatched successfully to active OBS Browser Sources",
      alert,
    });
  } catch (error) {
    console.error("Error triggering test alert:", error);
    return NextResponse.json(
      { success: false, error: "Failed to dispatch alert" },
      { status: 500 }
    );
  }
}
