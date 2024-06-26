/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/*.{js,jsx,ts,tsx}',
    './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pt_sans_arrow: ["PT Sans Narrow", "sans-serif"],
        pt_sans: ["PT Sans", "sans-serif"]
      },
      colors: {
        primary: '#10B981',
        secondary: '#072922'
      }
    },
  },
  plugins: [],
}

