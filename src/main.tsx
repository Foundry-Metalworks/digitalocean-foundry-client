import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './component/AuthProvider';

const theme = createTheme({
  palette: { mode: 'dark' }
});
const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <CssBaseline enableColorScheme>
            <App />
          </CssBaseline>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
