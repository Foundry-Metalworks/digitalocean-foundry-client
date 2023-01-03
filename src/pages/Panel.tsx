import React, { Component, ReactNode, useEffect, useState } from 'react';
import { Button, CircularProgress, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import network from '../util/network';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router';

const NAME = import.meta.env.VITE_NAME;
const FOUNDRY_URL = `https://${NAME}.t2pellet.me`;
const headers: Headers = new Headers({
  Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`
});

type Props = {
  token: string;
  name: string;
};

type State = {
  loaded: boolean;
  executing: boolean;
  serverStatus: string;
};

class Panel extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loaded: false,
      executing: false,
      serverStatus: 'off'
    };
  }

  private async getStatus() {
    const { token, name } = this.props;
    return (await network.get(`instance/${name}/status`, token)).data.status;
  }

  private async getIP() {
    const { token, name } = this.props;
    const controller = new AbortController();
    try {
      const id = setTimeout(async () => {
        controller.abort();
      }, 3000);
      await fetch(FOUNDRY_URL, {
        mode: 'no-cors',
        signal: controller.signal,
        headers
      });
      clearTimeout(id);
      return FOUNDRY_URL;
    } catch (e) {
      return (await network.get(`instance/${name}/ip`, token)).data.ip;
    }
  }

  private async startFoundry() {
    const { token, name } = this.props;
    this.setState({ executing: true });
    await network.post(`instance/${name}/start`, token);
    this.setState({ executing: false, serverStatus: 'active' });
  }

  private async stopFoundry() {
    const { token, name } = this.props;
    this.setState({ executing: true });
    await network.post(`instance/${name}/stop`, token);
    this.setState({ executing: false, serverStatus: 'deleted' });
  }

  private async saveFoundry() {
    const { token, name } = this.props;
    this.setState({ executing: true });
    await network.post(`instance/${name}/save`, token);
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
    const { name } = this.props;
    const { executing, serverStatus, loaded } = this.state;

    if (!name) {
      return <Navigate to="/setup" />;
    }

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

export default function ConnectedPanel(): React.ReactElement {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [loaded, setLoaded] = useState(false);
  const { isLoading, user, getAccessTokenSilently } = useAuth0();
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
          const email = user?.email as string;
          const name = (await network.get(`servers/user/${email}`, token)).data.server;
          setToken(token);
          setName(name);
          setLoaded(true);
        });
    }
  }, [isLoading]);

  return (
    <div className="App">
      <Stack spacing={4} justifyContent="center" alignItems="center">
        <img src="/logo192.png" alt="Foundry Logo" width="192" />
        {loaded ? <Panel token={token} name={name} /> : <CircularProgress size="4rem" />}
      </Stack>
    </div>
  );
}
