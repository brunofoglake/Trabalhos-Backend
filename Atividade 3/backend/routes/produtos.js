const express = require('express');
const router = express.Router();
const pool = require('../database');

// GET /produtos (Todos os produtos)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM produtos');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /produtos/:id (Produto específico)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM produtos WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /produtos (Adicionar novo)
router.post('/', async (req, res) => {
  try {
    const { nome, descricao, tamanho, preco, categoria } = req.body;
    const [result] = await pool.query(
      'INSERT INTO produtos (nome, descricao, tamanho, preco, categoria) VALUES (?, ?, ?, ?, ?)',
      [nome, descricao, tamanho, preco, categoria]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /produtos/:id (Atualizar existente)
router.put('/:id', async (req, res) => {
  try {
    const { nome, descricao, tamanho, preco, categoria } = req.body;
    const [result] = await pool.query(
      'UPDATE produtos SET nome = ?, descricao = ?, tamanho = ?, preco = ?, categoria = ? WHERE id = ?',
      [nome, descricao, tamanho, preco, categoria, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    res.json({ id: req.params.id, ...req.body });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /produtos/:id (Remover)
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM produtos WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;