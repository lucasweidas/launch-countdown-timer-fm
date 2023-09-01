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
        stars: 'url("/images/bg-stars.svg")',
        'pattern-hills': 'url("/images/pattern-hills.svg")',
      },
    },
  },
  plugins: [],
};
export default config;
