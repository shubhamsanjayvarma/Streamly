import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Streamly - Gaming Creator Monetization',
    description: "India's #1 Direct UPI Tipping & Alerts for Gaming Streamers | 0% Platform Fee",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className="min-h-screen bg-black text-white antialiased">
                {children}
            </body>
        </html>
    );
}
