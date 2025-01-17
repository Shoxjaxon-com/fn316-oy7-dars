import React, { useState } from 'react';
import './Stayles/Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Yaroqli email kiriting!');
      return false;
    }
    if (password.length < 3) {
      alert('Parol kamida 3 ta belgidan iborat bo‘lishi kerak!');
      return false;
    }
    if (password !== confirm) {
      alert('Parol va tasdiq mos kelmayapti!');
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
        'https://auth-rg69.onrender.com/api/auth/signup',
        { username, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        alert('Ro‘yxatdan muvaffaqiyatli o‘tdingiz!');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Xatolik yuz berdi!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input className="input" value={username} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Username" />
        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
        <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        <input className="input" value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" placeholder="Confirm Password" />
        <button className="btn" disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;
