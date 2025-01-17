import React, { useState } from 'react';
import './Stayles/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
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

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const response = await axios.post(
        'https://auth-rg69.onrender.com/api/auth/signin',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        const { accesToken: token } = response.data;
        localStorage.setItem('token', token); // Tokenni saqlash
        alert('Muvaffaqiyatli login!');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Login yoki parol noto‘g‘ri!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input className="input" value={username} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Username" />
        <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        <button className="btn" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
