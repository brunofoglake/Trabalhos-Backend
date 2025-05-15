document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('formProduto');
  const listaProdutos = document.getElementById('listaProdutos');
  let editandoId = null;

  // ==========================================
  // FUNÇÃO PARA RENDERIZAR PRODUTOS (CORRIGIDA)
  // ==========================================
  const renderizarProduto = (produto) => {
    // Garante que 'preco' seja tratado como número (evita erro toFixed)
    const preco = typeof produto.preco === 'string' 
      ? parseFloat(produto.preco) 
      : produto.preco;

    return `
      <div class="produto" data-id="${produto.id}">
        <h3>${produto.nome} <small>(${produto.categoria})</small></h3>
        <p>${produto.descricao || 'Sem descrição'}</p>
        <p>Tamanho: ${produto.tamanho} | Preço: R$ ${preco.toFixed(2)}</p>
        <button onclick="editarProduto(${produto.id})">Editar</button>
        <button class="delete" onclick="excluirProduto(${produto.id})">Excluir</button>
      </div>
    `;
  };

  // ==========================================
  // CARREGA PRODUTOS DO BACKEND (COM TRATAMENTO DE ERRO)
  // ==========================================
  const carregarProdutos = async () => {
    try {
      const response = await fetch('http://localhost:4000/produtos');
      
      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const produtos = await response.json();
      
      // Verifica se 'produtos' é um array
      if (!Array.isArray(produtos)) {
        throw new Error('Resposta do servidor não é um array');
      }

      // Renderiza os produtos ou exibe mensagem se vazio
      listaProdutos.innerHTML = produtos.length > 0 
        ? produtos.map(renderizarProduto).join('') 
        : '<p>Nenhum produto cadastrado.</p>';

    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      listaProdutos.innerHTML = `
        <p class="erro">Erro ao carregar produtos. Verifique o console (F12).</p>
        <p>Detalhes: ${error.message}</p>
      `;
    }
  };

  // ==========================================
  // ENVIA O FORMULÁRIO (POST/PUT)
  // ==========================================
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const produto = {
      nome: document.getElementById('nome').value,
      descricao: document.getElementById('descricao').value,
      tamanho: document.getElementById('tamanho').value,
      preco: parseFloat(document.getElementById('preco').value),
      categoria: document.getElementById('categoria').value
    };

    try {
      const url = window.produtoEditandoId 
        ? `http://localhost:4000/produtos/${window.produtoEditandoId}`
        : 'http://localhost:4000/produtos';
      const method = window.produtoEditandoId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
      });

      if (!response.ok) throw new Error(`Erro: ${response.status}`);

      // Limpa o formulário após sucesso
      form.reset();
      delete window.produtoEditandoId;
      document.querySelector('#formProduto button[type="submit"]').textContent = 'Salvar Produto';
      
      // Recarrega a lista
      await carregarProdutos();
      
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar produto. Verifique o console.');
    }
  });

  // ==========================================
  // FUNÇÕES GLOBAIS PARA EDITAR/EXCLUIR
  // ==========================================
  window.editarProduto = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/produtos/${id}`);
      const produto = await response.json();
      
      // Preenche o formulário
      document.getElementById('nome').value = produto.nome;
      document.getElementById('descricao').value = produto.descricao || '';
      document.getElementById('tamanho').value = produto.tamanho || '';
      document.getElementById('preco').value = produto.preco;
      document.getElementById('categoria').value = produto.categoria || '';
      
      // Armazena o ID do produto sendo editado
      window.produtoEditandoId = id;
      
      // Muda o texto do botão para "Atualizar"
      document.querySelector('#formProduto button[type="submit"]').textContent = 'Atualizar Produto';
      
    } catch (error) {
      console.error('Erro ao carregar produto para edição:', error);
      alert('Não foi possível carregar o produto para edição');
    }
  };

  window.excluirProduto = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    
    try {
      await fetch(`http://localhost:4000/produtos/${id}`, { method: 'DELETE' });
      await carregarProdutos(); // Atualiza a lista
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  // ==========================================
  // INICIALIZAÇÃO
  // ==========================================
  await carregarProdutos();
});