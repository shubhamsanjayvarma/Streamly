import { create } from "zustand";
import { AlertNotification, CreatorProfile } from "@/types";

interface StreamlyState {
  // Demo Alert Simulation State
  currentAlert: AlertNotification | null;
  isSimulating: boolean;
  triggerDemoAlert: (alert?: Partial<AlertNotification>) => void;
  clearAlert: () => void;

  // Active Creator Session (Mockable for live demo)
  currentCreator: CreatorProfile | null;
  setCurrentCreator: (creator: CreatorProfile | null) => void;

  // Savings Calculator State
  monthlyDonationVolume: number;
  setMonthlyDonationVolume: (val: number) => void;
}

export const useStreamlyStore = create<StreamlyState>((set) => ({
  currentAlert: {
    id: "demo-1",
    tipperName: "Aarav Sharma",
    amount: 500,
    message: "GG! You played insanely well in the last clutch! Keep grinding bro ❤️",
    timestamp: "Just now",
    gifUrl: "/images/alerts/throwing-money.gif",
    audioVoice: "Hinglish / Indian Regional Voice",
  },
  isSimulating: false,
  triggerDemoAlert: (customAlert) => {
    const alertsPool = [
      {
        tipperName: "Kunal Gaming",
        amount: 1000,
        message: "Take my money! Insane headshot on Erangel! 🔥",
      },
      {
        tipperName: "Priya V.",
        amount: 250,
        message: "Big fan! Next match duo with subs please? 🙏",
      },
      {
        tipperName: "Vikram R.",
        amount: 2000,
        message: "Congratulations on 500k subscribers! Treat the squad tonight! 🍕",
      },
      {
        tipperName: "Rohan_99",
        amount: 150,
        message: "Op gameplay bhai, full support always! 🚀",
      },
    ];
    const randomPick = alertsPool[Math.floor(Math.random() * alertsPool.length)];

    set({
      isSimulating: true,
      currentAlert: {
        id: "alert-" + Date.now(),
        tipperName: customAlert?.tipperName || randomPick.tipperName,
        amount: customAlert?.amount || randomPick.amount,
        message: customAlert?.message || randomPick.message,
        timestamp: "Just now",
        gifUrl: "/images/alerts/throwing-money.gif",
        audioVoice: "Hinglish Pro TTS Active",
      },
    });

    setTimeout(() => {
      set({ isSimulating: false });
    }, 4500);
  },
  clearAlert: () => set({ currentAlert: null }),

  currentCreator: {
    id: "creator-casetoo",
    slug: "casetoo",
    displayName: "Casetoo Gaming",
    avatarUrl: "/images/creators/casetoo.jpg",
    bio: "Full time BGMI & GTA V Streamer. India's loudest clutch master! Live everyday 8 PM.",
    platform: "YOUTUBE",
    upiId: "casetoo@upi",
    plan: "pro",
    verified: true,
    overlayToken: "strm_live_9a8f27e10b",
    goal: {
      title: "New 4K Dual PC Streaming Rig",
      currentINR: 84500,
      targetINR: 150000,
      active: true,
    },
  },
  setCurrentCreator: (creator) => set({ currentCreator: creator }),

  monthlyDonationVolume: 50000,
  setMonthlyDonationVolume: (val) => set({ monthlyDonationVolume: val }),
}));
