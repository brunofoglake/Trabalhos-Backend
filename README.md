
# Manual de como rodar localmente
- Para todas as 3 atividades, será usado um servidor Express do NodeJS.
- Em caso de dúvida, escolhi instalar cada dependência localmente (nas pastas de cada função do projeto separadamente) para tornar o projeto mais organizado, indicando qual função utiliza qual framework ou aplicação.

### Navegação:
- [Atividade 1](#atividade-1)
- [Atividade 2](#atividade-2)
- [Atividade 3](#atividade-3)

## Atividade 1
- Faça o download do [NodeJS](https://nodejs.org/pt) e instale em sua máquina
- Caso esteja no Windows 10, clique com o botão direito segurando shift dentro da pasta raíz (Atividade 1) e clique em "Abrir janela do powershell aqui".
- Caso contrário, abra o prompt de comando e navegue para o endereço da pasta raíz do projeto.
- Primeiro, iremos instalar as dependências e executar os servidores
\
Vamos começar com o servidor REST. Digite os seguintes comandos:
```
cd rest
npm init -y 
npm install express cors
node server.js
```
Se a operação foi executada corretamente, aparecerá um aviso informando: 
```
Servidor REST rodando em http://localhost:4000
```
Para o servidor GraphQL abra outro prompt utlizando o mesmo método anterior, e digite:
```
cd graphql
npm init -y
npm install express express-graphql graphql cors
node server.js
```
Se a operação foi executada corretamente, aparecerá um aviso informando: 
```
Servidor GraphQL rodando em http://localhost:4001/graphql
```
Para o servidor do frontend abra outro prompt utlizando o mesmo método anterior, e digite:
```
cd frontend
npm init -y
npm install express
node server.js 
```
Se a operação foi executada corretamente, aparecerá um aviso informando: 
```
Frontend rodando em http://localhost:3000
```
Com os 3 servidores ligados, agora acesse o link informado no prompt do [frontend](http://localhost:3000) e teste as funções.

## Atividade 2
- Faça o download do [NodeJS](https://nodejs.org/pt) e instale em sua máquina
- Caso esteja no Windows 10, clique com o botão direito segurando shift dentro da pasta raíz (Atividade 2) e clique em "Abrir janela do powershell aqui".
- Caso contrário, abra o prompt de comando e navegue para o endereço da pasta raíz do projeto.
- Primeiro, iremos instalar as dependências e executar os servidores
\
Aqui, instalaremos apenas o Express do NodeJS. Digite os seguintes comandos:
```
cd backend
npm init -y
npm install express cors
node server.js  
```
Se a operação foi executada corretamente, aparecerá um aviso informando: 
```
Servidor rodando em http://localhost:4000
```
Para o servidor do frontend abra outro prompt utlizando o mesmo método anterior, e digite:
```
cd frontend
npm init -y
npm install express
node server.js 
```
Se a operação foi executada corretamente, aparecerá um aviso informando: 
```
Frontend rodando em http://localhost:3000
```
Com os 3 servidores ligados, agora acesse o link informado no prompt do [frontend](http://localhost:3000) e teste as funções.

## Atividade 3
- Faça o download do [NodeJS](https://nodejs.org/pt) e instale em sua máquina
- Faça o download do [MySQL](https://dev.mysql.com/downloads/installer/), baixe na primeira opção e instale em sua máquina. Na hora da instalação, prossiga normalmente até chegar na parte de "Accounts and Roles", onde terá de ser definida uma senha para o acesso do seu banco de dados. Coloque qualquer senha e a memorize ou guarde, pois será necessária para o acesso e a integração do banco de dados ao sistema.
- Caso esteja no Windows 10, clique com o botão direito segurando shift dentro da pasta raíz (Atividade 3) e clique em "Abrir janela do powershell aqui".
- Caso contrário, abra o prompt de comando e navegue para o endereço da pasta raíz do projeto.
- Primeiro, iremos instalar as dependências e executar os servidores
\
Começando com a criação do banco de dados MySQL, Pesquise na barra de pesquisa do windows um app chamado "MySQL 8.0 Command Line Client" ou a versão que for do seu MySQL. Com o terminal aberto, execute os seguintes comandos:
```
CREATE DATABASE loja_roupas;

USE loja_roupas;

CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  tamanho VARCHAR(10),
  preco DECIMAL(10, 2) NOT NULL,
  categoria VARCHAR(50)
);
```
IMPORTANTE: Depois da instalação do MySQL, a senha que você definiu precisará ser configurada para a integração do site com o servidor MySQL. Abra o arquivo database.js na pasta backend com algum editor de texto, altere e salve:
```
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',                 <<< Usuário padrão
  password: 'SqlPASS@99218181', <<< Substitua pela sua senha do MySQL
  database: 'loja_roupas',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
```
Agora, abra um powershell utilizando o método citado no início da seção e digite os seguintes comandos:
```
cd backend
npm init -y
npm install express mysql2 cors
node server.js
```
Se a operação foi executada corretamente, aparecerá um aviso informando: 
```
Servidor rodando em http://localhost:4000
```
Agora, abra outro powershell, utilizando o mesmo método e digite os seguintes comandos:
```
cd frontend
npm install express
node server.js
```
Se a operação foi executada corretamente, aparecerá um aviso informando: 
```
Frontend em http://localhost:3000
```
Com os 3 servidores ligados, agora acesse o link informado no prompt do [frontend](http://localhost:3000) e teste as funções. Caso queira checar se o item existe na tabela do MySQL, abra o MySQL 8.0 Command Line Client e digite:
```
SELECT * FROM loja_roupas.produtos;
```
Com isso, o setup estará pronto e você poderá livremente adicionar, editar e excluir produtos do site completamente integrados com o banco de dados MySQL.
