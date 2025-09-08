import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#09418c', // Moyla KothAI Blue
      light: '#1a5ba3',
      dark: '#06306a',
    },
    secondary: {
      main: '#48bc19', // Moyla KothAI Green
      light: '#5ccd2a',
      dark: '#3a9a15',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000, // Reduced from 4000ms to 3000ms (3 seconds)
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#48bc19',
              },
            },
            error: {
              style: {
                background: '#d32f2f',
              },
            },
          }}
        />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
