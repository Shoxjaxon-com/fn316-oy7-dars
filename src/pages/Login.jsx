import React, { useState } from 'react';
import './Stayles/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function validate() {
    if (username.length < 4) {
      alert('Username kamida 4 ta belgidan iborat bo‘lishi kerak!');
      return false;
    }

    if (password.length < 3) {
      alert('Parol kamida 3 ta belgidan iborat bo‘lishi kerak!');
      return false;
    }

   
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    const user = {
      username: username,
      password: password,
    };

    axios
      .post('https://auth-rg69.onrender.com/api/auth/signin', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if(response.status == 200){
            localStorage.setItem('user', JSON.stringify(response.data))
            localStorage.setItem('token', JSON.stringify(response.data.accesToken))
            navigate('/')
        }
        
      })
      .catch((error) => {
        if(error.status == 404 || error.status == 401){
            alert(error.response?.data?.message)
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          className="input"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="Enter your username"
        />
        <input
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
        />
       
        <button disabled={loading} className="btn">
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
