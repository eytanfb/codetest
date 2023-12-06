/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#F8F8F8',
        success: '#1BB588',
        danger: '#E91D25',
        warning: '#FDD213',
        header: {
          text: '#87D4F6',
          background: '#1E71B2',
        },
      }
    },
  },
  plugins: [],
  safeList: [
    'text-success',
  ],
}

