const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      black: colors.black,
      gray: colors.coolGray,
      white: colors.white,
      indigo: colors.indigo,
      pink: colors.pink
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
