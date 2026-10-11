import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F6F3EE',
        linen: '#EFE9DF',
        sand: '#E3DACC',
        ink: { DEFAULT: '#241B14', soft: '#6F675C' },
        bronze: { DEFAULT: '#E0A458', dark: '#C4863C', light: '#EDC58C', faint: '#F7EAD6' },
        cocoa: '#4A3421',
        clay: '#B4643C',
        moss: '#5F6B4A',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 50px -20px rgba(36, 27, 20, 0.25)',
        card: '0 6px 30px -12px rgba(36, 27, 20, 0.12)',
      },
      letterSpacing: {
        widest2: '0.22em',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out both',
      },
    },
  },
  plugins: [],
};
export default config;
