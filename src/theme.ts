import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

// Elegant color palette
const colors = {
  primary: {
    main: '#2D3250', // Deep navy blue
    light: '#424769',
    dark: '#1B1F3B',
  },
  secondary: {
    main: '#F66B0E', // Vibrant orange
    light: '#FF8B3D',
    dark: '#D45500',
  },
  accent: {
    main: '#676F9D', // Muted blue-gray
    light: '#8891C1',
    dark: '#4C5275',
  },
  background: {
    light: '#FFFFFF',
    dark: '#121212',
    paper: {
      light: '#F8F9FA',
      dark: '#1E1E1E',
    },
  },
  text: {
    light: {
      primary: '#2D3250',
      secondary: '#676F9D',
    },
    dark: {
      primary: '#E8E9F3',
      secondary: '#B4B8D8',
    },
  },
};

const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
};

const lightTheme = createTheme(deepmerge(baseTheme, {
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          color: '#0f172a',
        },
      },
    },
  },
} as ThemeOptions));

const darkTheme = createTheme(deepmerge(baseTheme, {
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#60a5fa',
      light: '#93c5fd',
      dark: '#3b82f6',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0a0f1a',
      paper: '#1a2234',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 15, 26, 0.8)',
          color: '#f8fafc',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: '#242c3d',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03))',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
      },
    },
  },
} as ThemeOptions));

export const light = responsiveFontSizes(lightTheme);
export const dark = responsiveFontSizes(darkTheme); 