/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "white-calm": "#F7F7F7",
        "gray-calm": "#EFEFEF",
        "cream-pale": "#D0D6B3",
        sage: "#AAAE7F",
        "army-green": "#545018",
      },
    },
  },
  plugins: [],
};
