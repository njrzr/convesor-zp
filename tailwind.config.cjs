/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/*.vue",
    "src/components/*.vue"
  ],
  theme: {
    extend: {
      'fontFamily': {
        'poppins': 'Poppins'
      },
      'colors': {
        'royal': '#4169e1'
      },
      'backgroundImage': {
        'arrow': "url('/src/assets/arrow.png')"
      }
    },
  },
  plugins: [],
}
