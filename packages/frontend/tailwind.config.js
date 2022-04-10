module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // colors: {
    //   transparent: 'transparent',
    //   primary: '#3FC3FA',
    //   secondary: '#F56CC1'
    // },
    extend: {
      backgroundSize: {
        '70p': '70%',
        '60p': '60%',
        '50p': '50%',
        '40p': '40%',
        '30p': '30%',
        'a-30p': 'auto 30%',
        'a-20p': 'auto 20%',
        'a-10p': 'auto 10%',
        'a-5p': 'auto 5%',
      },
      backgroundPosition: {
        'pb-30p': 'center bottom 30%',
        'pb-25p': 'center bottom 25%',
        'pb-20p': 'center bottom 20%',
        'pb-15p': 'center bottom 15%',
        'pb-10p': 'center bottom 10%',
        'pb-5p': 'center bottom 5%',
      },
      keyframes: {
        moveRight: {
          '0%': { 'background-position-x': '0px' },
          '100%': { 'background-position-x': '5000px' },
          // '50%': { 'background-position': '-300px 0' },
        },
        moveLeft: {
          '0%': { 'background-position-x': '0px' },
          '100%': { 'background-position-x': '-5000px' },
          // '50%': { 'background-position': '-300px 0' },
        }
      },
      animation: {
        moveRight: 'moveRight 80s linear infinite',
        moveLeft: 'moveLeft 80s linear infinite',
      },
      backgroundImage: {
        'bg-pattern': "url('/public/assets/bottom_image_bg.png')",
        'mountains': "url('/public/assets/montain.png')",
        'clouds': "url('/public/assets/clouds-small.png')"
      },
      colors: {
        theme: {
          '1': '#02313e',
          '2': '#03506f',
          '3': '#868f9b',
          '4': '#88a6b9',
          '5': '#d1cac8',
        },
        secondary: '#F56CC1',
        bg: '#80b0a4',
        border: '#121b2e'
      },

    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ],
}
