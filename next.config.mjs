/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/code/index.html',
            },
            {
                source: '/login.html',
                destination: '/code/login.html',
            },
        ];
    },
};

export default nextConfig;
