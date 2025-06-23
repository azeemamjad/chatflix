// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './Pages/Register';
import Home from './Pages/Home';
import ProtectedRoutes from './ProtectedRoutes';
import Chat from './Pages/Chat';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          {/* Place protected routes here */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
