import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ScanPage() {
  const { public_token } = useParams();
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContact() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:3000/api/scan/${public_token}`);
        if (!res.ok) throw new Error('Dados não encontrados');
        const data = await res.json();
        setContactData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchContact();
  }, [public_token]);

  if (loading) return <p style={{ textAlign: 'center' }}>Carregando dados...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: 600, margin: '30px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Dados de Contato</h2>
      {contactData && (
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: 8,
            padding: 20,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
          }}
        >
          <p><strong>Nome:</strong> {contactData.name}</p>
          <p><strong>Email:</strong> {contactData.email}</p>
          <p><strong>Telefone:</strong> {contactData.phone_number || '-'}</p>
          <p><strong>Instagram:</strong> {contactData.instagram ? <a href={contactData.instagram} target="_blank" rel="noreferrer">{contactData.instagram}</a> : '-'}</p>
          <p><strong>Facebook:</strong> {contactData.facebook ? <a href={contactData.facebook} target="_blank" rel="noreferrer">{contactData.facebook}</a> : '-'}</p>
        </div>
      )}
    </div>
  );
}

export default ScanPage;