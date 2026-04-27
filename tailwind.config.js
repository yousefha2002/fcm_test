/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        PRIMARY:"#18A0FB",
        SECONDARY:"#4FCCE9",
        BACKGROUND:"#ECF6F9",
        BORDER:"#C4C4C4"
      },
    },
  },
  plugins: [],
}

