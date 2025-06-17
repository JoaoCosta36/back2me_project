import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterItemPage() {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!itemName.trim()) {
      setError('Por favor, insira um nome válido para o objeto.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('name', itemName);
      formData.append('description', itemDescription);
      if (imageFile) formData.append('image', imageFile);

      const response = await fetch('http://localhost:3000/api/items', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          // Note: NÃO setar 'Content-Type' quando usa FormData
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao registar objeto');
      }

      setSuccess('Objeto registado com sucesso! Redirecionando...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (err) {
      setError(err.message || 'Erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Adicionar Objeto</h2>
      <input
        type="text"
        placeholder="Nome do objeto"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        disabled={loading}
        style={{ marginBottom: 10, display: 'block' }}
      />
      <textarea
        placeholder="Descrição do objeto (opcional)"
        value={itemDescription}
        onChange={(e) => setItemDescription(e.target.value)}
        disabled={loading}
        style={{ width: '100%', height: '80px', marginBottom: 10 }}
      />
      <input 
        type="file" 
        onChange={(e) => setImageFile(e.target.files[0])} 
        disabled={loading} 
        style={{ marginBottom: 10 }}
      />
      <button onClick={handleSave} disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar Objeto'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default RegisterItemPage;