module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./index.html"
  ],
  important: '#root',
  theme: {
    extend: {
      fontFamily: {
        'quicksand':'Quicksand',
      },
      fontSize: {
        '32': '32px',
        '16': '16px',
        '14': '14px',
      },
      fontWeight: {
        '500': 500,
        '600': 600,
      },
      lineHeight: {
        'normal': 'normal',
        '40':'40px'
      },
      colors: {
        'custom': {
          'white': '#FFFFFF',
          'white4D': '#FFFFFF4D',
          'black1A': '#1A1A1A',
          'white08': '#FFFFFF08',
          'black0A33': '#0A0A0A33',
          'black1B': '#1B1B1B',
          'black1415': '#14151F',
          'blue5C': '#5C67DE',
          'white66': '#FFFFFF66',
          'white-transparent': 'rgba(255, 255, 255, 0.30)',
        },
      },
      width: {
        '832': '832px',
        '826': '826px',
        '822': '822px',
        '757': '757px',
        '210': '210px',
        '127': '127px',
        '98': '98px',
        '60': '60px',
        '50': '50px',
        '45': '45px',
        '30': '30px',
        '15': '15px',
        '11.25': '11.25px',
        '9.88': '9.88px',
      },
      height: {
        '280': '280px',
        '60': '60px',
        '50': '50px',
        '45': '45px',
        '30': '30px',
        '15': '15px',
      },
      flexShrink: {
        '0': 0,
      },
      borderRadius: {
        '15': '15px',
        '8':'8px',
        '71':'71px'
      },
      padding: {
        '30': '30px',
        '5': '5px',
        'custom': '14px 14px 19px 0',
        '3.75': '3.75px',
      },
      margin: {
        '42': '42px',
        '34': '34px',
    },
      spacing: {
        '7.5': '7.5px',
        '20': '20px',
        '705': '705px',
      },
      placeholderColor: {
        'white-transparent': 'rgba(255, 255, 255, 0.40)',
      },
      borderColor: {
        'transparent-white-03': 'rgba(255, 255, 255, 0.03)',
      },  
      letterSpacing: {
        'tightest': '-0.02em'
      },
      
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        'body': {
          background: `linear-gradient(0deg, rgba(10, 10, 10, 0.20) 0%, rgba(10, 10, 10, 0.20) 100%), linear-gradient(155deg, #1B1B1B 0%, #14151F 100%)`,
          maxWidth: '1512px',  
          height: '982px',
        },
        
      });
    },
  ],
}
