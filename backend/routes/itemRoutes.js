const express = require('express');
const router = express.Router();
const db = require('../models/db');
const { v4: uuidv4 } = require('uuid');
const authenticateToken = require('../middleware/authenticateToken');
const multer = require('multer');
const path = require('path');

// Multer config - salva arquivos em /uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// POST /api/items - cria item + foto (imagem em tabela separada)
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const user_id = req.userId;
    const { name, description } = req.body;
    const public_token = uuidv4();
    const qr_code = `https://back2me.com/scan/${public_token}`;

    // Insere item
    const sqlItem = `INSERT INTO personal_items (user_id, name, description, qr_code, public_token)
                     VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.query(sqlItem, [user_id, name, description, qr_code, public_token]);

    // Se enviou imagem, insere na tabela item_photos
    if (req.file) {
      const image_url = req.file.filename; // só o filename, caminho está no frontend/backend
      const sqlPhoto = `INSERT INTO item_photos (item_id, url, uploaded_at)
                        VALUES (?, ?, NOW())`;
      await db.query(sqlPhoto, [result.insertId, image_url]);
    }

    res.status(201).json({ message: 'Item criado com sucesso', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/items - retorna items do usuário + foto (URL)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const sql = `
      SELECT pi.id, pi.name, pi.description, pi.public_token,
             ip.url AS image_url
      FROM personal_items pi
      LEFT JOIN item_photos ip ON pi.id = ip.item_id
      WHERE pi.user_id = ?
    `;

    const [rows] = await db.query(sql, [req.userId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;