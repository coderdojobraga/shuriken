module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./landing/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#722ED1",
        dark: "#343434",
        orange: "#ed684aff",
      },
      backgroundImage: () => ({
        "yin-yang-curve": "url('/img/bg-yin-yang-curve.png')",
        "yin-yang-curve-xl": "url('/img/bg-yin-yang-curve-xl.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
