import React, { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';
import { AppState, Auth0Provider } from '@auth0/auth0-react';

export default function AuthProvider(props: PropsWithChildren): React.ReactElement {
  const navigate = useNavigate();
  const { children } = props;

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH_DOMAIN}
      clientId={import.meta.env.VITE_AUTH_CLIENT}
      audience={import.meta.env.VITE_AUTH_AUDIENCE}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
      scope="read:current_user">
      {children}
    </Auth0Provider>
  );
}
