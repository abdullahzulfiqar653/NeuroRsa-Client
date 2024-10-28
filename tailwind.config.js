import flowbite from "flowbite-react/tailwind"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        white: '#fff',
        'light-blue': '#ebf5fe',
        'dark-black': '#181a20',
        grey: '#b1b1b1',
        'dark-grey': '#717171',
        'light-grey': '#f7f7f7',
        primary: '#5183f4',
        dodgerblue: '#0075e1',
        gainsboro: {
          100: '#e6e6e6',
          200: '#dfdfdf',
        },
        gray: {
          100: '#7d7d7d',
          200: 'rgba(255, 255, 255, 0.58)',
        },
        darkslategray: {
          100: '#225068',
          200: '#0e3244',
          300: '#0f2e3f',
        },
        mediumturquoise: '#57cbcc',
        steelblue: '#449ece',
        'surface-text-gray-disabled': 'rgba(108, 132, 157, 0.32)',
      },
      spacing: {},
      borderRadius: {
        '11xl': '30px',
        xl: '20px',
        '31xl': '50px',
        '3xs': '10px',
        'borderradius-large': '8px',
      },
      fontSize: {
        base: '16px',
        xl: '20px',
        '3xl': '22px',
        xs: '12px',
        '29xl': '48px',
        'base-5': '16.5px',
        inherit: 'inherit',
      },
      screens: {
        lg: '1440px',
        md: '768px',
        sm: '600px',
        xs: '320px',
        mq400px: '400px',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [require('flowbite/plugin')],
};
