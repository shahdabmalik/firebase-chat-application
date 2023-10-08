/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/**/*.jsx",
    "./src/**/**/**/*.jsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: "'Nunito', sans-serif",
        inter: "'Inter', sans-serif"
      }
    },
  },
  plugins: [],
}

