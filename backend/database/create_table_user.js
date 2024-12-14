const mysql = require('mysql2');


 const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'MINHASFINANCAS',
  multipleStatements: true
};


const pool = mysql.createPool(dbConfig);

module.exports = pool;

const fs = require('fs');

const executeSQLFile = (filePath) => {

  const sql = fs.readFileSync(filePath, 'utf8');
      pool.query(sql, (err, result) => {
      if (err) {
        console.error('Erro ao executar o SQL:', err.message);
      } else {      }
    });
};


executeSQLFile('./backend/database/sql/tables.sql');

 