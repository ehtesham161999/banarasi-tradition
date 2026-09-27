/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#FDF2F5',
          100: '#FCE7EC',
          200: '#F8CFD9',
          300: '#F0A0B5',
          400: '#E07090',
          500: '#8B1E3F',
          600: '#7A1A37',
          700: '#69162F',
        },
        gold: {
          400: '#E5C76B',
          500: '#D4AF37',
          600: '#B8942E',
        },
        cream: {
          50: '#FDF8F3',
          100: '#FAF0E6',
          200: '#F5E6D3',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}