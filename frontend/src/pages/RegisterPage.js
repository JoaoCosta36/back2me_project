// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        alert('Registo com sucesso! Agora faça login.');
        navigate('/'); // redireciona para login
      } else {
        const data = await response.json();
        setErrorMsg(data.message || 'Erro no registo. Tente novamente.');
      }
    } catch (error) {
      setErrorMsg('Erro de rede. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h2>Registar</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Registar</button>
        </form>
        {errorMsg && (
          <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>
            {errorMsg}
          </p>
        )}
      </div>
    </div>
  );
}