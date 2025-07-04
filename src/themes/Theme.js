import { createTheme } from '@mui/material/styles';

// Custom Theme for MUI v5
const theme = createTheme({
  palette: {
    primary: {
      main: '#1C1C1E', // Soft Black
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00C49A', // Vibrant Teal
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F4F6F8', // Light Gray Background
      paper: '#FFFFFF', // White for Cards/Surface
    },
    text: {
      primary: '#333333', // Dark Gray for headings
      secondary: '#555555', // Lighter gray for subtext
    },
    success: {
      main: '#28A745', // Green for success indicators
    },
    error: {
      main: '#DC3545', // Red for errors
    },
    divider: '#E0E0E0', // Light gray divider
  },
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1rem',
      color: '#333333',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#555555',
    },
    button: {
      fontWeight: 600,
      textTransform: 'capitalize',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#1C1C1E', // Matches the new primary color
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

export default theme;
