/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    container: {
      center: true,
      padding: "16px",
      screens: {
        "2xl": "1248px",
      },
    },
    colors: {
      primary: "#FFBD59",
      secondary: "#FFD500",
      "gray-dark": "#403F3E",
      "gray-medium": "#CCCCCC",
      "gray-light": "#DEDEDE",
      desert: "#F7F6F5",
      black: "#1F1F1F",
      white: "#FFFFFF",
      success: "#42A162",
      danger: "#BA4444",
      warning: "#C28930",
      safe: "#307CC2",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      roboto: ["Roboto Serif", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};

