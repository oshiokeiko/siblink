/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      animation: {
        stretch: 'stretch 1.6s ease-in-out infinite',
      },
      keyframes: {
        stretch: {
          '0%':   { height: '0px',  opacity: '1' },
          '60%':  { height: '60px', opacity: '1' },
          '100%': { height: '60px', opacity: '0' },
        },
      },
    },
  },
}
