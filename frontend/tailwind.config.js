/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8b5b29',
        'secondary': '#a67c4d',
        'tertiary': '#4b3d2d',
        'background': '#e3d4b9',
      }
    },
  },
  plugins: [],
}