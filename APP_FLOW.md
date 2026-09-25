# App Flow

## Overview

This document defines the navigation structure, page phases, and interaction flows for Streamly. Every button, link, and action maps to a specific destination and behavior.

---

## Phase 1: Public Marketing

Unauthenticated visitors land on marketing pages. These pages convince creators to sign up.

### Navigation (Marketing Header)

```
[Logo: Streamly]   Features   Pricing   About   Contact   [Login]   [Start Free →]
```

| Click | Destination | Behavior |
|-------|-------------|----------|
| Logo | `/` | Navigate to landing page |
| Features | `/features` | Navigate to features page |
| Pricing | `/pricing` | Navigate to pricing page |
| About | `/about` | Navigate to about page |
| Contact | `/contact` | Navigate to contact page |
| Login | `/login` | Navigate to login form |
| Start Free | `/signup` | Navigate to signup form |

### Landing Page (`/`) Flow

```
Hero Section
  ├── [Start Free →] → /signup
  └── [View Features] → /features

How It Works Section
  └── [Get Started] → /signup

Features Section
  └── [See All Features] → /features

Pricing Section
  ├── Free [Get Started] → /signup
  ├── Pro [Subscribe] → /signup?plan=pro
  └── Plus [Subscribe] → /signup?plan=plus

Footer
  ├── Terms → /terms
  ├── Privacy → /privacy
  ├── Refunds → /refunds
  └── Contact → /contact
```

### Pricing Page (`/pricing`) Flow

```
Three plan cards:
  ├── Free [Start Free] → /signup
  ├── Pro [Get Pro] → /signup?plan=pro (or /checkout?plan=pro if logged in)
  └── Plus [Get Plus] → /signup?plan=plus (or /checkout?plan=plus if logged in)

FAQ Section (accordion expand/collapse)
```

---

## Phase 2: Authentication

### Signup (`/signup`)

```
Form: Name, Email, Password, Confirm Password
  ├── [Create Account] → POST /api/auth/signup
  │     ├── Success → /verify-email (show "check your email" message)
  │     ├── Validation Error → show inline errors
  │     └── Server Error → show error toast
  ├── [Sign up with Google] → Google OAuth flow → /dashboard
  └── "Already have an account?" → /login
```

### Login (`/login`)

```
Form: Email, Password
  ├── [Log In] → POST /api/auth/login
  │     ├── Success → /dashboard
  │     ├── Email not verified → show verification prompt
  │     ├── Invalid credentials → show error message
  │     └── Rate limited → show "too many attempts" message
  ├── [Sign in with Google] → Google OAuth flow → /dashboard
  ├── "Forgot password?" → /forgot-password
  └── "Don't have an account?" → /signup
```

### Forgot Password (`/forgot-password`)

```
Form: Email
  ├── [Send Reset Link] → POST /api/auth/forgot-password
  │     ├── Success → show "check your email" message
  │     └── Error → show error
  └── "Back to login" → /login
```

### Reset Password (`/reset-password?token=...`)

```
Form: New Password, Confirm Password
  ├── [Reset Password] → POST /api/auth/reset-password
  │     ├── Success → /login with success message
  │     ├── Token expired → show error, link to /forgot-password
  │     └── Error → show error
  └── Invalid/expired token → show error state with retry link
```

### Email Verification (`/verify-email?token=...`)

```
Auto-verify on page load → POST /api/auth/verify-email
  ├── Success → /dashboard with welcome message
  ├── Token expired → show error, [Resend Verification] button
  └── Error → show error state
```

---

## Phase 3: Creator Dashboard

After login, creators see the dashboard. The dashboard has a persistent sidebar navigation.

### Dashboard Layout

```
┌─────────────────────────────────────────────────┐
│ [Sidebar]              [Main Content Area]      │
│                                                 │
│  Streamly Logo         Page content renders     │
│  ─────────────         here based on active     │
│  Overview              sidebar item             │
│  Donations                                      │
│  Supporters                                     │
│  Goals                                          │
│  Leaderboard                                    │
│  Alerts                                         │
│  Widgets                                        │
│  Analytics                                      │
│  Store                                          │
│  ─────────────                                  │
│  Billing                                        │
│  Settings                                       │
│  ─────────────                                  │
│  [Logout]                                       │
└─────────────────────────────────────────────────┘
```

### Sidebar Navigation

| Click | Destination | Required Entitlement |
|-------|-------------|---------------------|
| Overview | `/dashboard` | None |
| Donations | `/dashboard/donations` | None |
| Supporters | `/dashboard/supporters` | None |
| Goals | `/dashboard/goals` | None |
| Leaderboard | `/dashboard/leaderboard` | `gamification.basic` |
| Alerts | `/dashboard/alerts` | `alerts.basic` |
| Widgets | `/dashboard/widgets` | `widgets.basic` |
| Analytics | `/dashboard/analytics` | `analytics.basic` |
| Store | `/dashboard/store` | `creator.store` (Plus) — shows locked state for others |
| Billing | `/dashboard/billing` | None |
| Settings | `/dashboard/settings` | None |
| Logout | POST /api/auth/logout → `/login` | None |

### Overview (`/dashboard`)

```
KPI Cards: Today's Donations | This Month | Unique Supporters | Average Donation
Revenue Trend Chart (7-day / 30-day toggle)
Recent Donations List (last 10)
  └── [View All] → /dashboard/donations
Top Supporters (top 5)
  └── [View All] → /dashboard/supporters
Goal Progress (active goal)
  └── [Manage Goals] → /dashboard/goals
Alert Connection Status
  └── [Configure] → /dashboard/alerts
Current Subscription Badge
  └── [Upgrade] → /dashboard/billing
```

### Donations (`/dashboard/donations`)

```
Filter bar: Date range | Status | Min/Max amount | Search
Donation table (paginated):
  │ Supporter | Amount | Status | Message | Date
  └── Click row → donation detail slide-over/modal
      │ Full donation details
      │ Payment details
      │ Event timeline
      └── [Copy donation ID]

Export: [Export CSV] → download
```

### Supporters (`/dashboard/supporters`)

```
Search bar | Sort by: Total donated | Donation count | Recent
Supporter table (paginated):
  │ Name | Total Donated | Donations | XP | Level | Last Active
  └── Click row → supporter detail view
      │ Donation history with this creator
      │ XP breakdown
      │ Badges earned
      └── Level progress
```

### Goals (`/dashboard/goals`)

```
[+ Create Goal] → modal/form
  Fields: Title, Target Amount, Start Date, End Date, Milestones (Pro+)
  ├── [Save] → POST /api/creator/goals
  └── [Cancel] → close

Active Goals list:
  │ Title | Progress bar | Amount/Target | Status
  ├── [Edit] → edit modal
  ├── [Deactivate] → confirm dialog → PUT
  └── [Delete] → confirm dialog → DELETE
```

### Alerts (`/dashboard/alerts`)

```
Connection Status: Connected ● / Disconnected ○

Alert Rules (ordered list):
  │ Threshold range | Style preview | Status
  ├── [+ Add Rule] → alert config form
  │     Fields: Min Amount, Max Amount, Image/GIF, Sound, Animation, Duration
  │     ├── [Preview] → show alert preview animation
  │     └── [Save] → POST /api/creator/alerts
  ├── [Edit] → edit form
  ├── [Delete] → confirm → DELETE
  └── Drag to reorder → PUT (sort order)

TTS Configuration:
  │ Enable/Disable toggle
  │ Min donation threshold
  │ Max message length
  │ Language, Voice, Volume
  │ Profanity filter toggle
  │ Blocked words list
  └── [Save TTS Settings] → PUT /api/creator/tts

OBS Setup:
  │ Browser Source URL (masked, with copy button)
  │ [Copy URL] → clipboard
  │ [Regenerate Token] → confirm dialog → POST /api/creator/overlay-token
  │ [Test Alert] → POST /api/creator/alerts/test → sends test event to OBS
  └── Connection log: last heartbeat, last event
```

### Widgets (`/dashboard/widgets`)

```
Widget list: Alert Box | Goal Widget | Leaderboard Widget | Recent Donations
  │ Each widget:
  │   Status: Active/Inactive toggle
  │   [Configure] → config panel
  │   [Copy URL] → overlay URL to clipboard
  │   [Preview] → opens preview in new tab
  └── Premium widgets show locked state with [Upgrade] → /dashboard/billing
```

### Analytics (`/dashboard/analytics`)

```
Date range selector: 7d | 30d | 90d | Custom

KPI row: Total Donations | Donation Count | Avg Donation | Unique Supporters

Charts:
  ├── Donation trend (line chart)
  ├── Donation distribution (histogram)
  ├── Top supporters (bar chart)
  └── Supporter retention (if Pro+)

AI Insights (Plus only):
  │ Shows AI-generated summaries referencing actual data
  └── Locked state for Free/Pro with [Upgrade to Plus] CTA
```

### Billing (`/dashboard/billing`)

```
Current Plan card:
  │ Plan name | Price | Status | Next renewal date
  ├── [Upgrade] → /checkout?plan=pro or /checkout?plan=plus
  ├── [Downgrade] → confirm dialog → process
  └── [Cancel Subscription] → confirm dialog → cancel flow

Payment History table:
  │ Date | Amount | Status | Invoice
  └── [Download Invoice] → download PDF/link

Active subscription details from server (never from client callback)
```

### Settings (`/dashboard/settings`)

```
Profile Section:
  │ Display Name, Bio, Avatar Upload, Social Links
  └── [Save Profile] → PUT /api/creator/profile

Creator Page Section:
  │ Slug (with uniqueness check)
  │ Public page preview link
  └── [Save] → PUT

Account Section:
  │ Email (read-only or change flow)
  │ [Change Password] → password change form
  └── [Delete Account] → confirm dialog with consequences

Donation Page Section:
  │ Suggested amounts configuration
  │ Minimum donation amount
  │ UPI ID
  └── [Save] → PUT
```

---

## Phase 4: Public Creator Pages

### Creator Profile (`/creator/[slug]`)

```
Creator avatar, display name, bio
Social links
Donation CTA: [Support {CreatorName}] → /donate/[slug]
Active donation goal (if any) with progress bar
Supporter leaderboard (if enabled and public)
Recent supporters (if enabled and public)
Streamly branding: "Powered by Streamly" (if Free plan)
```

### Donation Page (`/donate/[slug]`)

**Mobile-first design.**

```
Creator card: avatar, name

Amount selection:
  ├── Suggested amounts (₹49, ₹99, ₹199, ₹499, ₹999)
  └── Custom amount input

Donor info:
  ├── Display name input
  ├── [Anonymous] toggle → hides name
  └── Message input (optional, character count)

[Donate ₹{amount}] → POST /api/donate/[slug]
  ├── Loading state → Razorpay checkout opens
  │     ├── Payment success (client callback — informational only)
  │     │     → Show "Processing..." → wait for server confirmation
  │     │     → Show success state with confetti/animation
  │     ├── Payment failed → show failure state with [Try Again]
  │     └── Payment dismissed → return to form
  ├── Validation error → inline errors
  └── Server error → error toast with retry

Streamly branding (if Free plan)
```

---

## Phase 5: OBS Overlay Pages

### Alert Overlay (`/overlay/alerts/[creatorId]/[token]`)

```
Transparent background page
WebSocket connection to server
  ├── Connected → idle (transparent, waiting)
  │     └── Receive donation.confirmed event →
  │           Match alert rules by amount →
  │           Render alert animation (image/GIF + text + sound) →
  │           Auto-dismiss after configured duration →
  │           TTS playback if enabled →
  │           Return to idle
  ├── Disconnected → auto-reconnect with backoff
  │     └── Show "Reconnecting..." indicator (visible during setup only)
  └── Invalid token → show error message
```

### Goal Overlay (`/overlay/goal/[creatorId]/[token]`)

```
Transparent background
Displays: Goal title + progress bar + amount/target
Updates in real-time when donation.goal_updated event received
```

### Leaderboard Overlay (`/overlay/leaderboard/[creatorId]/[token]`)

```
Transparent background
Displays: Top N supporters with amounts
Updates in real-time when leaderboard.updated event received
```

---

## Phase 6: Billing / Checkout

### Checkout (`/checkout?plan=pro|plus`)

```
Plan summary card: name, price, features
[Subscribe with Razorpay] → POST /api/billing/subscribe
  → Opens Razorpay checkout
  ├── Client callback success → /payment/success (informational)
  ├── Client callback failure → /payment/failure
  └── Server webhook activates subscription (authoritative)
```

### Payment Success (`/payment/success`)

```
"Payment received! Your subscription is being activated..."
Polls or listens for server-confirmed activation
  ├── Activated → show success, [Go to Dashboard] → /dashboard
  └── Timeout → "Taking longer than expected" + [Check Status] + [Contact Support]
```

### Payment Failure (`/payment/failure`)

```
"Payment could not be completed."
[Try Again] → /checkout?plan=...
[Contact Support] → /contact
```

---

## Phase 7: Admin Panel

### Admin Layout

```
┌────────────────────────────────────────────────┐
│ [Admin Sidebar]        [Admin Content]         │
│                                                │
│  Dashboard             Page content            │
│  Users                                         │
│  Creators                                      │
│  Donations                                     │
│  Subscriptions                                 │
│  Payments                                      │
│  Webhooks                                      │
│  Fraud                                         │
│  Audit Log                                     │
│  Settings                                      │
└────────────────────────────────────────────────┘
```

### Admin Interactions

| Action | Behavior |
|--------|----------|
| View user | User detail panel with role, email, subscription, audit history |
| Suspend creator | Confirm dialog → updates status → audit log entry |
| Inspect donation | Full donation detail with payment events, webhook events, state timeline |
| Inspect webhook | Raw webhook payload, processing status, linked donation/subscription |
| View fraud events | List with severity, status, investigation notes |
| View audit log | Searchable, filterable log of all admin and financial actions |
| Change plan metadata | Edit form → confirm → save → audit log |

---

## Error States (Global)

Every important user action follows this state pattern:

```
Idle → Loading → Success
                → Error → [Retry]
                → Expired → [Refresh / Re-authenticate]
                → Unauthorized → /login
                → Forbidden → "Access denied" message
                → Not Found → 404 page
```

No button should appear functional without a real backend action behind it.

---

## Navigation Guards

| Route Pattern | Guard | Redirect |
|---------------|-------|----------|
| `/dashboard/*` | Must be logged in + CREATOR role | → `/login` |
| `/admin/*` | Must be logged in + ADMIN/SUPER_ADMIN role | → `/login` |
| `/checkout/*` | Must be logged in | → `/login?redirect=/checkout...` |
| `/login`, `/signup` | Must NOT be logged in | → `/dashboard` |
| Entitlement-gated features | Must have active plan feature | → show locked UI with upgrade CTA |
