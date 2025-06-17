import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function DashboardPage() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:3000/api/items', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!res.ok) throw new Error('Erro ao buscar objetos');
        const data = await res.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (user?.id) {
      fetchItems();
    }
  }, [user]);

  return (
    <div style={{ padding: 30, maxWidth: 1000, margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 30 }}>
        Olá, {user?.name || 'Utilizador'}!
      </h2>

      <div style={{ textAlign: 'center', marginBottom: 30, display: 'flex', justifyContent: 'center', gap: 15 }}>
        <button
          onClick={() => navigate('/register-item')}
          style={{
            backgroundColor: '#007bff',
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            fontSize: 16,
            borderRadius: 5,
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
          }}
        >
          Adicionar Objeto
        </button>

        <button
          onClick={() => navigate('/profile')}
          style={{
            backgroundColor: '#28a745',
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            fontSize: 16,
            borderRadius: 5,
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
          }}
        >
          Meu Perfil
        </button>
      </div>

      {loading && <p style={{ textAlign: 'center' }}>Carregando objetos...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}
      >
        {items.map(item => (
          <div
            key={item.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: 15,
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              backgroundColor: '#fff'
            }}
          >
            <h3 style={{ margin: '0 0 10px', fontSize: 18 }}>{item.name}</h3>
            {item.image_url ? (
              <img
                src={`http://localhost:3000/uploads/${item.image_url}`}
                alt={item.name}
                style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 5, marginBottom: 10 }}
              />
            ) : (
              <p style={{ color: '#888', fontStyle: 'italic' }}>Sem imagem</p>
            )}
            <p style={{ fontSize: 14, color: '#555', minHeight: 40 }}>{item.description}</p>
            <a
              href={`https://back2me.com/scan/${item.public_token}`}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 14, color: '#007bff', textDecoration: 'none' }}
            >
              Ver QR Code
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;