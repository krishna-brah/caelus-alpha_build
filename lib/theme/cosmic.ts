import { createTheme } from '@mui/material/styles';

export const cosmicTheme = createTheme({
  palette: {
    primary: {
      main: '#1a237e', // Deep cosmic blue
      light: '#534bae',
      dark: '#000051',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7c4dff', // Cosmic purple
      light: '#b47cff',
      dark: '#3f1dcb',
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212', // Dark space background
      paper: 'rgba(255, 255, 255, 0.05)', // Slightly transparent panels
    },
    cosmic: {
      stardust: '#e0f7fa',
      nebula: '#b388ff',
      galaxy: '#311b92',
      void: '#000000',
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '0.2em',
      background: 'linear-gradient(45deg, #7c4dff 30%, #448aff 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '0.1em',
    },
    body1: {
      fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: '0.05em',
          background: 'linear-gradient(45deg, #7c4dff 30%, #448aff 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #5c3ddf 30%, #2470ff 90%)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          '&.tier-cosmic': {
            background: 'linear-gradient(45deg, #7c4dff 30%, #448aff 90%)',
            color: '#ffffff',
            animation: 'cosmic-glow 2s infinite',
          },
        },
      },
    },
  },
});