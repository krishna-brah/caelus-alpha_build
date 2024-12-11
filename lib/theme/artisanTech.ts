import { createTheme, alpha } from '@mui/material/styles';

export const getArtisanTechTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#9C27B0' : '#CE93D8',
      light: mode === 'light' ? '#E1BEE7' : '#F3E5F5',
      dark: mode === 'light' ? '#7B1FA2' : '#8E24AA',
      contrastText: mode === 'light' ? '#ffffff' : '#000000',
    },
    secondary: {
      main: mode === 'light' ? '#6A1B9A' : '#AB47BC',
      light: mode === 'light' ? '#9C4DCC' : '#CE93D8',
      dark: mode === 'light' ? '#38006B' : '#8E24AA',
      contrastText: mode === 'light' ? '#ffffff' : '#000000',
    },
    artisan: {
      highlight: mode === 'light' ? '#FFD700' : '#FFE57F',
      accent: mode === 'light' ? '#F06292' : '#F8BBD0',
      neutral: mode === 'light' ? '#F5F5F5' : '#424242',
      surface: mode === 'light' ? '#FFFFFF' : '#121212',
    },
    background: {
      default: mode === 'light' ? '#FAF7FD' : '#121212',
      paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
    },
    text: {
      primary: mode === 'light' ? '#2C1810' : '#FFFFFF',
      secondary: mode === 'light' ? '#665555' : '#B0B0B0',
    },
  },
  typography: {
    fontFamily: "'Space Grotesk', 'Inter', system-ui, -apple-system, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.02em',
      background: 'linear-gradient(135deg, #9C27B0 0%, #6A1B9A 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid',
          borderColor: 'rgba(156, 39, 176, 0.08)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px -8px rgba(156, 39, 176, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          padding: '10px 24px',
          fontSize: '0.95rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(156, 39, 176, 0.2)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #9C27B0 0%, #6A1B9A 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #AB47BC 0%, #7B1FA2 100%)',
          },
        },
        outlined: {
          borderColor: '#9C27B0',
          '&:hover': {
            borderColor: '#7B1FA2',
            backgroundColor: 'rgba(156, 39, 176, 0.04)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          height: 32,
          '&.tier-gold': {
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
            color: '#2C1810',
          },
          '&.tier-diamond': {
            background: 'linear-gradient(135deg, #B2EBF2 0%, #4DD0E1 100%)',
            color: '#006064',
          },
          '&.tier-cosmic': {
            background: 'linear-gradient(135deg, #9C27B0 0%, #6A1B9A 100%)',
            color: '#ffffff',
            boxShadow: '0 2px 8px rgba(156, 39, 176, 0.25)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          '&.glass': {
            backgroundColor: alpha('#FFFFFF', 0.8),
            backdropFilter: 'blur(8px)',
            border: '1px solid',
            borderColor: 'rgba(156, 39, 176, 0.08)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#9C27B0',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#9C27B0',
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '0.95rem',
          minWidth: 120,
          '&.Mui-selected': {
            color: '#9C27B0',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#F5F5F5',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#9C27B0',
            borderRadius: '4px',
          },
        },
      },
    },
  },
});