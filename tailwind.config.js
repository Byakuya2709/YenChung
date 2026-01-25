/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#75010C',
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#75010C',
          600: '#5A0109',
          700: '#3F0106',
          800: '#240104',
          900: '#450a0f',
        },
        accent: {
          DEFAULT: '#FC0',
          light: '#FFD966',
        },
      },
      backgroundImage: {
        'pattern-red':
          "url('/bg-red2.jpg')",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
}