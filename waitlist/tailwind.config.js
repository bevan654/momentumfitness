/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        surface: {
          0: '#07070A',
          1: '#0E0E13',
          2: '#15151C',
          3: '#1C1C26',
        },
        electric: '#4F6EF7',
        mint: '#34D399',
        coral: '#F97066',
        amber: '#FBBF24',
      },
    },
  },
  plugins: [],
};
