const express = require('express');
const path = require('path');
const app = express();

// Sirva arquivos estáticos
app.use(express.static(path.join(__dirname)));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => console.log('Frontend rodando em http://localhost:3000'));