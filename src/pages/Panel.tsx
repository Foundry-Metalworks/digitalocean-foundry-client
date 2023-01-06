import React, { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import network from '../util/network';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';
import { authWrapper } from '../util/auth';
import Loading from '../component/Loading';

const NAME = import.meta.env.VITE_NAME;
const FOUNDRY_URL = `https://${NAME}.t2pellet.me`;

function Panel(props: { token: string }) {
  const { token } = props;
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [serverStatus, setServerStatus] = useState('off');

  const getHelper = async (path: string) => {
    setExecuting(true);
    try {
      const result = await network.get(path, token);
      setExecuting(false);
      return result;
    } catch (e) {
      navigate('/error');
      throw e;
    }
  };

  const postHelper = async (path: string) => {
    setExecuting(true);
    try {
      return await network.post(path, token);
    } catch (e) {
      console.error(e);
      navigate('/error');
    }
    setExecuting(false);
  };

  const getIP = async () => {
    setExecuting(true);
    const controller = new AbortController();
    try {
      const id = setTimeout(async () => {
        controller.abort();
      }, 3000);
      await fetch(FOUNDRY_URL, {
        mode: 'no-cors',
        signal: controller.signal
      });
      clearTimeout(id);
      return FOUNDRY_URL;
    } catch (e) {
      const result = await getHelper('instance.ip');
      return result?.data.ip;
    }
  };

  useEffect(() => {
    getHelper('instance/status').then((result) => {
      setServerStatus(result?.data.status);
      setLoaded(true);
    });
  });

  if (loaded && !executing) {
    if (serverStatus == 'off') {
      return <Loading />;
    }
    const isDeleted = serverStatus == 'deleted';
    return (
      <Grid container spacing={2} columns={12} maxWidth="100%" justifyContent="center">
        <Grid xs={12} md={4}>
          <Button
            variant="contained"
            fullWidth
            onClick={async () => {
              const ip = await getIP();
              window.location.replace(ip);
            }}
            disabled={isDeleted}>
            Go to Server
          </Button>
        </Grid>
        <Grid xs={12} md={4}>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={async () => {
              await postHelper(`instance/${isDeleted ? 'start' : 'stop'}`);
              const newStatus = isDeleted ? 'active' : 'deleted';
              setServerStatus(newStatus);
            }}>
            {isDeleted ? 'Start Server' : 'Stop Server'}
          </Button>
        </Grid>
        <Grid xs={12} md={4}>
          <Button
            variant="outlined"
            fullWidth
            onClick={async () => {
              await postHelper('instance/save');
            }}
            disabled={isDeleted}>
            Save Server
          </Button>
        </Grid>
      </Grid>
    );
  } else return <Loading />;
}

function ConnectedPanel(): React.ReactElement {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [registered, setRegistered] = useState(false);
  const { isLoading, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessTokenSilently();
      setToken(token);
      return token;
    };
    if (!isLoading) {
      getToken()
        .catch(console.error)
        .then(async (result) => {
          const token = result as string;
          const registered = (await network.get('user/exists', token)).data;
          setRegistered(registered);
          setLoaded(true);
        });
    }
  }, [isLoading]);

  if (loaded && !registered) {
    navigate('/setup');
    return <Loading />;
  }

  return (
    <div className="Panel">
      <Stack spacing={4} justifyContent="center" alignItems="center">
        <img src="/logo192.png" alt="Foundry Logo" width="192" />
        {loaded ? <Panel token={token} /> : <Loading />}
      </Stack>
    </div>
  );
}

export default authWrapper(ConnectedPanel);
