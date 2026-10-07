# Streamly — Mandatory Directives & External Reference Guidelines

> **CRITICAL PRE-FLIGHT REQUIREMENT**
>
> Prior to executing ANY task or writing any code:
> 1. Read [TECHSTACK.md](file:///c:/Users/sv369/OneDrive/Desktop/Streamly/Techstack%20and%20architeture/TECHSTACK.md)
> 2. Read [ARCHITECTURE.md](file:///c:/Users/sv369/OneDrive/Desktop/Streamly/Techstack%20and%20architeture/ARCHITECTURE.md)
> 3. Read [AGENTS.md](file:///c:/Users/sv369/OneDrive/Desktop/Streamly/AGENTS.md)

### Locked Stack Summary
- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, Radix UI, TanStack Query, Zustand, Zod.
- **Backend**: NestJS (Modular Monolith), TypeScript, REST API, Socket.IO (Redis Adapter).
- **Data & Queues**: Aurora PostgreSQL, Redis (ElastiCache), Amazon SQS, EventBridge, S3.
- **Infrastructure & Edge**: AWS ECS Fargate, ALB, Cloudflare (WAF/DDoS), Terraform, GitHub Actions.
- **Security & Observability**: Streamly Auth (JWT/Sessions), Argon2id, CloudWatch, Sentry, OpenTelemetry.

### External Reference Repositories (Methodology & Review Only)
1. **Anthropic Cybersecurity Skills**: Defensive security, OWASP Top 10, MITRE F3 fraud defenses, webhook verification, AWS hardening.
2. **Addy Osmani Agent Skills**: Spec-driven, TDD, Doubt-driven engineering, small atomic tasks, quality gates (`/spec` -> `/plan` -> `/build` -> `/test` -> `/review` -> `/ship`).
3. **Graphify**: Dev-time codebase intelligence & blast-radius dependency mapping (never in production).
4. **Agency Agents**: Multi-agent specialist reviewer perspectives (Software Architect, Security Architect, Database Optimizer, SRE, Payments & Billing Engineer, Reality Checker).
5. **Awesome LLM Apps**: Typed outputs, trust-gated workflows, isolated AI features.

NO substitutions or unauthorized stack alterations without explicit human approval.
Browser is NEVER authoritative for payments. Fail-safe design is mandatory.
