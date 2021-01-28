const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      inset: {
        '1/5': '20%',
        '1/6': '16.666667%',
        '1/8': '12.5%'
      },
      colors: {
        gray: colors.blueGray
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
