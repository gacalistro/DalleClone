/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        regular: "Inter_400Regular",
        medium: "Inter_500Medium",
        semibold: "Inter_600SemiBold",
        bold: "Inter_700Bold",
      },
    },
  },
  plugins: [],
};
