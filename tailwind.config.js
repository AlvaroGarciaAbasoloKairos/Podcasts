module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', './index.html'],
  important: '#root',

  theme: {
    extend: {
      colors: {
        custom: {
          white: '#FFFFFF',
          black1A: '#1A1A1A',
          blue5C: '#5C67DE',
          whiteTransparent: 'rgba(255, 255, 255, 0.30)',
        },
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
      placeholderColor: {
        'white-transparent': 'rgba(255, 255, 255, 0.40)',
      },
         width: {
        832: '832px',
        831: '831px',
        822: '822px',
        757: '757px',
        419: '419px',
        277: '277px',
      },
      height: {
        280: '280px',
        80: '80px',
        60: '60px',
      },
      borderRadius: {
        71: '71px',
      },
      padding: {
        30: '30px',
      },
      margin: {
        59: '59px',
        42: '42px',
        34: '34px',
      },
      borderColor: {
        'transparent-white-03': 'rgba(255, 255, 255, 0.03)',
      },
      letterSpacing: {
        tightest: '-0.02em',
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        body: {
          background: `linear-gradient(0deg, rgba(10, 10, 10, 0.20) 0%, rgba(10, 10, 10, 0.20) 100%), linear-gradient(155deg, #1B1B1B 0%, #14151F 100%)`,
          maxWidth: '1512px',
          height: '982px',
        },
      });
    },
    function ({ addUtilities }) {
      const newUtilities = {
        '.hide-thumb': {
          '& .MuiSlider-thumb': {
            display: 'none',
          },
        },
      };
      addUtilities(newUtilities);
    },
    function ({ addUtilities }) {
      const newUtilities = {
        '.slider-white': {
          '& .MuiSlider-track': {
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
          },
          '& .MuiSlider-rail': {
            backgroundColor: '#FFFFFF4D',
            borderRadius: '10px',
          },
          '& .MuiSlider-thumb': {
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
          },
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
