/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    container: {
      center: true,
      padding: '16px',
      screens: {
        '2xl': '1240px'
      }
    },
    colors: {
      'primary': '#205926',
      'secondary': '#FFD500',
      'gray-dark': '#403F3E',
      'gray-medium': '#CCCCCC',
      'gray-light': '#DEDEDE',
      'desert': '#F7F6F5',
      'black': '#1F1F1F',
      'white': '#FFFFFF',
      'danger': '#e74c3c',
    },
    extend: {},
  },
  plugins: [],
}

