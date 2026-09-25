/**
 * Streamly Asset Catalog & Type Definitions
 * Reusable exports for payment providers, OBS alert animations,
 * creator avatars, and static design tokens.
 */

export interface AssetDimensions {
    width: number;
    height: number;
}

export interface BaseAsset {
    id: string;
    name: string;
    category: 'payment_providers' | 'alert_animations' | 'creator_avatars';
    rel_path: string;
    mime_type: string;
    alt: string;
    description: string;
    size_bytes: number;
    md5: string;
    dimensions: AssetDimensions | 'vector' | 'unknown';
}

export interface PaymentProviderAsset extends BaseAsset {
    category: 'payment_providers';
    supported_methods: string[];
}

export interface AlertAnimationAsset extends BaseAsset {
    category: 'alert_animations';
    loop: boolean;
}

export interface CreatorAvatarAsset extends BaseAsset {
    category: 'creator_avatars';
    handle: string;
}

export type StreamlyAsset = PaymentProviderAsset | AlertAnimationAsset | CreatorAvatarAsset;

/**
 * Payment Provider Logomarks
 */
export const PAYMENT_PROVIDERS: readonly PaymentProviderAsset[] = [
    {
        id: 'provider-amazon-pay',
        name: 'Amazon Pay',
        category: 'payment_providers',
        rel_path: 'images/providers/amazon-pay.svg',
        mime_type: 'image/svg+xml',
        alt: 'Amazon Pay Business',
        description: 'Official vector SVG logo for Amazon Pay UPI & Merchant acceptance.',
        supported_methods: ['UPI', 'Wallet', 'Merchant QR'],
        size_bytes: 8639,
        md5: '03e0b4c16f3706edb3f754b8fed35e5f',
        dimensions: 'vector'
    },
    {
        id: 'provider-google-pay',
        name: 'Google Pay Business',
        category: 'payment_providers',
        rel_path: 'images/providers/google-pay.webp',
        mime_type: 'image/webp',
        alt: 'Google Pay Business',
        description: 'High-fidelity WebP icon for Google Pay for Business direct bank settlements.',
        supported_methods: ['UPI', 'GPay Business API', 'Soundbox'],
        size_bytes: 7378,
        md5: '979c8e78cc7c166d070adc5ca204388f',
        dimensions: { width: 240, height: 240 }
    },
    {
        id: 'provider-paytm',
        name: 'Paytm for Business',
        category: 'payment_providers',
        rel_path: 'images/providers/paytm.webp',
        mime_type: 'image/webp',
        alt: 'Paytm Business',
        description: 'High-fidelity WebP icon for Paytm Merchant payments and instant bank transfer.',
        supported_methods: ['UPI', 'Paytm Merchant', 'All-in-One QR'],
        size_bytes: 7094,
        md5: '767d4c5f5a8f095a6600f741d958bccf',
        dimensions: { width: 240, height: 240 }
    },
    {
        id: 'provider-phonepe',
        name: 'PhonePe Business',
        category: 'payment_providers',
        rel_path: 'images/providers/phonepe.webp',
        mime_type: 'image/webp',
        alt: 'PhonePe Business',
        description: 'High-fidelity WebP icon for PhonePe for Business zero-fee direct UPI settlements.',
        supported_methods: ['UPI', 'PhonePe Merchant', 'Smart Speaker'],
        size_bytes: 2004,
        md5: '1e6989d6f795135e1f3da26efc4d206d',
        dimensions: { width: 240, height: 240 }
    },
    {
        id: 'provider-hdfc-smarthub',
        name: 'HDFC SmartHub Vyapar',
        category: 'payment_providers',
        rel_path: 'images/providers/hdfc-smarthub.webp',
        mime_type: 'image/webp',
        alt: 'HDFC SmartHub Vyapar',
        description: 'High-fidelity WebP icon for HDFC Bank SmartHub merchant UPI payments.',
        supported_methods: ['UPI', 'SmartHub Vyapar', 'Direct Bank Account'],
        size_bytes: 996,
        md5: 'ea60434dbcfa6a9b77e6d082873df8e7',
        dimensions: { width: 240, height: 240 }
    }
] as const;

/**
 * Alert Box Animations & Overlay Graphics
 */
export const ALERT_ANIMATIONS: readonly AlertAnimationAsset[] = [
    {
        id: 'alert-throwing-money',
        name: 'Throwing Money Animation',
        category: 'alert_animations',
        rel_path: 'images/alerts/throwing-money.gif',
        mime_type: 'image/gif',
        alt: 'Throwing Money Animation',
        description: 'Dynamic animated GIF overlay depicting raining cash banknotes, used in OBS live alertbox upon receiving viewer donations.',
        loop: true,
        size_bytes: 492834,
        md5: '9b744469d8f0530700c878de7e798d90',
        dimensions: { width: 480, height: 292 }
    }
] as const;

/**
 * Gaming Streamer & Supporter Avatars
 */
export const CREATOR_AVATARS: readonly CreatorAvatarAsset[] = [
    {
        id: 'creator-casetoo',
        name: 'Casetoo',
        category: 'creator_avatars',
        rel_path: 'images/creators/casetoo.jpg',
        mime_type: 'image/jpeg',
        alt: 'Casetoo Profile Avatar',
        description: 'Representative gaming streamer avatar for top earner leaderboard display.',
        handle: '@casetoo',
        size_bytes: 20747,
        md5: 'df191db1a22048f5757c28b2a4bd86ac',
        dimensions: { width: 511, height: 512 }
    },
    {
        id: 'creator-motato',
        name: 'Motato',
        category: 'creator_avatars',
        rel_path: 'images/creators/motato.png',
        mime_type: 'image/png',
        alt: 'Motato Profile Avatar',
        description: 'Representative gaming streamer avatar for weekly active tipper leaderboard display.',
        handle: '@motato',
        size_bytes: 20353,
        md5: 'df689d365c93a96b61a5006a8827b0ec',
        dimensions: { width: 96, height: 96 }
    },
    {
        id: 'creator-nakul-dhull',
        name: 'NAKUL DHULL',
        category: 'creator_avatars',
        rel_path: 'images/creators/nakul-dhull.png',
        mime_type: 'image/png',
        alt: 'NAKUL DHULL Profile Avatar',
        description: 'Representative gaming streamer avatar for community leaderboard display.',
        handle: '@nakul-dhull',
        size_bytes: 1475644,
        md5: 'a4ac0d136ec9db5353ead698734d0a93',
        dimensions: { width: 700, height: 1244 }
    }
] as const;

/**
 * All assets combined
 */
export const ALL_ASSETS: readonly StreamlyAsset[] = [
    ...PAYMENT_PROVIDERS,
    ...ALERT_ANIMATIONS,
    ...CREATOR_AVATARS
];

/**
 * Lookup helper by ID
 */
export function getAssetById(id: string): StreamlyAsset | undefined {
    return ALL_ASSETS.find((asset) => asset.id === id);
}

/**
 * Lookup payment provider logo path
 */
export function getProviderLogoPath(providerName: string): string | undefined {
    const normalized = providerName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const found = PAYMENT_PROVIDERS.find((p) =>
        p.id.toLowerCase().includes(normalized) || p.name.toLowerCase().includes(normalized)
    );
    return found?.rel_path;
}

// Re-export brand design tokens
export * from './tokens';

