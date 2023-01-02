import React from 'react';
import { Typography } from '@mui/material';

export default function Error(): React.ReactElement {
  return (
    <div className="Home">
      <img src="/logo192.png" alt="Foundry Logo" width="192" />
      <Typography variant="h1" color="red">
        The server name {import.meta.env.VITE_NAME} is taken or invalid
      </Typography>
      <Typography variant="h1" color="red">
        Please update the VITE_NAME .env variable
      </Typography>
    </div>
  );
}
