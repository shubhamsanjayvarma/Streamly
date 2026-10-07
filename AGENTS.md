# STREAMLY — CANONICAL ENGINEERING DIRECTIVE & OPERATIONAL HANDBOOK

> **STATUS: AUTHORITATIVE & LOCKED**
>
> Streamly is a **production startup platform**, NOT a demo or prototype.
> Every agent, developer, and automated pipeline MUST strictly follow this directive.

---

## 1. HIERARCHY OF TRUTH
When making technical decisions or resolving conflicts:
1. **Explicit Human Instruction**
2. **Approved Streamly ADRs**
3. **[TECHSTACK.md](file:///c:/Users/sv369/OneDrive/Desktop/Streamly/Techstack%20and%20architeture/TECHSTACK.md)**
4. **[ARCHITECTURE.md](file:///c:/Users/sv369/OneDrive/Desktop/Streamly/Techstack%20and%20architeture/ARCHITECTURE.md)**
5. **AGENTS.md / Project Rules**
6. **Existing Streamly Implementation**
7. **Official Technology / Provider Documentation**
8. **Approved External Engineering References** (methodology only; cannot override stack)
9. **AI Reasoning / Assumptions**

---

## 2. LOCKED PRODUCTION STACK

| Layer | Locked Technology |
|---|---|
| **Core Language** | TypeScript (Strict Mode) |
| **Frontend** | Next.js (App Router), React |
| **Styling & UI** | Tailwind CSS, shadcn/ui, Radix UI |
| **State & Validation**| TanStack Query (Server State), Zustand (Client State), Zod |
| **Backend** | NestJS (Modular Monolith), TypeScript, REST API |
| **Realtime** | Socket.IO / WebSocket (with Redis Adapter for clustering) |
| **Primary Database** | Amazon Aurora PostgreSQL (Authoritative DB, RDS Proxy) |
| **Cache & Locks** | Amazon ElastiCache for Redis |
| **Durable Queues** | Amazon SQS (Dead-Letter Queues + Retry Policies), BullMQ |
| **Event Bus & Storage**| Amazon EventBridge, Amazon S3 |
| **Edge & Security** | Cloudflare (DDoS, WAF, Bots, Edge Rate Limiting) |
| **Compute & Cloud** | AWS ALB + AWS ECS Fargate + Docker + Amazon ECR |
| **Infrastructure** | Terraform (IaC), GitHub Actions (CI/CD) |
| **Auth & Crypto** | Streamly Auth Service (JWT + Secure Sessions), Argon2id, AWS KMS, AWS Secrets Manager |
| **Observability** | CloudWatch, Sentry, OpenTelemetry, AWS GuardDuty, Security Hub, CloudTrail |
| **Testing** | Vitest (Unit/Integration), Playwright (E2E), Testcontainers |

### Forbidden Substitutions
NO MongoDB/Firestore, NO Supabase/Firebase, NO Express/FastAPI/Django/Laravel, NO RabbitMQ/Kafka, NO Kubernetes, NO Vercel for backend, NO unapproved ORM or realtime frameworks.

---

## 3. EXTERNAL ENGINEERING REFERENCES (ADOPT METHODOLOGY, NOT STACK)

### 1. Anthropic Cybersecurity Skills (`mukul975/Anthropic-Cybersecurity-Skills`)
*Use for Defensive Security Engineering:*
- **Threat Modeling & OWASP Top 10**: Prevent SQLi, XSS, SSRF, BOLA/IDOR, BFLA, and broken auth.
- **MITRE F3 (Fight Fraud Framework v1.1)**: Defend against **Positioning** (synthetic identity, account warming, beneficiary manipulation) and **Monetization** (refund/chargeback fraud, mule layering, payout tampering).
- **Payment & Webhook Hardening**: Webhook cryptographic signature verification, replay attack prevention, idempotency records.
- **Infrastructure Security**: AWS IAM least privilege, private subnets for Aurora/Redis, KMS encryption, Secrets Manager, CloudWatch/CloudTrail auditing.
- **Input Moderation**: Sanitize public tipping messages, protect OBS browser widgets, rate-limit and filter TTS.

### 2. Addy Osmani Agent Skills (`addyosmani/agent-skills`)
*Use for Engineering Workflow & Quality Gates:*
- **Lifecycle**: `DEFINE (/spec)` ➔ `PLAN (/plan)` ➔ `BUILD (/build)` ➔ `VERIFY (/test)` ➔ `REVIEW (/review)` ➔ `SHIP (/ship)`.
- **Spec-Driven**: Spec before code. Clear interfaces, inputs, and outputs.
- **Incremental & TDD**: Small atomic slices, Red-Green-Refactor. Tests are proof.
- **Doubt-Driven**: "What happens when Redis goes down? When webhooks duplicate? Under 100x traffic?"
- **Measure Before Optimize**: Profile Core Web Vitals, API p95/p99 latency, queue lag before tuning.

### 3. Graphify (`Graphify-Labs/graphify`)
*Use for Dev-Time Codebase Intelligence:*
- Knowledge graph and call-flow analysis during development.
- Blast-radius mapping: Trace incoming/outgoing dependencies before touching shared APIs, schemas, or auth.
- **Strict Rule**: Dev-time tool only. NEVER bundle or deploy Graphify in production runtime.

### 4. Agency Agents (`msitarzewski/agency-agents`)
*Multi-Agent Specialist Reviewers & Thinking Perspectives:*
- **Software Architect & Backend Architect**: Clean NestJS modular boundaries, DTOs, domain service contracts.
- **Security Architect & AppSec Engineer**: Threat modeling, STRIDE analysis, webhook signatures, session security.
- **Database Optimizer & DBRE**: Aurora PostgreSQL indexing, transaction isolation, connection pooling, non-blocking migrations.
- **SRE & DevOps Automator**: Multi-AZ resilience, ECS health checks, SQS DLQs, autoscaling, CloudWatch alarms.
- **Realtime Collaboration Engineer**: Socket.IO room isolation, Redis adapter horizontal scale, reconnect backoff.
- **Payments & Billing Engineer**: Zero-delay tipping, idempotent webhooks, ledger consistency, zero platform fee logic.
- **Reality Checker & Evidence Collector**: Anti-hallucination verification, validating tests before declaring completion.
- *Strict Rule*: Specialist personas review and critique; they cannot change the locked stack.

### 5. Awesome LLM Apps (`Shubhamsaboo/awesome-llm-apps`)
*Use for Streamly AI Subsystem Only:*
- Typed, validated outputs (Zod schemas).
- Citation-grounded retrieval and evaluation gates.
- **Failure Isolation**: Non-critical AI failures must NEVER block Tier 0 operations (Payments, Auth, Tipping).

---

## 4. FINANCIAL & REALTIME INTEGRITY RULES
- **Browser/Client is NEVER Authoritative**: Payment success claims from the client are completely untrusted. Only verified provider webhooks finalize payment status.
- **Database is Sole Financial Truth**: Aurora PostgreSQL transactions hold financial state. Redis is NEVER a financial ledger.
- **Idempotency & Deduplication**: Duplicate webhooks MUST NOT trigger duplicate credits or alerts.
- **Realtime Delivery Decoupled**: Socket.IO delivers live alerts to OBS. If realtime drops, payments remain 100% valid.

---

## 5. ANTI-HALLUCINATION & VERIFICATION PROTOCOL
Never guess or invent API contracts, credentials, provider behavior, or environment variables.
Use confidence labels where needed: `[VERIFIED]`, `[INFERRED]`, `[ASSUMPTION]`, `[UNVERIFIED]`, `[BLOCKED]`.
Always verify against authoritative documentation and runnable code.
