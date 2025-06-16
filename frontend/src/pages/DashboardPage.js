// 📁 src/pages/DashboardPage.js
import React, { useState, useContext } from 'react';
import QRCode from 'qrcode.react';
import { AuthContext } from '../contexts/AuthContext';

function DashboardPage() {
  const { user } = useContext(AuthContext);
  const [itemName, setItemName] = useState('');
  const [itemId, setItemId] = useState(null);

  const handleSave = async () => {
    const response = await fetch('http://localhost:3000/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ name: itemName })
    });

    if (response.ok) {
      const data = await response.json();
      setItemId(data.id); // ID do objeto registado
    } else {
      alert('Erro ao registar objeto');
    }
  };

  return (
    <div>
      <h2>Olá, {user?.name || 'Utilizador'}!</h2>
      <input
        type="text"
        placeholder="Nome do objeto"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button onClick={handleSave}>Guardar Objeto</button>

      {itemId && (
        <div>
          <h3>QR Code:</h3>
          <QRCode value={`http://localhost:5173/scan/${itemId}`} />
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
