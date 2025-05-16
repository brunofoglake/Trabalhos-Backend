-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS loja_roupas;
USE loja_roupas;

-- Criação da tabela 'produtos'
CREATE TABLE IF NOT EXISTS produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  tamanho VARCHAR(10),
  preco DECIMAL(10, 2) NOT NULL,
  categoria VARCHAR(50)
);

-- Inserção de dados iniciais (opcional)
INSERT INTO produtos (nome, descricao, tamanho, preco, categoria)
VALUES 
  ('Camiseta Branca', 'Algodão 100%', 'M', 29.99, 'Camisetas'),
  ('Calça Jeans', 'Slim Fit', '42', 89.90, 'Calças');