module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ofood_dark: {
          light: "#1A1A1A",
          yellow: "#F4C10B",
        },
      },
      backgroundImage: {
        'hero-pattern': "url('./asset/hero.jpg')",
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
