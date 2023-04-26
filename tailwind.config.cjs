/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/Home.jsx",
  ],
  theme: {
    extend: {
      colors: {
        "facebook": "#4267B2",
      }
    },
  },
  plugins: [],
}