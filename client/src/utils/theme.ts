import { blue } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

/**
 * Main theme used everywhere
 * this override the default Material UI theme
 * see: https://material-ui.com/customization/default-theme/
 */
export const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: blue[600],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
    error: {
      main: '#ff485e',
    },
  },
});