const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const app = express();

// Configuração do CORS (ANTES do GraphQL!)
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST']
}));

let produtos = [
  { id: 1, nome: 'Camiseta Branca', descricao: 'Camiseta de algodão 100%', tamanho: 'M', preco: 29.99, categoria: 'Camisetas' },
  { id: 2, nome: 'Calça Jeans', descricao: 'Calça jeans slim fit', tamanho: '42', preco: 89.90, categoria: 'Calças' }
];

const schema = buildSchema(`
  type Produto {
    id: Int!
    nome: String!
    descricao: String!
    tamanho: String!
    preco: Float!
    categoria: String!
  }
  input ProdutoInput {
    nome: String!
    descricao: String!
    tamanho: String!
    preco: Float!
    categoria: String!
  }
  type Query {
    getProdutos: [Produto]
    getProduto(id: Int!): Produto
  }
  type Mutation {
    createProduto(input: ProdutoInput): Produto
    deleteProduto(id: Int!): Produto
  }
`);

const root = {
  getProdutos: () => produtos,
  getProduto: ({ id }) => produtos.find(p => p.id === id),
  createProduto: ({ input }) => {
    const produto = { id: produtos.length + 1, ...input };
    produtos.push(produto);
    return produto;
  },
  deleteProduto: ({ id }) => {
    const produtoIndex = produtos.findIndex(p => p.id === id);
    if (produtoIndex === -1) throw new Error('Produto não encontrado');
    return produtos.splice(produtoIndex, 1)[0];
  }
};

app.use('/graphql', graphqlHTTP({ schema, rootValue: root, graphiql: true }));
app.listen(4001, () => console.log('Servidor GraphQL rodando em http://localhost:4001/graphql'));