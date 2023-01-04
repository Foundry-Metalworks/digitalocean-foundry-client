import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Auth0Provider } from '@auth0/auth0-react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './component/AuthProvider';

const theme = createTheme({
  palette: { mode: 'dark' }
});

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH_DOMAIN}
      clientId={import.meta.env.VITE_AUTH_CLIENT}
      audience={import.meta.env.VITE_AUTH_AUDIENCE}
      useRefreshTokens
      cacheLocation="localstorage"
      scope="read:current_user"
      redirectUri={`${window.location.origin}/panel`}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <CssBaseline enableColorScheme>
              <App />
            </CssBaseline>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
