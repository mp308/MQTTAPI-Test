/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
        mitr: ['Mitr','sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
        noto: ['Noto Sans Thai Looped', 'sans-serif'],
        embed: ['Permanent Marker', 'sans-serif']
      },
    },
  },
  plugins: [],
}

