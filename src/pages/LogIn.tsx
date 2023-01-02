import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { setCookie } from 'typescript-cookie';
import { useNavigate } from 'react-router';

export default function LogIn(): React.ReactElement {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCookie('PASSWORD', password);
    navigate('/panel');
  }

  return (
    <div className="Register">
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Password"
          type="password"
          helperText="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" />
      </Box>
    </div>
  );
}
