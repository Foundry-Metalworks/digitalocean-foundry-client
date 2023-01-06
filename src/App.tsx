import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Panel from './pages/Panel';
import Home from './pages/Home';
import Error from './pages/Error';
import Setup from './pages/Setup';

// TODO : Logout functionality
// TODO : Error page
// TODO : Invite people (guest, admin accs)
// TODO : Settings change

export default function App(): React.ReactElement {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}
