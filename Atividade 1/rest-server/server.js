const express = require('express');
const cors = require('cors');
const app = express();

// Configuração do CORS (ANTES das rotas!)
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE']
}));

let produtos = [
  { id: 1, nome: 'Camiseta Branca', descricao: 'Camiseta de algodão 100%', tamanho: 'M', preco: 29.99, categoria: 'Camisetas' },
  { id: 2, nome: 'Calça Jeans', descricao: 'Calça jeans slim fit', tamanho: '42', preco: 89.90, categoria: 'Calças' }
];

// Rotas
app.get('/produtos', (req, res) => res.json(produtos));
app.get('/produtos/:id', (req, res) => {
  const produto = produtos.find(p => p.id === parseInt(req.params.id));
  produto ? res.json(produto) : res.status(404).send('Produto não encontrado');
});
app.post('/produtos', express.json(), (req, res) => {
  const produto = { id: produtos.length + 1, ...req.body };
  produtos.push(produto);
  res.status(201).json(produto);
});
app.delete('/produtos/:id', (req, res) => {
  const produtoIndex = produtos.findIndex(p => p.id === parseInt(req.params.id));
  if (produtoIndex === -1) return res.status(404).send('Produto não encontrado');
  res.json(produtos.splice(produtoIndex, 1)[0]);
});

app.listen(4000, () => console.log('Servidor REST rodando em http://localhost:4000'));