import React from 'react';
import { Button, Stack } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../component/Loading';
import { useNavigate } from 'react-router';

export default function Home(): React.ReactElement {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    navigate('/panel');
    return <Loading />;
  }

  return (
    <div className="Home">
      <Stack>
        <img src="/logo192.png" alt="Foundry Logo" width="192" />
        <Button onClick={() => loginWithRedirect({ appState: { returnTo: 'panel' } })}>
          Log In
        </Button>
        <Button
          onClick={() =>
            loginWithRedirect({ appState: { returnTo: 'setup' }, screen_hint: 'signup' })
          }>
          Sign Up
        </Button>
      </Stack>
    </div>
  );
}
