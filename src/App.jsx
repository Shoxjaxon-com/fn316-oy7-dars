import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Details from './pages/Deteils';
import Login from './pages/Login';
import Register from './pages/Register';

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Tokenni localStorage'dan o'qiymiz

  if (!token) {
    navigate('/login');
    return null;
  }

  return children;
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/about" element={
          <PrivateRoute>
            <About />
          </PrivateRoute>
        } />
        <Route path="/details" element={
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
