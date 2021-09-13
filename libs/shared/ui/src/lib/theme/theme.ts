import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import 'styled-components';
import './createMuiTheme';

const CabritoFontFamily = ['cabrito-normal', 'Times New Roman', 'serif'].join(',');
const PTSansFontFamily = ['pt-sans', 'Arial', 'sans-serif'].join(',');
const DancingScriptFontFamily = ['Dancing Script', 'cursive'].join(',');
const defaultTransition = 'all .25s linear';
const defaultBorderRadius = '.5rem';
const defaultBoxShadow = '0 0 .5rem 0 rgba(0,0,0,.1)';

const theme = createMuiTheme({
  name: 'Main Theme',
  palette: {
    primary: {
      main: '#D9023A',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#EF8C3F',
      contrastText: '#FFF',
    },
    text: {
      primary: '#3A3A3A',
    },
    green: {
      main: '#1ABE4C',
      light: '#53CE78',
    },
    turquoise: {
      main: '#00ABA6',
    },
    grey: {
      100: '#F7F7F7',
      200: '#EDEDED',
      300: '#D0D0D0',
      400: '#CECECE',
      500: '#BEBEBE',
      600: '#ACACAC',
      700: '#9A9A9A',
      800: '#3A3A3A',
      900: '#161616',
      A100: '#F1F9F8',
      A200: '#DFF0EF',
      A400: '#AED6D4',
    },
    background: {
      dashboard: '#F0F3F5',
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: CabritoFontFamily,
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.2rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1.6rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '1.6rem',
      fontWeight: 400,
    },
  },
  props: {
    MuiPaper: {
      elevation: 0,
    },
  },
  overrides: {
    MuiPaper: {
      elevation0: {
        boxShadow: '0 0 10px 0 rgba(0,0,0,.05)',
      },
    },
    MuiSnackbar: {
      root: {
        fontSize: '2.4rem',
        fontFamily: CabritoFontFamily,
      },
    },
    MuiSnackbarContent: {
      root: {
        fontSize: '2.4rem',
        fontFamily: CabritoFontFamily,
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: '1.4rem',
        fontFamily: PTSansFontFamily,
        minWidth: '20rem',
      },
    },
    MuiSlider: {
      valueLabel: { left: '-0.7rem' },
    },
    MuiAccordion: {
      root: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&:before': {
          display: 'none',
        },
        '&$expanded': {
          margin: 'auto',
        },
      },
      expanded: {},
    },
  },
  breakpoints: {
    values: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1600,
      xl: 1920,
      offCanvas: 1040,
      proDashboard: 900,
    },
  },
  config: {
    fonts: {
      Cabrito: CabritoFontFamily,
      PTSans: PTSansFontFamily,
      DancingScript: DancingScriptFontFamily,
    },
    defaultTransition,
    defaultBorderRadius,
    defaultBoxShadow,
    gradients: {
      default: 'linear-gradient(to right, #D9023A 0%,#EF8C3F 100%)',
      rotated: 'linear-gradient(135deg, #D9023A 0%, #EF8C3F 100%)',
      vertical: 'linear-gradient(to bottom, #D9023A 0%, #EF8C3F 100%)',
      verticalReverted: 'linear-gradient(to top, #D9023A 0%, #EF8C3F 100%)',
      green: 'linear-gradient(to right, #007979 0%,#2EDB62 100%)',
      orange: 'linear-gradient(to right, #ED4A0E 0%,#FFBA00 100%)',
      red: 'linear-gradient(to right, #D9023A 0%,#E96137 100%)',
      turquoise: 'linear-gradient(to right, #004587 0%,#199D95 100%)',
    },
    ratings: {
      green: '#1ABE4C',
      lightGreen: '#9FE3B3',
      orange: '#EF8C3F',
      red: '#D9023A',
      lightRed: '#FF9D90',
    },
  },
});

export default theme;
