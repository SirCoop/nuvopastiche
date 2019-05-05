import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Khula, sans-serif',
    useNextVariants: true,
  },
  overrides: {
    MuiAppBar: { // Name of the component / style sheet
      root: { // Name of the rule
        boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px', // CSS
      },
    },
  },
});

export default theme;
