/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          mont: ['Montserrat', 'sans-serif'],
        },
        fontSize: {
          '5/2xl': '3.2rem',
          '4/5xl': '2.5rem',
          '3xl': '1.975rem'
        },
        textColor: {
          'lead': '#9DA5AF',
          'lead-dark': '#565973',
          'salad': '#B1C909',
        },
        backgroundImage: {
          'grad': 'linear-gradient(220deg, #8910a7 0%, #4349c5 100%)',
          'hovergrad': 'linear-gradient(220deg, #4349c5 0%, #b113d8 100%)'
        },
        backgroundColor: {
          'light': '#f3f6ff',
          'salad': '#B1C909',
          'over': '#0a1f3896',
          'modal': '#1B2F46',
          'dark-middle': '#1B2F46'
        },
        borderColor: {
          'btnsec': 'rgb(255 255 255 / 25%)'
        },
        borderWidth: {
          '1': '1px'
        }
      },
    },
  }
  
  