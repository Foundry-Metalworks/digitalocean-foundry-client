import React, { ReactNode } from 'react';
import { Button, CircularProgress, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const ORCHESTRATOR_URL = import.meta.env.ORCHESTRATOR_URL;
const FOUNDRY_URL = import.meta.env.FOUNDRY_URL;
const getUrl = (path: string) => ORCHESTRATOR_URL + `/api/${path}`;

type State = {
  loaded: boolean;
  executing: boolean;
  serverStatus: string;
};

type Props = {};

class App extends React.Component<Props, State> {
  constructor(props: never) {
    super(props);
    this.state = {
      loaded: false,
      executing: false,
      serverStatus: 'off'
    };
  }

  private async getStatus() {
    const result = await fetch(getUrl('status'));
    return await result.json();
  }

  private async getIP() {
    try {
      const controller = new AbortController();
      const id = setTimeout(async () => {
        controller.abort();
      }, 3000);
      await fetch(FOUNDRY_URL, { mode: 'no-cors', signal: controller.signal });
      clearTimeout(id);
      return FOUNDRY_URL;
    } catch (e) {
      const result = await fetch(getUrl('ip'));
      const ip = (await result.json()).ip;
      return `http://${ip}:30000`;
    }
  }

  private async startFoundry() {
    this.setState({ executing: true });
    const options = {
      method: 'POST'
    };
    await fetch(getUrl('start'), options);
    this.setState({ executing: false, serverStatus: 'active' });
  }

  private async stopFoundry() {
    this.setState({ executing: true });
    const options = {
      method: 'POST'
    };
    await fetch(getUrl('stop'), options);
    this.setState({ executing: false });
  }

  private async saveFoundry() {
    this.setState({ executing: true });
    const options = {
      method: 'POST'
    };
    await fetch(getUrl('save'), options);
    this.setState({ executing: false });
  }

  private async goToFoundry() {
    this.setState({ executing: true });
    const ip = await this.getIP();
    window.location.replace(ip);
  }

  async componentDidMount(): Promise<void> {
    const statusResponse = await this.getStatus();
    this.setState({ loaded: true, serverStatus: statusResponse.status });
  }

  render(): ReactNode {
    const { loaded, executing, serverStatus } = this.state;

    console.log('Loaded: ' + loaded);
    console.log('Status: ' + serverStatus);

    let body;
    if (loaded && !executing) {
      if (serverStatus === 'active') {
        body = this.renderActive();
      } else if (serverStatus === 'deleted') {
        body = this.renderOff();
      } else {
        body = this.renderLoading();
      }
    } else {
      body = this.renderLoading();
    }

    return (
      <div className="App">
        <Stack spacing={4} justifyContent="center" alignItems="center">
          <img src="/logo192.png" alt="Foundry Logo" width="192" />
          {body}
        </Stack>
      </div>
    );
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

export default App;
