const express = require('express');
const cors = require('cors');
const produtosRoutes = require('./routes/produtos');

const app = express();
const PORT = 4000;

// Configurações
app.use(cors());
app.use(express.json());

// Rotas
app.use('/produtos', produtosRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});