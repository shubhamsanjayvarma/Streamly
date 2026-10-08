import { z } from "zod";

export const PaymentWebhookPayloadSchema = z.object({
  eventId: z.string().min(1, "Event ID required for idempotency check"),
  eventType: z.enum([
    "PAYMENT_SUCCEEDED",
    "PAYMENT_FAILED",
    "REFUND_PROCESSED",
    "DISPUTE_OPENED",
  ]),
  timestamp: z.number(),
  data: z.object({
    transactionId: z.string(),
    creatorId: z.string(),
    tipperName: z.string(),
    amount: z.number().min(1),
    currency: z.literal("INR"),
    bankRefNo: z.string().optional(),
    upiId: z.string().optional(),
    message: z.string().optional(),
    status: z.enum(["COMPLETED", "FAILED", "PENDING"]),
  }),
});

export type PaymentWebhookPayload = z.infer<typeof PaymentWebhookPayloadSchema>;
