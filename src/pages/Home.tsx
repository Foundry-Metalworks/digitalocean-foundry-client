import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const ORCHESTRATOR_URL = 'https://dnd-orchestrator.t2pellet.me';
const getApiUrl = (path: string) => ORCHESTRATOR_URL + `/api/${path}`;
const headers: Headers = new Headers({
  Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`
});

export default function Home(): React.ReactElement {
  const navigate = useNavigate();
  const checkExists = async () => {
    const result = await fetch(getApiUrl(import.meta.env.VITE_NAME), { headers });
    const value = await result.json();
    return value.exists;
  };

  useEffect(() => {
    checkExists()
      .catch((reason) => {
        console.error(reason);
        navigate('/error');
      })
      .then((exists) => {
        if (!exists) {
          navigate('/login');
        } else {
          console.error('name taken. Change VITE_NAME variable');
          navigate('/error');
        }
      });
  }, [navigate]);

  return (
    <div className="Home">
      <img src="/logo192.png" alt="Foundry Logo" width="192" />
    </div>
  );
}
