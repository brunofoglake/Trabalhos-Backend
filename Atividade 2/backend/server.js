const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 4000;
const DB_FILE = path.join(__dirname, 'produtos.json');

app.use(cors());
app.use(express.json());

// Helper: Lê dados do arquivo
async function readData() {
  const data = await fs.readFile(DB_FILE, 'utf-8');
  return JSON.parse(data);
}

// Helper: Salva dados no arquivo
async function saveData(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

// Rotas CRUD
app.get('/produtos', async (req, res) => {
  const data = await readData();
  res.json(data.produtos);
});

app.get('/produtos/:id', async (req, res) => {
  const data = await readData();
  const produto = data.produtos.find(p => p.id === parseInt(req.params.id));
  produto ? res.json(produto) : res.status(404).send('Produto não encontrado');
});

app.post('/produtos', async (req, res) => {
  const data = await readData();
  const novoProduto = {
    id: data.produtos.length + 1,
    nome: req.body.nome,
    descricao: req.body.descricao || '',
    tamanho: req.body.tamanho || 'M',
    preco: req.body.preco || 0,
    categoria: req.body.categoria || 'Geral'
  };
  data.produtos.push(novoProduto);
  await saveData(data);
  res.status(201).json(novoProduto);
});

app.put('/produtos/:id', async (req, res) => {
  const data = await readData();
  const index = data.produtos.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Produto não encontrado');
  
  data.produtos[index] = { ...data.produtos[index], ...req.body };
  await saveData(data);
  res.json(data.produtos[index]);
});

app.delete('/produtos/:id', async (req, res) => {
  const data = await readData();
  const index = data.produtos.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Produto não encontrado');
  
  const [produtoRemovido] = data.produtos.splice(index, 1);
  await saveData(data);
  res.json(produtoRemovido);
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  // Cria arquivo JSON se não existir
  fs.access(DB_FILE).catch(() => 
    fs.writeFile(DB_FILE, JSON.stringify({ produtos: [] }, null, 2))
  );
});