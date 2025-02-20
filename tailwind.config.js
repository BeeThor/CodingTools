/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red-dot': '#ff5f56',
        'yellow-dot': '#ffbd2e',
        'green-dot': '#27c93f',
      }
    },
  },
  plugins: [],
} 