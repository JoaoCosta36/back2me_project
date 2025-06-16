// 📁 src/pages/ScanPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

function ScanPage() {
  const { itemId } = useParams();

  return (
    <div>
      <h2>Objeto encontrado!</h2>
      <p>ID do objeto: {itemId}</p>
      {/* Aqui podes buscar os dados reais do item via fetch */}
    </div>
  );
}

export default ScanPage;
