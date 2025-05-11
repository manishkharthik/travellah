// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./frontend/src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          customBlue: '#4c9bf1', // Custom blue
          customGray: '#b0b0b0', // Custom gray
        },
      },
    },
    plugins: [],
  }
