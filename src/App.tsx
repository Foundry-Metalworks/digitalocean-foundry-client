import React, { ReactNode } from 'react';
import './App.css';

const ORCHESTRATOR_URL = 'https://dnd-orchestrator.t2pellet.me';
const FOUNDRY_URL = 'https://foundry.t2pellet.me';
const getUrl = (path: string) => ORCHESTRATOR_URL + `/api/${path}`;

type State = {
  loaded: boolean;
  serverStatus: string;
  serverIP: string;
};

type Props = {};

class App extends React.Component<Props, State> {
  constructor(props: never) {
    super(props);
    this.state = {
      loaded: false,
      serverStatus: 'off',
      serverIP: FOUNDRY_URL
    };
  }

  private async getStatus() {
    const result = await fetch(getUrl('status'));
    return await result.json();
  }

  private async getIP() {
    let url = FOUNDRY_URL;
    try {
      const controller = new AbortController();
      const id = setTimeout(async () => {
        controller.abort();
      }, 3000);
      await fetch(FOUNDRY_URL, { mode: 'no-cors', signal: controller.signal });
      clearTimeout(id);
    } catch (e) {
      const result = await fetch(getUrl('ip'));
      const ip = (await result.json()).ip;
      url = `http://${ip}:30000`;
    }
    return url;
  }

  private async startFoundry() {
    const options = {
      method: 'POST'
    };
    await fetch(getUrl('start'), options);
  }

  async componentDidMount(): Promise<void> {
    let statusResponse = await this.getStatus();
    if (statusResponse.status === 'deleted') {
      this.setState({ loaded: true, serverStatus: statusResponse.status });
      await this.startFoundry();
      statusResponse = await this.getStatus();
    }
    const serverIP = await this.getIP();
    this.setState({ loaded: true, serverStatus: statusResponse.status, serverIP });
  }

  render(): ReactNode {
    const { loaded, serverStatus, serverIP } = this.state;

    console.log('Loaded: ' + loaded);
    console.log('Status: ' + serverStatus);
    console.log('IP: ' + serverIP);

    if (loaded) {
      if (serverStatus === 'active') {
        window.location.replace(serverIP);
        return (
          <div className="App">
            <p>Redirecting...</p>
          </div>
        );
      }
      return (
        <div className="App">
          <p>Server is Starting...</p>
        </div>
      );
    } else {
      return (
        <div className="App">
          <p>Loading...</p>
        </div>
      );
    }
  }
}

export default App;
