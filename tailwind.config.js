/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,tsx}'],
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'finance-green': '#2e7d32',
        'finance-red': '#e53935',
      },
    },
  },
  plugins: [],
};
