import { AlertEvent } from "@/schemas/overlay";

type AlertListener = (event: AlertEvent) => void;

class RealtimeEventManager {
  private static instance: RealtimeEventManager;
  private listeners: Map<string, Set<AlertListener>> = new Map();
  private recentAlerts: Map<string, AlertEvent[]> = new Map();

  private constructor() {}

  public static getInstance(): RealtimeEventManager {
    if (!RealtimeEventManager.instance) {
      RealtimeEventManager.instance = new RealtimeEventManager();
    }
    return RealtimeEventManager.instance;
  }

  public subscribe(creatorId: string, listener: AlertListener): () => void {
    if (!this.listeners.has(creatorId)) {
      this.listeners.set(creatorId, new Set());
    }
    this.listeners.get(creatorId)!.add(listener);

    return () => {
      const set = this.listeners.get(creatorId);
      if (set) {
        set.delete(listener);
        if (set.size === 0) {
          this.listeners.delete(creatorId);
        }
      }
    };
  }

  public broadcast(event: AlertEvent): void {
    const { creatorId } = event;

    // Cache recent alerts (up to 20 per creator)
    if (!this.recentAlerts.has(creatorId)) {
      this.recentAlerts.set(creatorId, []);
    }
    const alerts = this.recentAlerts.get(creatorId)!;
    alerts.unshift(event);
    if (alerts.length > 20) {
      alerts.pop();
    }

    // Notify active listeners (OBS Browser Sources)
    const set = this.listeners.get(creatorId);
    if (set) {
      set.forEach((listener) => {
        try {
          listener(event);
        } catch (err) {
          console.error("Error executing alert listener:", err);
        }
      });
    }

    // Also broadcast to 'all' or demo listeners if relevant
    const demoSet = this.listeners.get("demo");
    if (demoSet && creatorId !== "demo") {
      demoSet.forEach((listener) => {
        try {
          listener(event);
        } catch (err) {
          console.error("Error executing demo listener:", err);
        }
      });
    }
  }

  public getRecent(creatorId: string): AlertEvent[] {
    return this.recentAlerts.get(creatorId) || [];
  }
}

export const realtimeHub = RealtimeEventManager.getInstance();
