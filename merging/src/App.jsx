import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import About from './pages/About';
import Support from './pages/Support';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <>
      <ThemeToggle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes wrapped in Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Chat />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
          <Route path="support" element={<Support />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
