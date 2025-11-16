import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF8F3',
          100: '#F2E8CF',
          200: '#EBE0C3',
        },
        sage: {
          50: '#F5FAF0',
          100: '#E8F4DC',
          200: '#D4EBBB',
          300: '#C0E39A',
          400: '#A7C957',
        },
        olive: {
          500: '#6A994E',
          600: '#5A8442',
          700: '#4A6F36',
        },
        forest: {
          800: '#4A7C52',
          900: '#386641',
        },
        accent: {
          50: '#F9E8E9',
          100: '#F4D1D2',
          200: '#E9A3A5',
          500: '#BC4749',
          600: '#A33D3F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};

export default config;
