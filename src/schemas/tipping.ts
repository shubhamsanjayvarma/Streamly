import { z } from "zod";

export const DonationInputSchema = z.object({
  creatorSlug: z.string().min(1, "Creator slug is required"),
  amount: z
    .number()
    .min(10, "Minimum tip is ₹10")
    .max(100000, "Maximum single transaction limit is ₹1,00,000"),
  donorName: z
    .string()
    .max(50, "Name must be under 50 characters")
    .default("Anonymous Fan"),
  isAnonymous: z.boolean().default(false),
  message: z
    .string()
    .max(250, "Message must be under 250 characters")
    .optional(),
  paymentRoute: z.enum([
    "UPI_INTENT",
    "GPAY",
    "PHONEPE",
    "PAYTM",
    "AMAZON_PAY",
  ]),
});

export type DonationInput = z.infer<typeof DonationInputSchema>;

export const CreatorLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  platform: z.enum(["YOUTUBE", "TWITCH", "KICK"]).default("YOUTUBE"),
});

export type CreatorLoginInput = z.infer<typeof CreatorLoginSchema>;
