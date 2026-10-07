# Streamly — ARCHITECTURE.md

> **AUTHORITATIVE / LOCKED**
>
> This document defines the production architecture and engineering boundaries of Streamly.
> Read `TECHSTACK.md` before implementation. AI agents MUST NOT change architectural
> principles or introduce infrastructure without explicit human approval.

## 1. System Objective

Streamly is a production creator monetization and livestream engagement platform.

Core capabilities:
- creator onboarding
- public tipping pages
- payment processing
- subscriptions
- realtime stream alerts
- OBS browser-source widgets
- TTS
- donation goals
- supporter profiles
- XP/badges/levels
- leaderboards
- community challenges
- analytics
- creator tools
- integrations
- moderation
- AI-assisted insights
- administration
- auditability

Priorities:
1. payment correctness
2. security
3. availability
4. data integrity
5. scalability
6. observability
7. maintainability

## 2. Architecture Style

**Modular Monolith + Event-Driven Workers + Selective Service Extraction**

Do not start with unnecessary microservices.

The core NestJS backend is a modular monolith. Background workloads are workers.
A domain becomes an independent service only after explicit human approval.

## 3. High-Level Architecture

```text
                           INTERNET
                               |
                               v
                         +-----------+
                         | Cloudflare|
                         | CDN/WAF   |
                         | DDoS/Bots |
                         +-----+-----+
                               |
                               v
                    +----------------------+
                    | AWS Application      |
                    | Load Balancer        |
                    +----------+-----------+
                               |
                +--------------+--------------+
                |                             |
                v                             v
        +---------------+              +---------------+
        | ECS API #1    |              | ECS API #2    |
        | NestJS        |              | NestJS        |
        +-------+-------+              +-------+-------+
                |                              |
                +---------------+--------------+
                                |
               +----------------+----------------+
               |                |                |
               v                v                v
        +-------------+   +-----------+   +-----------+
        | Aurora      |   | ElastiCache|   | SQS       |
        | PostgreSQL  |   | Redis      |   | Queues    |
        +-------------+   +-----------+   +-----+-----+
                                                |
                                                v
                                         +-------------+
                                         | ECS Workers |
                                         +-------------+
                                                |
                                      +---------+---------+
                                      |                   |
                                      v                   v
                                EventBridge            S3
```

## 4. Request Flow

```text
Client
  ↓
Cloudflare
  ↓
WAF / rate limit / bot protection
  ↓
ALB
  ↓
ECS NestJS
  ↓
Authentication
  ↓
Authorization
  ↓
Validation
  ↓
Domain Service
  ↓
Redis / PostgreSQL
  ↓
Response
```

Never bypass security layers for convenience.

## 5. Domain Modules

NestJS modules:
- Auth
- Users
- Creators
- Creator Profiles
- Tipping
- Payments
- Payment Webhooks
- Subscriptions
- Alerts
- Widgets
- Integrations
- Analytics
- Supporters
- Leaderboards
- Donation Goals
- Notifications
- Moderation
- AI
- Admin
- Audit

Modules communicate through explicit contracts. Avoid uncontrolled cross-module DB access.

## 6. Payment Architecture

Payment correctness is the highest application priority.

```text
Viewer
  |
  v
Public Creator Tip Page
  |
  v
Payment Creation
  |
  v
Authorised Payment Provider
  |
  v
Provider Webhook
  |
  v
Webhook Verification
  |
  v
Idempotency Check
  |
  v
Payment State Machine
  |
  v
PostgreSQL Transaction
  |
  +--------------------+
  |                    |
  v                    v
SQS/Event             Audit Log
  |
  v
Alert Worker
  |
  v
Realtime Delivery
  |
  v
OBS Browser Source
```

The frontend's payment-success claim is never authoritative.

Only trusted provider confirmation may finalize payment state.

## 7. Payment State

Use an explicit state model. Typical lifecycle:

```text
CREATED
  ↓
PENDING
  ↓
PROCESSING
  ↓
SUCCEEDED
```

Failure/refund/dispute states may include:

```text
FAILED
CANCELLED
EXPIRED
REFUNDED
PARTIALLY_REFUNDED
DISPUTED
```

Exact provider-specific states must follow the actual provider contract. Do not invent them.

## 8. Webhook Idempotency

```text
Webhook
  ↓
Validate signature
  ↓
Extract provider event ID
  ↓
Check idempotency record
  ↓
Already processed?
   ├── YES → safely acknowledge
   └── NO
        ↓
Persist event
        ↓
Process transaction
        ↓
Mark processed
```

Provider retries must never create duplicate financial effects.

## 9. Realtime Alert Architecture

```text
Successful Payment
       |
       v
Payment Event
       |
       v
SQS
       |
       v
Alert Worker
       |
       +--> Persist alert event
       |
       +--> Redis/realtime coordination
       |
       v
Socket.IO
       |
       v
Creator's OBS Browser Source
       |
       v
Alert displayed
```

Realtime is delivery, not financial truth.

If Socket.IO fails, payment validity remains intact.

## 10. Socket.IO Scaling

```text
                 ALB
                  |
        +---------+---------+
        |         |         |
       WS1       WS2       WS3
        |         |         |
        +---------+---------+
                  |
             Redis Adapter
```

Requirements:
- reconnect support
- heartbeat
- cleanup
- authentication/authorization
- event validation
- creator isolation
- rate limits
- bounded payloads

## 11. Traffic Management

### Layer 1: Cloudflare
- DDoS
- WAF
- bot mitigation
- edge rate limits
- caching

### Layer 2: ALB
- health checks
- target distribution
- unhealthy target removal

### Layer 3: Application
Redis-backed limits based on:
- IP
- account
- creator
- endpoint
- session
- authentication state

### Layer 4: Queue
Expensive work is asynchronous.

Examples:
- AI
- TTS
- email
- analytics
- media processing
- alerts
- notifications

## 12. Viral Creator Scenario

A viral creator must not consume the entire platform's resources.

Use:
- CDN caching
- edge rate limits
- application limits
- creator-level quotas where appropriate
- queues
- autoscaling
- Redis caching
- query optimization
- connection pooling
- backpressure

Unrelated creators must remain usable.

## 13. DDoS Scenario

```text
Attack traffic
     ↓
Cloudflare
     ↓
DDoS filtering
     ↓
WAF
     ↓
Bot/rate rules
     ↓
Legitimate traffic reaches AWS
```

Application servers must not be the first volumetric-defense layer.

## 14. Database Failure

Aurora PostgreSQL is authoritative and should use Multi-AZ deployment.

```text
Application
    ↓
Aurora
    ↓
Failover
    ↓
New writer
```

Use sensible timeouts, safe retries, connection pooling and RDS Proxy.

Never blindly retry financial operations.

## 15. Redis Failure

Critical state remains in PostgreSQL.

If Redis fails:
- cache may degrade
- some realtime coordination may degrade
- controlled rate-limit fallback may be needed
- no fake payment success
- financial records remain safe

## 16. Queue Failure

Workers must be idempotent.

```text
SQS
 ↓
Visibility timeout
 ↓
Retry
 ↓
Worker
```

Important queues need:
- retry policies
- visibility timeout
- dead-letter queue
- monitoring
- alarms

## 17. Backpressure

Never process unlimited expensive work inline.

```text
Traffic
  ↓
API
  ↓
Queue
  ↓
Workers
```

Workers scale according to queue depth and processing capacity.

## 18. Security Architecture

```text
Internet
  ↓
Cloudflare
  ↓
Public ALB
  ↓
Private ECS
  ↓
Private Aurora / Redis
```

Database and Redis must never be directly internet-exposed.

Use:
- authentication
- RBAC
- least privilege
- session revocation
- MFA for sensitive/admin operations
- Secrets Manager
- KMS
- GuardDuty
- Security Hub
- CloudTrail

## 19. Admin Security

Admin functions are highly privileged.

Require:
- strong authentication
- MFA
- RBAC
- audit logs
- sensitive-action confirmation
- session revocation
- least privilege

Sensitive admin actions must be auditable.

## 20. Fraud and Abuse

Assume malicious users exist.

Controls may include:
- request velocity limits
- payment velocity limits
- duplicate transaction detection
- webhook validation
- suspicious-account signals
- supporter-message moderation
- TTS filtering
- creator abuse controls
- manual review workflows

Do not claim a fraud model is effective until it is tested.

## 21. TTS Safety

```text
Input
 ↓
Length validation
 ↓
Content moderation
 ↓
Rate limit
 ↓
TTS provider
 ↓
Audio
 ↓
Alert
```

Never allow unlimited TTS requests.

## 22. OBS Widget Security

OBS browser sources are public-facing runtime clients.

Therefore:
- never expose private creator credentials
- use scoped public widget identifiers/tokens
- validate event payloads
- restrict sensitive operations
- support token revocation
- public widget credentials must not grant admin/payment access

## 23. Storage

S3 stores:
- alert media
- GIF/WebM
- sounds
- creator assets
- exported reports

Rules:
- private by default
- signed URLs where appropriate
- upload limits
- MIME/type validation
- malware scanning where required
- lifecycle policies
- no executable uploads

## 24. Observability

```text
Application
   |
   +--> Logs ------> CloudWatch
   |
   +--> Errors ----> Sentry
   |
   +--> Traces ----> OpenTelemetry
   |
   +--> Metrics ---> CloudWatch
```

Monitor:
- API latency
- HTTP 5xx
- payment failures
- webhook failures/duplicates
- queue depth
- worker failures
- DB CPU/connections
- Redis health
- ECS CPU/memory
- WebSocket connections
- alert delivery latency
- suspicious traffic

## 25. Deployment Safety

```text
Git Push
   ↓
GitHub Actions
   ↓
Lint
   ↓
Typecheck
   ↓
Tests
   ↓
Build
   ↓
Docker Image
   ↓
ECR
   ↓
Deployment
   ↓
Health Checks
   ↓
Traffic
```

Failed health checks must block or roll back the deployment.

## 26. Disaster Recovery

Initial production requirements:
- Multi-AZ architecture
- automated database backups
- tested restoration
- S3 durability
- Terraform-reproducible infrastructure
- documented recovery procedures

Multi-region disaster recovery is NOT part of initial architecture unless explicitly approved.

## 27. Graceful Degradation

### Tier 0 — Critical
- authentication
- payment state
- financial records
- creator account state
- authorization

### Tier 1 — Important
- tipping page
- alerts
- subscriptions
- creator dashboard

### Tier 2 — Degradable
- analytics
- AI insights
- recommendations
- non-critical notifications

Tier 2 failures must never stop Tier 0.

## 28. Feature Isolation

Correct:

```text
Payment
 ↓
Persist success
 ↓
Complete transaction
 ↓
Async events
 ├── Alert
 ├── TTS
 ├── Analytics
 └── AI
```

Never make payment completion depend on AI, TTS or analytics.

## 29. Data Consistency

Use PostgreSQL transactions for atomic operations.

Use asynchronous events for secondary effects.

Example:

```text
Payment transaction
   |
   +--> payment state
   +--> financial record
   +--> audit record
```

Then:

```text
payment.success
   ├── alert
   ├── leaderboard
   ├── analytics
   ├── notification
   └── AI insight
```

## 30. API Design

APIs must be:
- validated
- authenticated
- authorized
- rate-limited
- observable
- documented
- versioned where required

Do not expose database models directly as public API contracts.
Use DTOs and explicit response contracts.

## 31. Coding-Agent Preflight

Before modifying code an AI agent MUST:

1. Read `TECHSTACK.md`.
2. Read `ARCHITECTURE.md`.
3. Inspect the repository.
4. Identify the correct existing module.
5. Reuse existing patterns.
6. Avoid introducing a library if the locked stack already solves the problem.
7. Never change architecture silently.
8. Never change the technology stack silently.
9. Never invent APIs.
10. Never invent environment variables.
11. Never invent provider capabilities.
12. Never fabricate test results.

## 32. Change Control

Architecture changes require a human-approved ADR containing:
- title
- date
- status
- context
- current architecture
- proposed change
- alternatives
- security impact
- cost impact
- scalability impact
- migration plan
- rollback plan
- explicit approval

Only after approval may an agent modify locked architecture.

## 33. Anti-Hallucination Protocol

When uncertain:

**DO**
- inspect repository
- inspect package.json/config
- inspect provider documentation
- inspect existing modules
- ask the human
- label assumptions explicitly

**DO NOT**
- guess API endpoints
- guess credentials
- invent provider capabilities
- invent cloud resources
- invent schema requirements
- invent integration support
- claim security guarantees without evidence
- claim legal/compliance approval
- fabricate tests

## 34. No Self-Initiated Refactoring

An AI agent must not change architecture because another framework is newer,
a package is easier, a tutorial uses it, or the agent prefers it.

Architecture refactoring requires a real engineering reason and human approval
when it changes the locked architecture.

## 35. Source-of-Truth Order

1. explicit human instruction
2. approved ADR
3. TECHSTACK.md
4. ARCHITECTURE.md
5. existing implementation
6. other documentation
7. AI assumptions

If unresolved:

**STOP AND ASK.**

## 36. Final Architecture Lock

The canonical Streamly architecture is:

**Cloudflare + AWS ALB + ECS Fargate + NestJS + Aurora PostgreSQL + Redis +
SQS + EventBridge + S3 + Socket.IO + Terraform + GitHub Actions +
CloudWatch + Sentry + OpenTelemetry**

The system must scale horizontally, isolate failures, protect payment correctness,
control abusive traffic, and degrade gracefully.

**Do not replace this architecture without explicit human approval.**
