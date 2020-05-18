import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#0075f2',
    },
    light: {
      main: '#ffffff',
    },
  },
  typography: {
    useNextVariants: true,
    color: '#000000',
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});
