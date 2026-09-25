# UI/UX Design Brief

## Brand Identity

**Product:** Streamly
**Positioning:** Premium gaming SaaS — polished, professional, modern, restrained.

**What Streamly is NOT:**
- Childish or cartoonish
- Overly cyberpunk or neon-saturated
- Visually cluttered
- A generic AI startup template

## Logo & Brand Marks

The official canonical Streamly logo is the 3D purple ribbon play-button enclosing a gaming controller with the "Streamly" wordmark:
- **Dark Mode Master:** `assets/images/brand/streamly-logo-dark.jpg` (`public/brand/streamly-logo-dark.jpg`) — for dark navigation, dark cards, and hero elements.
- **Light Mode Master:** `assets/images/brand/streamly-logo-light.jpg` (`public/brand/streamly-logo-light.jpg`) — for white/light document backgrounds.
- **Header & Footer Banners:** `streamly-logo-banner.jpg` (dark) and `streamly-logo-banner-light.jpg` (light) — tightly cropped horizontal-ready lockup.
- **Icon Mark:** `streamly-icon.png` (536×536) — square app icon for topbar brand lockups, mobile drawer, creator login cards, and badges.
- **Browser Favicons:** `favicon-32x32.png` and `favicon.ico` — loaded in `index.html`, `login.html`, and Next.js root layout.

Do not generate or substitute a different logo. Use these canonical brand assets across all surfaces.

## Color Palette

### Brand Colors (Purple Spectrum)

| Token | Hex | Role & Usage |
|-------|-----|--------------|
| `--primary-purple` / `--primary` | `#6D3DF5` | Primary brand color — CTA buttons, active tabs, brand accents, glowing indicators |
| `--deep-purple` / `--primary-hover` | `#4B24B8` | Deep accent — hover & active states, deep gradient stops, focused borders |
| `--lavender` / `--primary-light` | `#A78BFA` | Mid-accent — badges, pill borders, secondary icons, highlights |
| `--soft-lavender` / `--primary-subtle` | `#F3F0FF` | Subtle background tint — active item backgrounds, subtle chip fills, table hover |

### Surface & Neutral Colors

| Token | Hex | Role & Usage |
|-------|-----|--------------|
| `--primary-text` / `--text-primary` | `#17151D` | High-contrast text — page headings, card titles, key metric numbers |
| `--secondary-text` / `--text-secondary` | `#6B6875` | Medium-contrast text — body paragraphs, subheadings, labels, metadata |
| `--border` | `#E8E4F0` | Structural dividers, card borders, form input outlines |
| `--surface` | `#FFFFFF` | Elevated card backgrounds, modal dialogs, popovers, navigation bars |
| `--soft-background` / `--bg` | `#F8F7FC` | Base page background, section alternate fills, table container backgrounds |

### Feedback & Semantic Colors

| Token | Hex | Role & Usage |
|-------|-----|--------------|
| `--success` | `#16A34A` | Success states — successful tip alerts, verified badges, connected UPI status |
| `--warning` | `#D97706` | Warning states — low token alerts, pending webhook retries, KYC notice |
| `--error` | `#DC2626` | Destructive states — failed transactions, validation errors, disconnected alerts |

### Usage Rules

- Use purple **intentionally** — do not make every component purple
- White backgrounds for marketing surfaces
- Deep charcoal/slate for dashboard surfaces
- High-quality neutral grays for structure
- Semantic colors for states — never use color alone to communicate state

## Typography

### Font Families

| Purpose | Font | Fallback |
|---------|------|----------|
| **Display** (headings, brand) | Plus Jakarta Sans | system-ui, sans-serif |
| **Body** (text, UI) | Inter | system-ui, sans-serif |
| **Mono** (code, IDs) | JetBrains Mono | monospace |

Load via Google Fonts with `display=swap`.

### Type Scale

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Display | 3.5rem–4.5rem | 900 | 1.05 | Hero headline |
| H1 | 2.25rem | 800 | 1.15 | Page titles |
| H2 | 1.75rem | 700 | 1.2 | Section headings |
| H3 | 1.25rem | 700 | 1.3 | Card titles, subsections |
| H4 | 1.1rem | 600 | 1.4 | Labels, feature titles |
| Body Large | 1.125rem | 400 | 1.6 | Hero body copy |
| Body | 1rem | 400 | 1.6 | Standard text |
| Body Small | 0.875rem | 400 | 1.5 | Secondary text |
| Caption | 0.75rem | 500 | 1.4 | Metadata, timestamps |

### Typography Rules

- Headings use Plus Jakarta Sans (bold/extra-bold)
- Body text uses Inter (regular/medium)
- Letter spacing: slight negative tracking on display/headings (`-0.02em` to `-0.03em`)
- Never use default browser fonts

## Spacing System

Based on 4px grid: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`

Use Tailwind spacing utilities consistently.

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `6px` | Small elements, badges |
| `--radius-md` | `10px` | Buttons, inputs |
| `--radius-lg` | `16px` | Cards, panels |
| `--radius-xl` | `24px` | Large containers, hero cards |
| `--radius-full` | `9999px` | Avatars, pills |

## Shadows

| Level | CSS | Usage |
|-------|-----|-------|
| Subtle | `0 1px 2px rgba(0,0,0,0.05)` | Resting cards |
| Default | `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)` | Interactive cards |
| Medium | `0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)` | Dropdowns, popovers |
| Large | `0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)` | Modals, floating elements |
| Purple glow | `0 8px 24px rgba(139,92,246,0.25)` | Primary CTA buttons |

## Icon System

**Lucide React only.** No mixing of icon packs.

Use icons semantically:

| Icon | Context |
|------|---------|
| `Gamepad2` | Gaming, streams |
| `Bell` | Notifications, alerts |
| `Wallet` | Donations, earnings |
| `CreditCard` | Payments, billing |
| `Radio` | Live, OBS connection |
| `Users` | Supporters, community |
| `Trophy` | Leaderboard, achievements |
| `Target` | Goals |
| `BarChart3` | Analytics, charts |
| `Shield` | Security, trust |
| `Crown` | Premium, levels |
| `Zap` | Quick actions, combos |
| `Settings` | Configuration |
| `Store` | Creator store |
| `Sparkles` | AI features, special |

Icons support information hierarchy — they are not decoration.

## Component Style Guidelines

### Buttons

- Primary: filled purple, white text, purple glow shadow on hover
- Secondary: outlined or ghost, border on hover
- Destructive: red for dangerous actions
- Minimum height: 40px (default), 48px (large)
- Hover: subtle translateY(-1px) lift
- Focus: visible ring (purple or slate)
- Disabled: reduced opacity, no pointer events

### Cards

- Light mode: white background, subtle border, soft shadow
- Dark mode: slate-800 background, slate-700 border
- Padding: 24px default
- Border radius: `--radius-lg`

### Forms

- Clear labels above inputs
- Visible error states with red border + error message below
- Loading states on submit buttons
- Accessible focus indicators

### Navigation

- Dashboard sidebar: dark background, icon + label, active state highlight
- Marketing header: transparent/glass on scroll, sticky
- Breadcrumbs where appropriate in dashboard

## Animation Guidelines

### When to Animate

- Alert previews (donation alert animations)
- Progress indicators (goal bars, loading states)
- State changes (success checkmarks, error shakes)
- Onboarding transitions
- Micro-interactions (button hovers, card reveals)
- Page transitions (subtle fade/slide)

### When NOT to Animate

- Every component on mount
- Excessive parallax or scroll effects
- Random floating/pulsing decorations
- Anything that impedes usability

### Animation Principles

- Duration: 150ms–400ms for interactions, up to 1s for reveals
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for spring feel
- **Respect `prefers-reduced-motion`** — disable non-essential animation

## Design Anti-Patterns (Avoid)

- Excessive glassmorphism
- Huge gradient blobs
- Generic AI-startup gradients
- Random neon glow effects
- Excessively rounded cards (pill-shaped containers)
- Cartoon or toy UI
- Emoji as interface icons
- Inconsistent icon styles
- Horizontal scrolling on desktop
- Forced dark mode on marketing pages

## Responsive Strategy

| Surface | Priority | Breakpoints |
|---------|----------|-------------|
| Marketing pages | Desktop-first, responsive down | `lg` → `md` → `sm` |
| Creator dashboard | Desktop-first, usable on tablet/mobile | `xl` → `lg` → `md` → `sm` |
| Donation page | **Mobile-first** | `sm` → `md` → `lg` |
| OBS overlay | Fixed dimensions, no responsive needed | N/A |

## Design Inspiration Sources

Take structural inspiration from modern SaaS/gaming dashboards on Dribbble and 21st.dev for:

- Card structure and hierarchy
- Dashboard layout patterns
- Button treatment
- Spacing and visual polish
- Interaction patterns

Do NOT copy proprietary artwork, code, exact layouts, or branded assets from any third-party site.
