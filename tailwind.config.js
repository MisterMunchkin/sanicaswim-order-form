const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    './next.config.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)']
      },
      colors: {
        'ss-blue': '#477287',
        'ss-pink': '#f7daef'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
