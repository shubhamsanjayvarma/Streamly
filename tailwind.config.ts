import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-purple': '#6D3DF5',
        'deep-purple': '#4B24B8',
        'lavender': '#A78BFA',
        'soft-lavender': '#F3F0FF',
        'primary-text': '#17151D',
        'secondary-text': '#6B6875',
        'border-custom': '#E8E4F0',
        'soft-bg': '#F8F7FC',
        'success-custom': '#16A34A',
        'warning-custom': '#D97706',
        'error-custom': '#DC2626',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        successPulse: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)', backgroundColor: '#16A34A' },
          '100%': { transform: 'scale(1)', backgroundColor: '#16A34A' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        success: 'successPulse 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
