# Streamly — TECHSTACK.md

> **AUTHORITATIVE / LOCKED**
>
> This is the canonical production technology-stack contract for Streamly.
> AI agents and developers MUST follow it. No technology may be replaced, removed,
> or added to the core stack without explicit human approval.

## 1. Product Standard

Streamly is a real production startup platform, not a demo. The architecture must tolerate:
- sudden viral traffic and traffic spikes
- DDoS, bots, scraping and malicious requests
- brute-force and account-takeover attempts
- payment failures, duplicate webhooks and provider outages
- backend, worker, Redis and database failures
- deployment failures
- Availability Zone failures
- abusive users, spam and TTS abuse
- high realtime WebSocket fan-out

Payment correctness and data integrity always have priority over non-critical features.

## 2. LOCKED TECHNOLOGY STACK

| Layer | Locked technology |
|---|---|
| Core language | TypeScript |
| Frontend | Next.js + React |
| Styling | Tailwind CSS |
| UI components | shadcn/ui + Radix UI |
| Server state | TanStack Query |
| Client state | Zustand |
| Validation | Zod |
| Backend | NestJS + TypeScript |
| API | REST |
| Realtime | Socket.IO / WebSocket |
| Primary DB | PostgreSQL |
| Production DB | Amazon Aurora PostgreSQL |
| DB connection management | Amazon RDS Proxy |
| Cache | Redis |
| Production Redis | Amazon ElastiCache for Redis |
| Durable queue | Amazon SQS |
| Redis-backed jobs | BullMQ where appropriate |
| Event bus | Amazon EventBridge |
| Object storage | Amazon S3 |
| Edge/CDN/security | Cloudflare |
| Load balancer | AWS Application Load Balancer |
| Compute | AWS ECS Fargate |
| Containers | Docker |
| Container registry | Amazon ECR |
| Authentication | Streamly Auth Service using secure sessions/JWT architecture |
| Password hashing | Argon2id |
| Secrets | AWS Secrets Manager |
| Key management | AWS KMS |
| Infrastructure as Code | Terraform |
| CI/CD | GitHub Actions |
| Monitoring | Amazon CloudWatch |
| Error tracking | Sentry |
| Tracing/telemetry | OpenTelemetry |
| Threat detection | AWS GuardDuty |
| Security posture | AWS Security Hub |
| Audit | AWS CloudTrail + application AuditLog |
| Unit/integration testing | Vitest |
| E2E testing | Playwright |
| Integration environment | Testcontainers |
| AI | Separate AI service/provider abstraction |

## 3. Architecture Rule

Use **Modular Monolith + Event-Driven Workers + Selective Service Extraction**.

Do NOT start with unnecessary microservices.

The NestJS backend is a modular monolith. Background work is handled by workers.
A domain becomes a separate service only after a human-approved decision based on real
scaling, security, deployment, or ownership requirements.

## 4. Forbidden Silent Substitutions

Agents MUST NOT silently replace the locked stack with:
- MongoDB/Firestore as the primary database
- Firebase as the core backend
- Supabase as the core production architecture
- Express/Django/FastAPI/Laravel as a NestJS replacement
- RabbitMQ/Kafka as an automatic SQS replacement
- Kubernetes as an automatic ECS replacement
- Vercel as an automatic AWS production-backend replacement
- another frontend framework
- another programming language for the core application
- another cache/realtime technology merely from preference

Researching alternatives does not authorize implementation.

## 5. Frontend Rules

Required: Next.js, React, TypeScript, Tailwind, shadcn/ui, Radix UI,
TanStack Query, Zustand and Zod.

Rules:
- TypeScript strict mode.
- Avoid `any`; justify unavoidable uses.
- TanStack Query owns server state.
- Zustand is for appropriate local/client state.
- Validate untrusted input at boundaries.
- Never trust frontend payment status.
- Never expose secrets in frontend bundles.
- Do not store sensitive credentials in localStorage.

## 6. Backend Domains

Use explicit NestJS modules for:
- auth
- users
- creators
- creator-profiles
- tipping
- payments
- payment-webhooks
- subscriptions
- alerts
- widgets
- integrations
- analytics
- supporters
- leaderboards
- donation-goals
- notifications
- moderation
- AI
- admin
- audit

Avoid uncontrolled cross-module database access.

## 7. Database Rules

Aurora PostgreSQL is the authoritative source of truth.

It stores users, creators, payments, payment attempts, subscriptions, refunds,
alerts, integrations, supporters, moderation records and audit data.

Required:
- migrations
- transactions for atomic financial operations
- foreign keys
- unique constraints
- appropriate indexes
- auditability
- connection pooling/RDS Proxy

Redis is NEVER the authoritative financial ledger.

## 8. Redis Rules

Use Redis for:
- caching
- rate limiting
- distributed locks
- realtime coordination
- Socket.IO adapter
- temporary state
- idempotency support where appropriate
- leaderboard acceleration

Do not store critical financial truth only in Redis.

## 9. Queue Rules

SQS is the durable queue backbone.

Use asynchronous processing for:
- alerts
- email
- notifications
- analytics
- AI jobs
- moderation
- webhook processing where appropriate
- media processing

Workers must be idempotent, retry-safe, observable and horizontally scalable.
Important queues require retry policies and dead-letter queues.

## 10. Payment Rules

The browser is NEVER the source of truth for payment success.

Required flow:

Creator/Viewer
→ Streamly payment page
→ authorised payment provider
→ provider webhook
→ authenticity/signature verification
→ idempotency check
→ payment service
→ PostgreSQL transaction
→ event/queue
→ alert/notification processing

Required:
- webhook verification
- idempotency
- duplicate-event protection
- server-side amount validation
- explicit payment state machine
- reconciliation
- audit logs
- refund handling
- timeout/provider-failure handling

Never collect UPI PIN, bank passwords, OTP, CVV or provider credentials.

Streamly platform commission is **0%** on creator donations according to the product model.
Do NOT describe this as "0% payment fees"; provider processing charges may still apply.

## 11. Realtime Rules

Production topology:

Cloudflare → ALB → multiple ECS instances → Socket.IO → Redis Adapter.

Realtime may handle:
- donation alerts
- subscription alerts
- supported follower events
- donation goals
- leaderboards
- supporter events
- creator live dashboard updates

Realtime is a delivery mechanism, not the financial source of truth.

## 12. Security Stack

Edge:
- Cloudflare
- DDoS protection
- WAF
- bot protection
- rate limiting

Application:
- Zod validation
- authentication
- authorization/RBAC
- Argon2id
- secure session handling
- CSRF protection where applicable
- CSP/security headers
- sanitization
- request-size limits
- rate limits

Infrastructure:
- IAM
- private subnets for internal resources
- security groups
- Secrets Manager
- KMS
- GuardDuty
- Security Hub
- CloudTrail

Aurora and Redis must never be directly public.

## 13. Traffic Control

Use multiple layers:

1. Cloudflare: DDoS, WAF, bots, edge rate limiting, caching.
2. ALB: health checks and target distribution.
3. Application: Redis-backed limits by IP, user, creator, endpoint and session.
4. Queue: expensive work goes asynchronous.

No user may consume unlimited CPU, memory, DB connections, TTS, AI or realtime resources.

## 14. Failure Rules

The system must fail safely:
- alert service down → payment remains recorded
- AI down → core platform continues
- TTS down → donation still succeeds
- email down → retry asynchronously
- worker crash → queue retry
- ECS task crash → replacement
- Redis failure → critical truth remains PostgreSQL
- duplicate webhook → idempotency prevents double processing
- AZ failure → services continue in another AZ
- bad deployment → rollback

Never let a non-critical feature corrupt financial state.

## 15. Observability

Use CloudWatch + Sentry + OpenTelemetry.

Track:
- API latency and errors
- 5xx rate
- payment failures
- webhook failures/duplicates
- queue depth
- worker failures
- DB CPU/connections
- Redis health
- ECS CPU/memory
- WebSocket connections
- alert latency
- suspicious traffic

Never log passwords, secrets, tokens or payment credentials.

## 16. Testing

Required:
- Vitest for unit/integration testing
- Testcontainers for realistic integration dependencies
- Playwright for E2E

Critical flows must be tested:
signup/login, creator onboarding, tipping, payment confirmation,
webhooks, duplicate webhooks, refunds, subscriptions, alerts,
authorization and sensitive admin actions.

## 17. CI/CD

GitHub Actions must run:
1. install
2. lint
3. typecheck
4. tests
5. build
6. security checks
7. Docker build
8. push to ECR
9. deployment
10. health verification

Critical failures block production deployment.

## 18. Infrastructure

Terraform is the source of truth for AWS infrastructure.

Production infrastructure includes:
- VPC
- public/private subnets
- ALB
- ECS
- Aurora
- RDS Proxy
- ElastiCache
- SQS
- EventBridge
- S3
- ECR
- IAM
- KMS
- Secrets Manager
- CloudWatch
- security controls

Do not manually create production resources and leave Terraform unaware.

## 19. IMMUTABILITY / CHANGE CONTROL

### NEVER CHANGE THE STACK ON YOUR OWN.

If an agent believes a technology should change:
1. Stop the proposed change.
2. Do not install a replacement.
3. Do not modify this file to justify it.
4. Prepare a proposal containing current technology, proposed technology,
   reason, tradeoffs, security impact, cost, migration and rollback plan.
5. Ask the human for explicit approval.
6. Implement only after approval.
7. Update this file only after approval.

A test failure, easier implementation, personal preference, popularity or AI recommendation
is NOT permission to change the stack.

Security/maintenance dependency updates are allowed within the same technology ecosystem,
subject to normal project policy. Major ecosystem changes require human approval.

## 20. SOURCE OF TRUTH

When instructions conflict:
1. explicit human instruction in the current task
2. approved ADR
3. TECHSTACK.md
4. ARCHITECTURE.md
5. other project documentation
6. AI assumptions

If unresolved: STOP AND ASK.

## 21. ANTI-HALLUCINATION RULE

If information is missing:
- inspect the repository
- inspect existing code/config
- inspect official provider documentation where appropriate
- ask the human
- make a clearly marked proposal

NEVER invent:
- credentials
- API endpoints
- provider behavior
- production URLs
- cloud resources
- database schema requirements
- integration capabilities
- security guarantees
- legal/compliance approval
- test results

## 22. Definition of Done

A feature is not complete just because its UI renders.

Completion requires, as applicable:
frontend + backend + validation + authorization + persistence + error handling +
logging + monitoring + tests + security + failure handling + migrations + documentation +
deployment readiness.

## 23. FINAL LOCK

This is the canonical Streamly production stack.

**DO NOT OPTIMIZE THE STACK.**
**DO NOT MODERNIZE THE STACK.**
**DO NOT SUBSTITUTE THE STACK.**
**DO NOT INVENT MISSING TECHNOLOGIES.**

When uncertain, STOP and ask the human.
