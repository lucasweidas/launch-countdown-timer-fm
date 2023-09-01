import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          400: 'hsl(237, 18%, 59%)',
          700: 'hsl(236, 21%, 26%)',
          850: 'hsl(235, 16%, 14%)',
          900: 'hsl(234, 17%, 12%)',
        },
        rose: {
          300: 'hsl(345, 95%, 68%)',
        },
      },
      backgroundImage: {
        hero: 'url("/images/bg-stars.svg"), url("/images/pattern-hills.svg"), linear-gradient(to bottom, #1A1823, #211A29, #2F2439)',
      },
      backgroundPosition: {
        'hero-pos': 'top center, bottom center',
      },
      backgroundSize: {
        'hero-size': '100% auto, 100% auto',
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
};
export default config;
