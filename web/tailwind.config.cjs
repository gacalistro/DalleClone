/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        background: "#fafafc",
        green: {
          accent: "#0FA47F",
          dark: "#00897B",
        },
      },
      screens: {
        xs: "425px",
      },
    },
  },
  plugins: [],
};
