import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';  // import useNavigate

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // hook para navegação

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:3000/api/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!res.ok) throw new Error('Erro ao carregar perfil');
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (user?.id) {
      fetchProfile();
    }
  }, [user]);

  if (loading) return <p style={{ textAlign: 'center' }}>Carregando perfil...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
    <div style={{ maxWidth: 600, margin: '30px auto', fontFamily: 'Arial, sans-serif' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ marginBottom: 20, cursor: 'pointer' }}
      >
        ← Voltar
      </button>

      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Meu Perfil</h2>
      {profile && (
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: 8,
            padding: 20,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
          }}
        >
          <p><strong>Nome:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Telefone:</strong> {profile.phone_number || '-'}</p>
          <p>
            <strong>Instagram:</strong>{' '}
            {profile.instagram ? (
              <a href={profile.instagram} target="_blank" rel="noreferrer">
                {profile.instagram}
              </a>
            ) : (
              '-'
            )}
          </p>
          <p>
            <strong>Facebook:</strong>{' '}
            {profile.facebook ? (
              <a href={profile.facebook} target="_blank" rel="noreferrer">
                {profile.facebook}
              </a>
            ) : (
              '-'
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;