/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2fcf5',
          100: '#e1f8e8',
          200: '#c3ecd0',
          300: '#94dba9',
          400: '#5cc17a',
          500: '#34a558',
          600: '#238442',
          700: '#1e6836',
          800: '#1b532e', // Deep Forest Green (Main Brand)
          900: '#174428',
          950: '#0b2615',
        },
        earth: {
          50: '#fbf9f6',
          100: '#f5f0e8',
          200: '#ece3d4', // Sand / Cream
          300: '#dfceb0',
          400: '#ceb389',
          500: '#be9968', // Terracotta-ish Gold
          600: '#a67f51',
          700: '#856341',
          800: '#6d5138',
          900: '#594435',
          950: '#30231a',
        },
        surface: {
          50: '#ffffff',
          100: '#fafaf9', // Warm off-white
          200: '#f5f5f4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
