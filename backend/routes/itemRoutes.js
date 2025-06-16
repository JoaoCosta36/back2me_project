const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Ligação MySQL
const { v4: uuidv4 } = require('uuid');

// Criar novo item
router.post('/items', (req, res) => {
  const { user_id, name, description } = req.body;
  const public_token = uuidv4();
  const qr_code = `https://back2me.com/scan/${public_token}`;
  const sql = `INSERT INTO personal_items (user_id, name, description, qr_code, public_token)
               VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [user_id, name, description, qr_code, public_token], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Item criado com sucesso', item_id: result.insertId });
  });
});

// Listar items do utilizador
router.get('/items/:user_id', (req, res) => {
  const sql = 'SELECT * FROM personal_items WHERE user_id = ?';
  db.query(sql, [req.params.user_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

module.exports = router;
