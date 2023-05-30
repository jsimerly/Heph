// const {company} = require('./constants/company_constants')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    mode: "jit",
    theme: {
      extend: {
        colors: {
          // https://mdigi.tools/darken-color/#faf3c5 to lighten
          primary: "#2b2b2a",
          primaryLight: "#8a8a8a",
          
          secondary: "#e03400",
          secondaryLight: "#e0613a",

          tertiary: '',
          tertiaryLight: '',

          neutralDark: "#2b2b2a",
          neutralLight: "#6e6e6d",
          neutralOffWhite: '#f7f7f7',

          errorRed: "#C76C63",
        },
        fontFamily: {
          roboto : ['Roboto', 'sans-serif'],
          londrina: ['Londrina Solid', 'sans-serif']
        },
      },
      screens: {
        xs: "480px",
        ss: "620px",
        sm: "768px",
        ms: "840px",
        md: "1060px",
        lg: "1280px",
        xl: "1700px",
      },
    },
    plugins: [
      require('@tailwindcss/line-clamp')
    ],
  };