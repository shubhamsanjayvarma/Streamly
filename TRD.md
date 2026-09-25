# TRD — Technical Requirements Document

## Technology Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| **Framework** | Next.js (App Router) | 14+ | Full-stack TypeScript, RSC, API routes, built-in optimizations |
| **Language** | TypeScript | 5.x (strict mode) | Type safety across frontend and backend |
| **Styling** | Tailwind CSS | 3.x | Utility-first, consistent with spec request |
| **UI Primitives** | shadcn/ui | Latest | Composable, accessible, not a runtime dependency — copied into project |
| **Icons** | Lucide React | Latest | Single consistent icon system, tree-shakeable |
| **Animation** | Framer Motion | Latest | Purposeful UX animations only (alerts, progress, state changes) |
| **Database** | PostgreSQL | 15+ | Relational integrity for financial data, ACID transactions |
| **ORM** | Prisma | 5.x | Type-safe queries, migration system, schema-first |
| **Cache / PubSub** | Redis (ioredis) | 7+ | Event bus, rate limiting, caching, session store |
| **Real-time** | Socket.IO | 4.x | WebSocket with automatic reconnect, room-based fanout |
| **Validation** | Zod | 3.x | Runtime validation with TypeScript type inference |
| **Auth** | iron-session | 8.x | Secure HTTP-only cookie sessions, no JWT exposed to client |
| **Password Hashing** | bcrypt | Latest | Cost factor 12 |
| **Payments** | Razorpay (behind interface) | Official SDK | India-first payment provider |
| **Linting** | ESLint | 8.x | Strict TypeScript rules |
| **Formatting** | Prettier | 3.x | Consistent code formatting |
| **Unit/Integration Testing** | Vitest | Latest | Fast, TypeScript-native |
| **E2E Testing** | Playwright | Latest | Cross-browser, visual testing |
| **Containerization** | Docker + docker-compose | Latest | Reproducible local development |

## Tools

### Development

- **Node.js** 20 LTS
- **pnpm** or **npm** — package manager (follow what `package-lock.json` or `pnpm-lock.yaml` indicates once initialized)
- **Prisma CLI** — migrations, schema push, seed, studio
- **Docker Compose** — local PostgreSQL + Redis
- **ESLint + Prettier** — enforced via pre-commit or CI

### Infrastructure (Production Targets)

| Concern | Target |
|---------|--------|
| Frontend hosting | Vercel or equivalent |
| Backend | Containerized deployment (Docker) |
| Database | Managed PostgreSQL |
| Cache | Managed Redis |
| Object Storage | S3-compatible (AWS S3, Cloudflare R2, GCS) |
| Payments | Razorpay |
| Email | Swappable provider (Resend, AWS SES, etc.) |
| AI | Swappable provider (OpenAI, Google AI, etc.) |
| Monitoring | Structured logs + error tracking + metrics |
| DNS | Production domain |

## APIs

### Internal API (Next.js API Routes)

All API routes live under `/api/*` within the Next.js App Router.

| API Group | Base Path | Purpose |
|-----------|-----------|---------|
| Health | `/api/health`, `/api/ready` | Health and readiness checks |
| Auth | `/api/auth/*` | Signup, login, logout, email verification, password reset |
| Creator | `/api/creator/*` | Profile, donations, supporters, goals, alerts, TTS, widgets, leaderboard, analytics, overlay tokens |
| Donate | `/api/donate/[slug]` | Donation initiation and verification (public) |
| Billing | `/api/billing/*` | Subscription creation, portal, invoices |
| Webhooks | `/api/webhooks/razorpay` | Payment provider webhook receiver |
| Admin | `/api/admin/*` | Admin operations |

### External APIs (Provider Abstractions)

Each external API is accessed through a provider interface so the underlying service can be replaced.

```
PaymentProvider       → Razorpay Orders API, Payments API
SubscriptionProvider  → Razorpay Subscriptions API, Plans API
WebhookVerifier       → Razorpay webhook signature verification (HMAC-SHA256)
PayoutProvider        → Future: Razorpay Route or equivalent
EmailProvider         → Resend API / AWS SES API / SMTP
StorageProvider       → S3-compatible API (PutObject, GetObject, signed URLs)
AIProvider            → OpenAI Chat Completions API / Google Gemini API
```

### Razorpay Integration Points

| Razorpay API | Purpose | Auth |
|-------------|---------|------|
| `POST /v1/orders` | Create donation payment order | Key ID + Key Secret (Basic Auth) |
| `POST /v1/subscriptions` | Create creator subscription | Key ID + Key Secret |
| `GET /v1/payments/:id` | Verify payment status | Key ID + Key Secret |
| `POST /v1/payments/:id/refund` | Process refund | Key ID + Key Secret |
| Webhook `payment.captured` | Donation payment confirmation | Webhook Secret (HMAC-SHA256) |
| Webhook `payment.failed` | Donation payment failure | Webhook Secret |
| Webhook `subscription.activated` | Creator subscription activation | Webhook Secret |
| Webhook `subscription.charged` | Subscription renewal | Webhook Secret |
| Webhook `subscription.cancelled` | Subscription cancellation | Webhook Secret |
| Webhook `refund.processed` | Refund confirmation | Webhook Secret |

> **Note:** Razorpay official documentation is the source of truth for all integration details. Do not assume API behavior — verify against current docs before implementation.

## Environment Variables

```
# Application
PUBLIC_APP_URL=
WEBHOOK_BASE_URL=
NODE_ENV=

# Database
DATABASE_URL=

# Redis
REDIS_URL=

# Auth
AUTH_SECRET=
AUTH_COOKIE_NAME=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=

# Storage
STORAGE_PROVIDER=
STORAGE_BUCKET=
STORAGE_REGION=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=
STORAGE_ENDPOINT=

# Email
EMAIL_PROVIDER=
EMAIL_FROM=
EMAIL_API_KEY=

# AI
AI_PROVIDER=
AI_API_KEY=
AI_MODEL=
```

All secrets validated at startup. None committed to source control.

## Database Requirements

- PostgreSQL 15+ with UUID generation (`uuid-ossp` or `gen_random_uuid()`)
- Prisma schema-first with migration history
- Proper indexes on high-frequency query columns (creator_id, status, created_at, slug, email, provider_payment_id, provider_event_id)
- Composite indexes for common query patterns
- Foreign key constraints for referential integrity
- Soft deletion where justified (User, CreatorProfile)
- Enum types for state machines (donation status, subscription status, roles)
- JSONB for flexible configuration (alert styles, social links, milestones, blocked words)

## Real-time Requirements

- Socket.IO server attached to the Next.js custom server or standalone
- Redis adapter for horizontal scaling
- Room-based fanout: `creator:{id}:dashboard`, `creator:{id}:overlay:{token}`
- Event ordering preserved per creator
- Duplicate event detection on client
- Auto-reconnect with exponential backoff

## Security Requirements

- See `RULES.md` for full security mandate
- All payment verification server-side only
- Webhook signature verification on every webhook
- Idempotency on all webhook processing
- Rate limiting on auth (5/15min), donation creation (configurable), API endpoints
- CSRF protection on state-changing requests
- Secure HTTP-only cookies for sessions
- CSP headers (restrictive, with overlay exceptions)
- No secrets in client bundles or logs
- Parameterized database queries (Prisma handles this)
- Creator-scoped queries at service layer for multi-tenant isolation

## Testing Requirements

| Type | Tool | Coverage Target |
|------|------|-----------------|
| Unit | Vitest | Services, validation, utilities |
| Integration | Vitest + Prisma test client | Database operations, service interactions |
| API | Vitest + supertest | Endpoint behavior, auth, authorization |
| Webhook | Vitest | Signature verification, idempotency, state transitions |
| E2E | Playwright | Critical user flows (17 flows defined in spec) |

## Build & Deploy

```bash
# Development
npm run dev          # Next.js dev server
docker-compose up    # PostgreSQL + Redis

# Type checking
npx tsc --noEmit

# Linting
npx eslint . --ext .ts,.tsx

# Testing
npx vitest run
npx playwright test

# Production build
npm run build

# Production start
npm start
```

## Code Quality Standards

- TypeScript strict mode (`strict: true` in tsconfig)
- No `any` types without explicit justification
- ESLint with `@typescript-eslint/recommended`
- Prettier with consistent formatting
- Meaningful function and variable names
- Clear module boundaries (services, providers, lib, components)
- No giant files — split by responsibility
- No duplicated business logic
- Typed API contracts via Zod schemas
- Comments only for non-obvious reasoning
