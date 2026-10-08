export type SubscriptionPlanId = "free" | "pro" | "plus";

export interface SubscriptionPlan {
  id: SubscriptionPlanId;
  name: string;
  priceINR: number;
  badge?: string;
  features: string[];
  brandingRemoval: boolean;
  aiAnalytics: boolean;
  customOverlays: boolean;
}

export type DonationStatus =
  | "CREATED"
  | "PENDING"
  | "CONFIRMED"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

export interface Donation {
  id: string;
  creatorId: string;
  creatorSlug: string;
  creatorName: string;
  donorName: string;
  isAnonymous: boolean;
  amountINR: number;
  message?: string;
  status: DonationStatus;
  paymentRoute: "UPI_INTENT" | "GPAY" | "PHONEPE" | "PAYTM" | "AMAZON_PAY";
  createdAt: string;
}

export interface CreatorProfile {
  id: string;
  slug: string;
  displayName: string;
  avatarUrl: string;
  bannerUrl?: string;
  bio: string;
  platform: "YOUTUBE" | "TWITCH" | "KICK";
  upiId: string;
  plan: SubscriptionPlanId;
  verified: boolean;
  goal?: DonationGoal;
  overlayToken: string;
}

export interface DonationGoal {
  title: string;
  currentINR: number;
  targetINR: number;
  active: boolean;
}

export interface AlertNotification {
  id: string;
  tipperName: string;
  amount: number;
  message: string;
  timestamp: string;
  audioVoice?: string;
  gifUrl: string;
}
