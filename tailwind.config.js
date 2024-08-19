/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust this according to your file structure
  ],
  theme: {
    container:{
      center: true,
      padding: '20px',
    },
    extend: {
        screens: {
          'xs': '400px',
        },
    },
  },
  plugins: [],
}
