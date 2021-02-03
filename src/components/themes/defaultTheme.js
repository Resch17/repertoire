import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles/';

export const defaultTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#dbedf3',
      contrastText: '#f73859',
    },
    secondary: {
      main: '#f73859',
      contrastText: '#dbedf3',
    },
    text: {
      primary: '#dbedf3',
    },
    background: {
      default: '#283149',
      paper: '#404b69',
    },
  },
  typography: {
    fontFamily: '"Acme", sans-serif',
    h1: {
      fontFamily: '"Carter One", cursive',
    },
    h2: {
      fontFamily: '"Carter One", cursive',
    },
    h3: {
      fontFamily: '"Carter One", cursive',
    },
    h4: {
      fontFamily: '"Carter One", cursive',
    },
    h5: {
      fontFamily: '"Carter One", cursive',
    },
    h6: {
      fontFamily: '"Carter One", cursive',
    },
    button: {
      fontFamily: '"Carter One", cursive',
    },
  },
});
