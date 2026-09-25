# PRD — Product Requirements Document

## Product

**Name:** Streamly
**Tagline:** Turn Donations into Experiences.
**Category:** Gaming livestream creator monetization and engagement SaaS.

## What Streamly Does

Streamly is a subscription-based SaaS platform for gaming livestream creators. Creators use Streamly to receive direct viewer donations, display real-time donation alerts inside OBS, use text-to-speech, create donation goals, build supporter leaderboards, reward loyal supporters with XP and badges, analyze supporter and donation behavior, and create interactive donation experiences.

## Who It's For

### Primary Users

1. **Gaming livestream creators** — YouTube Gaming, Twitch, Kick, and future platforms.
2. **Viewers / fans / supporters** — people who donate to and engage with creators.
3. **Streamly platform administrators** — internal operations and moderation.
4. **Future brand / business users** — sponsors and partners (future scope).

## Business Goal

Monetize through creator subscriptions — **not** through commissions on creator donations.

**₹0 Streamly platform commission on creator donations.**

Payment gateway processing costs may still apply and must never be misrepresented as zero fees.

## Business Model — Three Creator Plans

| Plan | Price | Key Differentiator |
|------|-------|--------------------|
| **Free** | ₹0/month | Basic features, mandatory Streamly branding |
| **Creator Pro** | ₹499/month | Advanced customization, gamification, analytics, remove branding |
| **Creator Plus** | ₹999/month | AI analytics, donation combos, community challenges, creator store foundation, premium everything |

### Free Plan Capabilities

- Creator profile and public donation page
- Basic donation support with UPI/payment integration
- Basic donation alerts, TTS, donation goal, donor history
- Basic dashboard and OBS Browser Source
- Limited customization
- "Powered by Streamly" branding (mandatory)

### Creator Pro Additions

- Remove Streamly branding
- Advanced alert customization (custom GIF/video/sound)
- Advanced TTS controls
- Donation goals with milestones
- Supporter leaderboard, fan XP, badges, supporter levels
- Advanced widgets, analytics, custom themes

### Creator Plus Additions

- AI-powered analytics and supporter insights
- Advanced fan gamification and donation combos
- Community challenges
- Premium widgets
- Creator store foundation
- Advanced moderation
- Priority support infrastructure

## Core User Experience

### Creator Workflow

```
Create account
→ Choose subscription plan
→ Complete creator profile
→ Configure donation page
→ Configure alerts
→ Connect OBS
→ Share Streamly donation URL
```

### Viewer Workflow

```
Open creator donation page
→ Enter donation amount
→ Enter display name (or anonymous)
→ Enter optional donation message
→ Choose payment method
→ Complete payment
```

### Post-Payment Experience

```
Payment confirmed (server-side webhook only)
→ Donation alert in OBS
→ TTS if enabled
→ Donation goal update
→ Fan XP update
→ Badge/level update
→ Leaderboard update
→ Analytics update
```

## Two Separate Money Flows

### Flow A: Creator pays Streamly

- Purpose: creator subscription billing (Free / ₹499 Pro / ₹999 Plus)
- Streamly is the merchant

### Flow B: Viewer supports Creator

- Purpose: viewer donation to creator
- Streamly platform commission: ₹0
- Creator is the recipient

These flows must have **separate entities, transactions, states, APIs, webhook handlers, and reporting logic**. The codebase must never confuse subscription billing with viewer donations.

## Donation State Machine

Only CONFIRMED donations trigger creator-facing effects. Never trigger alerts on unverified frontend responses.

```
CREATED → PENDING → AUTHORIZED → CAPTURED → CONFIRMED
                                           → FAILED
                                           → CANCELLED
CONFIRMED → REFUNDED
          → PARTIALLY_REFUNDED
          → DISPUTED
```

## Key Product Features

### OBS Integration

- Secure Browser Source URL per creator with revocable tokens
- Fast loading, transparent background, auto-reconnect
- Support for test alerts, connection state display
- Event ordering preservation, duplicate event protection

### Alert System

- Tiered alerts based on donation amount (configurable thresholds)
- Support for images, GIFs, video, sound effects, animations
- Configurable duration and styles

### Text-to-Speech

- Minimum donation threshold, max message length
- Profanity filtering, blocked words, language/voice config
- Volume, cooldown, creator enable/disable toggle
- All user content sanitized — no raw HTML/script execution

### Supporter Gamification

- XP system with configurable levels (Supporter → Loyal → Elite → Legend)
- Badges, streaks, leaderboards, supporter history
- Configurable gamification rules (not hardcoded)
- Anti-abuse design — no encouragement of spam or fake transactions

### Donation Goals

- Title, target amount, current amount, start/end date
- Milestone thresholds, alert styles, visibility settings
- Goal updates happen transactionally after confirmed donations

### Donation Combos (Plus only)

- Multiple confirmed donations in configurable time window trigger combo events
- Deterministic, race-safe, idempotent — no client-side timer dependency

### Community Challenges (Plus only)

- Creator-defined challenges with targets, deadlines, milestones
- Progress displayed in dashboard, public page, and OBS widgets

### Analytics

- Gross confirmed donation amount, count, average, median
- Returning/unique supporters, top supporters, donation distribution
- Daily/weekly/monthly trends, goal completion, TTS usage
- AI analytics (Plus only) — references actual structured data, never invents numbers

### Creator Store (Plus foundation)

- Future support for digital guides, sensitivity settings, crosshair packs, coaching, exclusive content
- Domain model and UI foundation only — no fake marketplace functionality

## Creator Dashboard

### Primary Navigation

Overview · Donations · Supporters · Goals · Leaderboard · Alerts · Widgets · Analytics · Store · Billing · Settings

### KPI Cards

Today · This month · Confirmed donations · Unique supporters · Average donation · Current goal

### Dashboard Content

Revenue trend chart · Recent donations · Top supporters · Goal progress · Alert health · Current subscription

## Public Creator Page

`/creator/[slug]`

- Creator profile (avatar, bio, social links)
- Donation form (suggested amounts, custom amount, anonymous option, message)
- Donation goal display
- Supporter leaderboard (if enabled)
- Recent supporter activity (if enabled)
- Streamly branding (depends on plan)
- **Mobile-first design**

## Billing Page

- Current plan, renewal date, billing status
- Invoices and payment history
- Upgrade, downgrade, cancel actions
- Subscription activation is server-confirmed via webhooks — never via browser callback alone

## Admin Panel

Users · Creators · Subscriptions · Donations · Payments · Webhook events · Reports · Fraud · Audit logs · Plans · Feature flags · Support tickets · System health

Admins can suspend creators, review reports, inspect donation/webhook/subscription state, change plan metadata, view platform metrics. No silent alteration of financial records without audit trail.

## Data Privacy

- Creator financial and supporter data is private
- No public exposure of donation history unless creator enables it
- No exposure of supporter email, phone, payment IDs, internal IDs
- Public pages display only data intentionally configured as public

## Accessibility

Target WCAG AA: semantic HTML, keyboard navigation, focus states, visible labels, accessible dialogs, sufficient contrast, screen-reader labels, reduced motion support. Never use color alone to communicate state.

## SEO

Marketing pages: metadata, Open Graph, Twitter/X cards, sitemap, robots.txt, canonical URLs, structured metadata. Public creator pages need good social sharing previews.

## Definition of Done

The product is not complete until: application builds, type checks pass, lint passes, critical tests pass, auth works, creator authorization works, subscription entitlements work, donation verification is server-side, webhook verification/idempotency work, donation alerts use confirmed transactions only, OBS overlay works, dashboard works, public creator page works, all three plans work, branding behaves correctly by plan, no platform commission on donations, payment gateway fees correctly separated, audit logging exists, secrets not exposed, responsive layouts work, accessibility reasonable, production build succeeds.
