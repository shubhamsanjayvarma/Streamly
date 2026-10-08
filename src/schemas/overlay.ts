import { z } from "zod";

export const AlertEventSchema = z.object({
  id: z.string(),
  creatorId: z.string(),
  tipperName: z.string(),
  amount: z.number().min(1),
  message: z.string().optional(),
  timestamp: z.number(),
  soundEnabled: z.boolean().default(true),
  ttsEnabled: z.boolean().default(true),
  gifUrl: z.string().default("/images/alerts/throwing-money.gif"),
});

export type AlertEvent = z.infer<typeof AlertEventSchema>;

export const AlertSettingsSchema = z.object({
  creatorId: z.string(),
  minAmountForAlert: z.number().min(1).default(10),
  soundVolume: z.number().min(0).max(100).default(80),
  ttsEnabled: z.boolean().default(true),
  ttsMinAmount: z.number().min(1).default(50),
  ttsSpeed: z.number().min(0.5).max(1.5).default(1.0),
  alertDurationSeconds: z.number().min(2).max(15).default(5),
  customGifUrl: z.string().default("/images/alerts/throwing-money.gif"),
  themeColor: z.string().default("#6D3DF5"),
});

export type AlertSettings = z.infer<typeof AlertSettingsSchema>;
