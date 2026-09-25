/**
 * Streamly Official Brand Design Tokens
 * Canonical color palette, typography, and surface tokens.
 */

export const BRAND_COLORS = {
    // Brand Purples
    primaryPurple: '#6D3DF5',
    deepPurple: '#4B24B8',
    lavender: '#A78BFA',
    softLavender: '#F3F0FF',

    // Neutrals & Surfaces
    primaryText: '#17151D',
    secondaryText: '#6B6875',
    border: '#E8E4F0',
    surface: '#FFFFFF',
    softBackground: '#F8F7FC',

    // Feedback & Semantic
    success: '#16A34A',
    warning: '#D97706',
    error: '#DC2626'
} as const;

export type BrandColorKey = keyof typeof BRAND_COLORS;

export const TYPOGRAPHY = {
    display: "'Plus Jakarta Sans', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif"
} as const;

export const BORDER_RADIUS = {
    sm: '8px',
    md: '14px',
    lg: '22px',
    full: '9999px'
} as const;

export const BRAND_ASSETS = {
    logoDark: 'images/brand/streamly-logo-dark.jpg',
    logoLight: 'images/brand/streamly-logo-light.jpg',
    logoBanner: 'images/brand/streamly-logo-banner.jpg',
    logoBannerLight: 'images/brand/streamly-logo-banner-light.jpg',
    iconMark: 'images/brand/streamly-icon.png',
    favicon: 'images/brand/favicon-32x32.png',
} as const;

export const DESIGN_TOKENS = {
    colors: BRAND_COLORS,
    typography: TYPOGRAPHY,
    borderRadius: BORDER_RADIUS,
    assets: BRAND_ASSETS,
} as const;
