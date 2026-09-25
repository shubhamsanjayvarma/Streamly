# BRAIN.md — Project Context for AI

> This file provides the AI with complete context about the Streamly project.
> Read this file instead of scanning the entire codebase repeatedly.
> Update this file whenever the project structure, architecture, or key decisions change.

---

## What Is Streamly?

Streamly is a **subscription-based SaaS platform for gaming livestream creators**. Creators use it to receive viewer donations, display real-time OBS alerts, run TTS, create donation goals, build supporter leaderboards, and analyze engagement. Streamly monetizes through creator subscriptions — **₹0 platform commission on creator donations**.

## Repository Structure

```
streamly/
├── RULES.md                    # Authoritative engineering rules — READ FIRST
├── PRD.md                      # Product Requirements Document
├── TRD.md                      # Technical Requirements Document
├── UI_UX_DESIGN_BRIEF.md       # Visual design system
├── APP_FLOW.md                 # Navigation and interaction flows
├── BRAIN.md                    # This file — AI project context
├── README.md                   # Project readme
├── assets/                     # Media assets & reference code
│   ├── images/                 # Categorized providers, alerts, creators media
│   ├── code/                   # Refactored clean reference landing page (HTML/CSS/JS)
│   ├── manifest.json           # Asset catalog with checksums, dimensions, metadata
│   ├── index.ts / index.js     # TypeScript/JavaScript programmatic asset exports
│   ├── README.md               # Asset folder documentation & usage guide
│   └── archives/               # Original source Woblo archives
├── .env.example                # Environment variable template
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration (strict mode)
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── .eslintrc.json              # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── docker-compose.yml          # Local PostgreSQL + Redis
├── Dockerfile                  # Production container
├── prisma/
│   ├── schema.prisma           # Database schema (source of truth for data model)
│   ├── migrations/             # Migration history
│   └── seed.ts                 # Development seed data
├── src/
│   ├── app/                    # Next.js App Router (pages and API routes)
│   │   ├── (marketing)/        # Public pages: /, /features, /pricing, etc.
│   │   ├── (auth)/             # Auth pages: /login, /signup, etc.
│   │   ├── dashboard/          # Creator dashboard (protected)
│   │   ├── creator/[slug]/     # Public creator profile
│   │   ├── donate/[slug]/      # Public donation page
│   │   ├── overlay/            # OBS overlay pages (token-authenticated)
│   │   ├── checkout/           # Billing checkout
│   │   ├── payment/            # Payment success/failure
│   │   ├── admin/              # Admin panel (protected)
│   │   ├── api/                # API routes
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles + design tokens
│   ├── components/
│   │   ├── ui/                 # shadcn/ui primitives (Button, Card, Input, etc.)
│   │   ├── marketing/          # Marketing page components
│   │   ├── dashboard/          # Dashboard components
│   │   ├── donation/           # Donation flow components
│   │   └── overlay/            # OBS overlay components
│   ├── lib/
│   │   ├── db.ts               # Prisma client singleton
│   │   ├── redis.ts            # Redis client singleton
│   │   ├── auth/               # Session management, middleware, guards
│   │   ├── validation/         # Zod schemas for API validation
│   │   ├── errors.ts           # Application error classes
│   │   └── config.ts           # Environment variable validation (Zod)
│   ├── services/               # Business logic layer
│   │   ├── auth.service.ts
│   │   ├── creator.service.ts
│   │   ├── donation.service.ts
│   │   ├── payment.service.ts
│   │   ├── subscription.service.ts
│   │   ├── alert.service.ts
│   │   ├── gamification.service.ts
│   │   ├── analytics.service.ts
│   │   ├── notification.service.ts
│   │   ├── admin.service.ts
│   │   └── audit.service.ts
│   ├── providers/              # External service abstractions (swappable)
│   │   ├── payment/
│   │   │   ├── payment.provider.ts      # Interface
│   │   │   ├── razorpay.provider.ts     # Razorpay implementation
│   │   │   └── test-payment.provider.ts # Test/mock mode
│   │   ├── email/
│   │   │   ├── email.provider.ts        # Interface
│   │   │   └── console.provider.ts      # Development logger
│   │   ├── storage/
│   │   │   ├── storage.provider.ts      # Interface
│   │   │   └── local.provider.ts        # Local filesystem (dev)
│   │   └── ai/
│   │       └── ai.provider.ts           # Interface
│   ├── events/
│   │   ├── event-bus.ts                 # Redis Pub/Sub event bus
│   │   ├── event-types.ts              # Event type definitions
│   │   └── handlers/                    # Event handler functions
│   └── types/
│       └── index.ts                     # Shared TypeScript types
├── tests/
│   ├── unit/                   # Service and utility tests
│   ├── integration/            # Database and API tests
│   └── e2e/                    # Playwright browser tests
└── public/
    └── logo.svg                # Streamly logo asset
```

## Tech Stack

| Concern | Technology |
|---------|-----------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| UI | shadcn/ui primitives |
| Icons | Lucide React |
| Animation | Framer Motion |
| Database | PostgreSQL via Prisma |
| Cache/PubSub | Redis via ioredis |
| Real-time | Socket.IO |
| Validation | Zod |
| Auth | iron-session (HTTP-only cookies) |
| Passwords | bcrypt (cost 12) |
| Payments | Razorpay (behind PaymentProvider interface) |
| Testing | Vitest + Playwright |

## Key Architectural Rules

1. **Two separate payment flows** — creator subscription (Flow A) and viewer donation (Flow B) must never share entities, APIs, or webhook handlers.

2. **Webhook-authoritative** — donation effects (alerts, XP, goals) only trigger on server-side webhook confirmation (CONFIRMED status). Never trust client-side payment callbacks.

3. **Data-driven entitlements** — plan feature access is controlled via `SubscriptionPlan → PlanFeature → Feature` join table. No hardcoded plan checks in application code.

4. **Multi-tenant isolation** — every creator-scoped database query includes `WHERE creator_id = ?`. No cross-tenant data leakage.

5. **Provider abstractions** — PaymentProvider, EmailProvider, StorageProvider, AIProvider are interfaces. Implementations are swappable without changing business logic.

6. **Event-driven alerts** — `Payment webhook → PaymentService → donation.confirmed event → Redis Pub/Sub → AlertService → WebSocket → OBS`. The alert layer never depends directly on the payment provider.

## User Roles

| Role | Access |
|------|--------|
| `USER` | Basic account, can become CREATOR |
| `CREATOR` | Dashboard, profile, donations, alerts, billing |
| `ADMIN` | Admin panel, user/creator management, audit viewing |
| `SUPER_ADMIN` | Full admin + platform settings, plan management |

## Subscription Plans

| Plan | Key | Price | Features |
|------|-----|-------|----------|
| Free | `free` | ₹0/month | Basic everything, mandatory Streamly branding |
| Creator Pro | `pro` | ₹499/month | Advanced features, remove branding |
| Creator Plus | `plus` | ₹999/month | AI analytics, combos, challenges, store, premium |

## Donation State Machine

```
CREATED → PENDING → AUTHORIZED → CAPTURED → CONFIRMED
                                           → FAILED
                                           → CANCELLED
CONFIRMED → REFUNDED / PARTIALLY_REFUNDED / DISPUTED
```

## Important Domain Events

| Event | Trigger | Effect |
|-------|---------|--------|
| `donation.confirmed` | Webhook verification | Alert, XP, goal update, leaderboard |
| `subscription.activated` | Webhook verification | Enable plan features |
| `subscription.cancelled` | Webhook | Downgrade to free |
| `supporter.xp_awarded` | Donation confirmed | Level/badge check |
| `leaderboard.updated` | Donation confirmed | OBS widget update |

## Design System Summary

- **Fonts:** Plus Jakarta Sans (display), Inter (body)
- **Brand Palette:** Primary Purple (`#6D3DF5`), Deep Purple (`#4B24B8`), Lavender (`#A78BFA`), Soft Lavender (`#F3F0FF`)
- **Surfaces & Text:** Primary Text (`#17151D`), Secondary Text (`#6B6875`), Border (`#E8E4F0`), Surface (`#FFFFFF`), Soft Background (`#F8F7FC`)
- **Feedback:** Success (`#16A34A`), Warning (`#D97706`), Error (`#DC2626`)
- **Marketing:** clean light backgrounds with deep purple accents
- **Dashboard & OBS:** dark gaming surfaces with electric purple glowing accents
- **Donation page:** mobile-first
- **Icons:** Lucide React only

## Environment Variables

All defined in `.env.example`. Validated at startup via Zod. Never committed to source control.

Key groups: `DATABASE_URL`, `REDIS_URL`, `AUTH_SECRET`, `RAZORPAY_KEY_ID/SECRET/WEBHOOK_SECRET`, `STORAGE_*`, `EMAIL_*`, `AI_*`, `PUBLIC_APP_URL`.

## What NOT to Do

- Don't confuse subscription billing with viewer donations
- Don't trigger alerts from client-side payment callbacks
- Don't hardcode plan checks — use entitlement system
- Don't expose secrets to frontend
- Don't query across creator boundaries without admin role
- Don't invent API responses, endpoints, or credentials
- Don't create placeholder buttons that do nothing
- Don't add unnecessary dependencies or abstractions
- Don't rewrite working code for style preference
- Don't claim features are production-ready without testing

## How to Update This File

When making significant changes to the project, update the relevant section of this file:

- New service or provider → update Repository Structure and Tech Stack
- New entity → update the domain model section or reference `prisma/schema.prisma`
- New route → update APP_FLOW.md and ensure it's reflected here
- New environment variable → update `.env.example` and the Environment Variables section
- Architecture decision → document in Key Architectural Rules
