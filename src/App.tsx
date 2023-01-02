import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './pages/LogIn';
import Panel from './pages/Panel';
import Home from './pages/Home';
import Error from './pages/Error';

export default function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
