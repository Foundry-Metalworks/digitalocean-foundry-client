import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Panel from './pages/Panel';
import Home from './pages/Home';
import Error from './pages/Error';
import Setup from './pages/Setup';

// TODO : Change interaction with backend to ONLY send tokens, backend will deal with getting email from auth0
// TODO : Logout functionality
// TODO : Invite people (guest, admin accs)
// TODO : Settings change

export default function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
