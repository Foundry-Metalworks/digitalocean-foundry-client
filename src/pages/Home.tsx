import React from 'react';
import { Button, Stack } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

export default function Home(): React.ReactElement {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="Home">
      <Stack>
        <img src="/logo192.png" alt="Foundry Logo" width="192" />
        <Button onClick={() => loginWithRedirect()}>Log In</Button>
      </Stack>
    </div>
  );
}
