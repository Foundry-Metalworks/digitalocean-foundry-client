import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Auth0Provider } from '@auth0/auth0-react';
import './App.css';

const theme = createTheme({
  palette: { mode: 'dark' }
});

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="metalworks.us.auth0.com"
      clientId={import.meta.env.VITE_AUTH_CLIENT}
      audience={import.meta.env.VITE_AUTH_AUDIENCE}
      scope="read:current_user"
      redirectUri={`${window.location.origin}/panel`}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme>
          <App />
        </CssBaseline>
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
