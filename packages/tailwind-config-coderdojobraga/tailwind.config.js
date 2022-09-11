/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#722ED1",
        dark: "#343434",
        orange: "#ed684aff",
        white: "#ffffff",
        altdark: "#262626",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
