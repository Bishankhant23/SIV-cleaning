import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#083863',
          'navy-dark': '#05233e',
          'navy-light': '#0f4f8a',
          cyan: '#00acea',
          'cyan-hover': '#0095cb',
          teal: '#00efd1',
          gold: '#fedb41',
          'gold-hover': '#e5c425',
          slate: '#1e293b',
          muted: '#64748b',
          light: '#f8fafc',
          card: '#ffffff'
        }
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'sans-serif'],
        heading: ['var(--font-heebo)', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 10px 30px -10px rgba(8, 56, 99, 0.15)',
        'brand-lg': '0 20px 40px -15px rgba(8, 56, 99, 0.25)',
      }
    },
  },
  plugins: [],
};

export default config;
