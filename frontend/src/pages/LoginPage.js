import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    console.log('handleLogin chamado'); // log para debug
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      console.log('Status da resposta:', res.status);
      const data = await res.json();
      console.log('Resposta do backend:', data);

      if (!res.ok) {
        setError(data.error || 'Erro ao fazer login');
        return;
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        console.log('Token salvo, navegando para /dashboard');
        navigate('/dashboard');
      } else {
        setError('Token não recebido do servidor');
      }
    } catch (err) {
      console.error('Erro na conexão:', err);
      setError('Erro na conexão');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={{ marginBottom: 20 }}>Login</h2>
        {error && <p style={{ color: 'red', marginBottom: 15 }}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
          autoComplete="current-password"
        />
        <button type="submit" style={styles.button}>
          Entrar
        </button>

        <p style={{ marginTop: 15 }}>
          Não está registado?{' '}
          <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>
            Registe-se aqui
          </Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f0f2f5',
    padding: 20,
  },
  form: {
    background: '#fff',
    padding: 30,
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: 400,
    boxSizing: 'border-box',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 15,
    borderRadius: 4,
    border: '1px solid #ccc',
    fontSize: 16,
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: 16,
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
};

export default LoginPage;