import { NextRequest } from "next/server";
import { realtimeHub } from "@/lib/realtime";
import { AlertEvent } from "@/schemas/overlay";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const creatorId = searchParams.get("creatorId") || "demo";

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection event
      controller.enqueue(
        encoder.encode(`event: connected\ndata: ${JSON.stringify({ status: "connected", creatorId })}\n\n`)
      );

      // Subscribe to realtime alerts for this creator
      const unsubscribe = realtimeHub.subscribe(creatorId, (alert: AlertEvent) => {
        try {
          const payload = `event: alert\ndata: ${JSON.stringify(alert)}\n\n`;
          controller.enqueue(encoder.encode(payload));
        } catch (err) {
          console.error("Failed to enqueue alert to SSE stream:", err);
        }
      });

      // Send periodic keep-alive ping every 15s to keep OBS browser source alive
      const pingInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": ping\n\n"));
        } catch {
          clearInterval(pingInterval);
        }
      }, 15000);

      req.signal.addEventListener("abort", () => {
        unsubscribe();
        clearInterval(pingInterval);
        try {
          controller.close();
        } catch {}
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
