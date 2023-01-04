import React, { Component, ReactNode, useEffect, useState } from 'react';
import { Button, CircularProgress, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import network from '../util/network';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';
import { authWrapper } from '../util/auth';

const NAME = import.meta.env.VITE_NAME;
const FOUNDRY_URL = `https://${NAME}.t2pellet.me`;

type State = {
  loaded: boolean;
  executing: boolean;
  serverStatus: string;
};

class Panel extends Component<{ token: string }, State> {
  constructor(props: { token: string }) {
    super(props);
    this.state = {
      loaded: false,
      executing: false,
      serverStatus: 'off'
    };
  }

  private async getStatus() {
    const { token } = this.props;
    return (await network.get('instance/status', token)).data.status;
  }

  private async getIP() {
    const { token } = this.props;
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
      return (await network.get('instance/ip', token)).data.ip;
    }
  }

  private async startFoundry() {
    const { token } = this.props;
    this.setState({ executing: true });
    await network.post('instance/start', token);
    this.setState({ executing: false, serverStatus: 'active' });
  }

  private async stopFoundry() {
    const { token } = this.props;
    this.setState({ executing: true });
    await network.post('instance/stop', token);
    this.setState({ executing: false, serverStatus: 'deleted' });
  }

  private async saveFoundry() {
    const { token } = this.props;
    this.setState({ executing: true });
    await network.post('instance/save', token);
    this.setState({ executing: false });
  }

  private async goToFoundry() {
    this.setState({ executing: true });
    const ip = await this.getIP();
    window.location.replace(ip);
  }

  async componentDidMount(): Promise<void> {
    const serverStatus = await this.getStatus();
    this.setState({ loaded: true, serverStatus });
  }

  render(): ReactNode {
    const { executing, serverStatus, loaded } = this.state;

    if (loaded && !executing) {
      if (serverStatus === 'active') {
        return this.renderActive();
      } else if (serverStatus === 'deleted') {
        return this.renderOff();
      } else {
        return this.renderLoading();
      }
    } else {
      return this.renderLoading();
    }
  }

  renderActive(): ReactNode {
    return (
      <Grid container spacing={2} columns={12} maxWidth="100%" justifyContent="center">
        <Grid xs={12} md={4}>
          <Button variant="contained" fullWidth onClick={this.goToFoundry.bind(this)}>
            Go to Server
          </Button>
        </Grid>
        <Grid xs={12} md={4}>
          <Button variant="outlined" fullWidth onClick={this.saveFoundry.bind(this)}>
            Save Server
          </Button>
        </Grid>
        <Grid xs={12} md={4}>
          <Button variant="outlined" color="error" fullWidth onClick={this.stopFoundry.bind(this)}>
            Stop Server
          </Button>
        </Grid>
      </Grid>
    );
  }

  renderOff(): ReactNode {
    return (
      <Button variant="contained" onClick={this.startFoundry.bind(this)}>
        Start Server
      </Button>
    );
  }

  renderLoading(): ReactNode {
    return <CircularProgress size="4rem" />;
  }
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
    return <CircularProgress size="4rem" />;
  }

  return (
    <div className="App">
      <Stack spacing={4} justifyContent="center" alignItems="center">
        <img src="/logo192.png" alt="Foundry Logo" width="192" />
        {loaded ? <Panel token={token} /> : <CircularProgress size="4rem" />}
      </Stack>
    </div>
  );
}

export default authWrapper(ConnectedPanel);
