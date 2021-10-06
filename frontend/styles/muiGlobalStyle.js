import red from '@material-ui/core/colors/red'
import { createTheme } from '@material-ui/core'

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: "'Rubik', sans-serif",
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
        fontWeight: 800,
        fontSize: '15px',
      },
    },
    MuiTextField: {
      root: {
        // [`& fieldset`]: {
        //   borderRadius: '30px',
        // },
      },
    },
    MuiStepper: {},
    MuiStepIcon: {
      root: {
        color: 'rgba(0, 0, 0, 0.38)',
        '&$active': {
          color: '#DA3D1A',
        },
        '&$completed': {
          color: '#DA3D1A',
        },
      },
      active: {
        color: '#DA3D1A',
      },
      completed: {
        color: '#DA3D1A',
      },
    },
  },
  palette: {
    primary: {
      main: '#353535',
    },
    secondary: {
      main: '#353535',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: 'white',
    },
  },
})

export default theme