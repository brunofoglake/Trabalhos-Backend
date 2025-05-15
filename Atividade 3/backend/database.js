const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',             // Substitua pelo seu usuário
  password: 'SqlPASS@99218181',    // Substitua pela senha do MySQL
  database: 'loja_roupas',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;