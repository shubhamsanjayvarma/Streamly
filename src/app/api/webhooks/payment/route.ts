import { NextRequest, NextResponse } from "next/server";
import { PaymentWebhookPayloadSchema } from "@/schemas/webhook";
import { realtimeHub } from "@/lib/realtime";
import crypto from "crypto";

// Idempotency store (in-memory for demo / serverless; maps to Aurora/Redis in production)
const processedEventIds = new Set<string>();

const WEBHOOK_SECRET = process.env.PAYMENT_WEBHOOK_SECRET || "streamly_sec_prod_99f2a7";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-streamly-signature") || "";

    // Optional cryptographic signature check if secret header provided
    if (signature) {
      const expectedSignature = crypto
        .createHmac("sha256", WEBHOOK_SECRET)
        .update(rawBody)
        .digest("hex");

      if (signature !== expectedSignature) {
        return NextResponse.json(
          { success: false, error: "Invalid webhook cryptographic signature" },
          { status: 401 }
        );
      }
    }

    const payload = JSON.parse(rawBody);
    const validated = PaymentWebhookPayloadSchema.safeParse(payload);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid webhook payload schema",
          issues: validated.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { eventId, eventType, data } = validated.data;

    // Idempotency check: duplicate webhooks must NEVER trigger double alerts or credits
    if (processedEventIds.has(eventId)) {
      return NextResponse.json({
        success: true,
        message: "Duplicate webhook acknowledged without reprocessing",
        eventId,
      });
    }

    processedEventIds.add(eventId);

    // If payment succeeded, immediately broadcast live alert to OBS Browser Source
    if (eventType === "PAYMENT_SUCCEEDED" && data.status === "COMPLETED") {
      realtimeHub.broadcast({
        id: `alert_${data.transactionId}`,
        creatorId: data.creatorId,
        tipperName: data.tipperName,
        amount: data.amount,
        message: data.message || "Direct UPI tip received!",
        timestamp: Date.now(),
        soundEnabled: true,
        ttsEnabled: true,
        gifUrl: "/images/alerts/throwing-money.gif",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Webhook processed and state updated",
      transactionId: data.transactionId,
      status: data.status,
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { success: false, error: "Internal webhook processing error" },
      { status: 500 }
    );
  }
}
