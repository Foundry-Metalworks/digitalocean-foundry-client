import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import network from '../util/network';
import { Button, CircularProgress, Stack, TextField } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

export default function Setup(): React.ReactElement {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [name, setName] = useState('');
  const [doToken, setDoToken] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await getAccessTokenSilently({ audience: import.meta.env.VITE_AUTH_AUDIENCE });
    await network.post('servers/', token, {
      name,
      doToken
    });
    await network.post('servers/user', token, {
      email: user?.email,
      server: name
    });
    navigate('/panel');
    console.log('finished setup');
  };

  if (isLoading) {
    return <CircularProgress size="4rem" />;
  } else if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="Setup">
      <img src="/logo192.png" alt="Foundry Logo" width="192" />
      <Stack component="form" onSubmit={handleSubmit}>
        <TextField label="Server Name" onChange={(e) => setName(e.target.value)} />
        <TextField label="DigitalOcean Token" onChange={(e) => setDoToken(e.target.value)} />
        <Button type="submit">Submit</Button>
      </Stack>
    </div>
  );
}
