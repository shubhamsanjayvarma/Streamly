# Streamly

> **Direct Creator Tipping & Livestream Engagement Platform**
>
> 0% platform commission on creator donations. Zero payout delay. Built for high-traffic livestreams with enterprise resilience.

---

## 🏗️ Production Architecture & Tech Stack

Streamly is engineered as a **Modular Monolith with Event-Driven Workers** designed for maximum payment correctness, security, and horizontal scalability.

### Locked Tech Stack
* **Frontend**: Next.js (App Router), React, TypeScript (Strict Mode), Tailwind CSS, shadcn/ui, Radix UI
* **State & Validation**: TanStack Query (Server State), Zustand (Client State), Zod
* **Backend**: NestJS (Modular Monolith), TypeScript, REST API, Socket.IO (with Redis Adapter)
* **Authoritative Database**: Amazon Aurora PostgreSQL, Amazon RDS Proxy
* **Cache & Distributed Locks**: Amazon ElastiCache for Redis
* **Durable Queues & Event Bus**: Amazon SQS (DLQ + Retry policies), BullMQ, Amazon EventBridge
* **Storage & Edge**: Amazon S3, Cloudflare (DDoS, WAF, Bot Protection, Edge Rate Limiting)
* **Compute & Infrastructure**: AWS Application Load Balancer (ALB), AWS ECS Fargate, Docker, Amazon ECR, Terraform (IaC)
* **Security & Auth**: Streamly Auth Service (JWT + Secure Sessions), Argon2id, AWS KMS, AWS Secrets Manager
* **Observability**: Amazon CloudWatch, Sentry, OpenTelemetry, AWS GuardDuty, Security Hub, CloudTrail
* **Testing**: Vitest (Unit/Integration), Playwright (E2E), Testcontainers

---

## 🔒 Canonical Architecture Documents

Authoritative engineering directives and contracts:
- [TECHSTACK.md](Techstack%20and%20architeture/TECHSTACK.md) — Canonical technology stack rules & restrictions.
- [ARCHITECTURE.md](Techstack%20and%20architeture/ARCHITECTURE.md) — High-level system architecture, payment lifecycle, and fail-safe designs.
- [AGENTS.md](AGENTS.md) — Operational handbook, multi-agent review personas, and external engineering references.

---

## 🛡️ Core Architectural Principles

1. **Browser is NEVER Authoritative**: Client-side payment claims are completely untrusted. Only verified provider webhooks finalize payment status.
2. **Database is Sole Financial Truth**: Aurora PostgreSQL transactions hold financial state. Redis is never used as a financial ledger.
3. **Idempotency & Deduplication**: Duplicate webhooks will never trigger duplicate credits or alerts.
4. **Decoupled Realtime Delivery**: Socket.IO delivers live alerts to OBS browser widgets. If realtime drops, payments remain 100% valid.
5. **Fail-Safe Design**: Non-critical services (AI, TTS, analytics) failing will never block Tier 0 operations (payments, auth, core tipping).

---

## 📜 License
Private & Proprietary — Streamly.
