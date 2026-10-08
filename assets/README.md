# Streamly Assets & Reference Codebase

This directory houses the categorized visual assets, design tokens, and modularized reference code for **Streamly** — the premium live gaming creator SaaS platform with direct UPI tipping, zero payout delay, and real-time OBS alert overlays.

---

## Directory Structure

```
assets/
├── README.md                      # Comprehensive assets and reference code documentation
├── manifest.json                  # JSON catalog with checksums, dimensions, sizes, and metadata
├── index.ts                       # TypeScript definitions and asset exports for Next.js / frontend
├── index.js                       # CommonJS / ES module asset exports
├── images/                        # Categorized visual and vector assets
│   ├── providers/                 # UPI & merchant payment provider badges
│   │   ├── amazon-pay.svg         # Amazon Pay official vector SVG logo
│   │   ├── google-pay.webp        # Google Pay for Business 240x240 WebP icon
│   │   ├── hdfc-smarthub.webp     # HDFC SmartHub Vyapar 240x240 WebP icon
│   │   ├── paytm.webp             # Paytm for Business 240x240 WebP icon
│   │   └── phonepe.webp           # PhonePe for Business 240x240 WebP icon
│   ├── alerts/                    # OBS overlay animations & graphic widgets
│   │   └── throwing-money.gif     # Cash banknote rainfall animation for alertbox (480x292)
│   └── creators/                  # Streamer community avatars & social proof
│       ├── casetoo.jpg            # Streamer avatar (@casetoo - 511x512)
│       ├── motato.png             # Streamer avatar (@motato - 96x96)
│       └── nakul-dhull.png        # Streamer avatar (@nakul-dhull - 700x1244)
├── code/                          # Production-clean reference frontend implementation
│   ├── index.html                 # Decoupled semantic HTML (43 KB vs 2.75 MB original)
│   ├── styles.css                 # Dark-mode gaming design system stylesheet
│   └── app.js                     # Interactive logic (calculator, tabs, alerts, mobile menu)
└── archives/                      # Original upstream Woblo zip archives (preserved)
    ├── streamly-india-s-1-direct-upi-tipping-alerts-for-streamers-0-payout-delay.assets.Woblo.zip
    └── streamly-india-s-1-direct-upi-tipping-alerts-for-streamers-0-payout-delay.full-page.Woblo.zip
```

---

## 1. Visual Assets Catalog

| Asset ID | File Path | Format | Size | Dimensions | Category & Usage |
|---|---|---|---|---|---|
| `provider-amazon-pay` | `images/providers/amazon-pay.svg` | SVG | 8.4 KB | Vector | Amazon Pay UPI & Merchant QR payment route |
| `provider-google-pay` | `images/providers/google-pay.webp` | WebP | 7.2 KB | 240 × 240 | Google Pay Business instant settlement card |
| `provider-paytm` | `images/providers/paytm.webp` | WebP | 6.9 KB | 240 × 240 | Paytm for Business merchant integration |
| `provider-phonepe` | `images/providers/phonepe.webp` | WebP | 1.9 KB | 240 × 240 | PhonePe for Business direct bank account route |
| `provider-hdfc-smarthub` | `images/providers/hdfc-smarthub.webp` | WebP | 996 B | 240 × 240 | HDFC Bank SmartHub Vyapar merchant UPI route |
| `alert-throwing-money` | `images/alerts/throwing-money.gif` | GIF | 481 KB | 480 × 292 | OBS live stream alertbox tipping animation |
| `creator-casetoo` | `images/creators/casetoo.jpg` | JPEG | 20.2 KB | 511 × 512 | Top streamer leaderboard avatar (@casetoo) |
| `creator-motato` | `images/creators/motato.png` | PNG | 19.8 KB | 96 × 96 | Streamer community leaderboard avatar (@motato) |
| `creator-nakul-dhull` | `images/creators/nakul-dhull.png` | PNG | 1.4 MB | 700 × 1244 | Featured creator avatar (@nakul-dhull) |

---

## 2. Reference Code Implementation (`assets/code/`)

The original scraped landing page inlined over **2.7 MB** of base64 data URIs into a monolithic HTML file. This implementation cleanly refactors and decouples the codebase:

1. **`index.html`**:
   - Replaced all 9 base64 data URIs with clean relative asset references (`../images/...`).
   - Reduced HTML size from **2,759,399 bytes** down to **43,872 bytes** (**98.4% reduction**).
   - Modularized stylesheet link: `<link rel="stylesheet" href="styles.css">`.
   - Modularized interactive script link: `<script src="app.js" defer></script>`.

2. **`styles.css`**:
   - Official brand design system tokens:
     - `--primary-purple` / `--primary`: `#6D3DF5` (Electric brand purple)
     - `--deep-purple` / `--primary-hover`: `#4B24B8` (Deep accent purple)
     - `--lavender`: `#A78BFA` (Mid-tone purple)
     - `--soft-lavender`: `#F3F0FF` (Subtle purple tint)
     - `--primary-text`: `#17151D` (Heading & primary text)
     - `--secondary-text`: `#6B6875` (Body & secondary text)
     - `--border`: `#E8E4F0` (Borders & dividers)
     - `--surface`: `#FFFFFF` (Surface elevation)
     - `--soft-background`: `#F8F7FC` (Soft background)
     - `--success`: `#16A34A`, `--warning`: `#D97706`, `--error`: `#DC2626`
     - `--primary-gradient`: `linear-gradient(135deg, #6D3DF5, #4B24B8, #A78BFA)`
   - Smooth micro-animations: `@keyframes glowPulse`, `@keyframes pulseDot`, `@keyframes floatCard`.
   - Full responsive layout system with breakpoints for mobile, tablet, and widescreen monitors.

3. **`app.js`**:
   - **Fee Savings Calculator**: Dynamic interactive slider calculating monthly creator savings comparing YouTube Superchat (30% cut) with direct UPI (0-5% fee).
   - **OBS Live Alertbox Simulator**: Click-to-preview alert box that cycles through simulated viewer donations, amounts (₹200 to ₹2,500), and custom messages with smooth pulse feedback.
   - **Hero Tabs**: Instant toggle between "Streamers" and "Supporters" views.
   - **Mobile Menu**: Smooth hamburger drawer toggle with accessible `aria-expanded` attributes.
   - **FAQ Accordion**: Interactive expand/collapse functionality.

---

## 3. Programmatic Usage in Frontend / Next.js

Import asset configurations directly in TypeScript or JavaScript:

```typescript
import {
    PAYMENT_PROVIDERS,
    ALERT_ANIMATIONS,
    CREATOR_AVATARS,
    getAssetById,
    getProviderLogoPath
} from '@/assets';

// Example: Display supported UPI payment providers
export function ProviderLogos() {
    return (
        <div className="flex gap-4">
            {PAYMENT_PROVIDERS.map((provider) => (
                <div key={provider.id} className="provider-badge">
                    <img src={provider.rel_path} alt={provider.alt} width={48} height={48} />
                    <span>{provider.name}</span>
                </div>
            ))}
        </div>
    );
}
```

---

## 4. Verification & Integrity

All assets and code files have been verified for integrity:
- **MD5 Checksums**: Cataloged in [manifest.json](manifest.json).
- **Format Verification**: Magic bytes and file headers inspected and verified.
- **JavaScript Syntax**: Checked and passed using `node --check assets/code/app.js` and `node --check assets/index.js`.
- **HTML Integrity**: All 9 media paths verified; 0 remaining inline base64 blobs.
