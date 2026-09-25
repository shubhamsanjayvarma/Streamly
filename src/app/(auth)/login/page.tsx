'use client';
import React from 'react';
import LoginPage from '@/components/ui/gaming-login';

export default function LoginRoute() {
    const handleLogin = (email: string, password: string, remember: boolean) => {
        console.log('Streamly Login Attempt:', { email, password, remember });
    };

    return (
        <main className="relative min-h-screen w-full flex items-center justify-center px-4 py-12 bg-black">
            <LoginPage.VideoBackground videoUrl="https://cdn.21st.dev/assets/mirror/38/38f6c913209f4092ea0643267302c0b4873f6aeb56deeb59ead88c794340e84d.mp4" />

            <div className="relative z-20 w-full max-w-md animate-fadeIn">
                <LoginPage.LoginForm onSubmit={handleLogin} />
            </div>

            <footer className="absolute bottom-4 left-0 right-0 text-center text-white/60 text-sm z-20">
                © 2026 Streamly. All rights reserved. Live Gaming Creator Monetization.
            </footer>
        </main>
    );
}
