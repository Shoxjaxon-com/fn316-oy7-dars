import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Details from './pages/Deteils';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  const naviget = useNavigate()

  function PrivateRoute(isAuth,children){

    if(!isAuth){
      naviget('/login')
    }

    return children
  }

  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/' element={<PrivateRoute>
          <Home />
        </PrivateRoute>} />
        <Route path='/about' element={<PrivateRoute>
          <About />
        </PrivateRoute>} />
        <Route path='/details' element={<PrivateRoute>
          <Details />
        </PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
