
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
- Primeiro, iremos instalar as dependências e executar os servidores\\
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
- Primeiro, iremos instalar as dependências e executar os servidores\\
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

## Atividade 3 (Coming soon)
