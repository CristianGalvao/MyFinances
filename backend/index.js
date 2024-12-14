// Importando o Express
const express = require('express');
const session = require('express-session'); 

// Importando o dotenv
require('dotenv').config();

// Criando uma instância do Express
const app = express();

// Configurando a porta do servidor
const PORT = process.env.PORT || 3000;


//Adicionando Controllers
const login_controller = require('./controller/login/login_controller');
app.use('/', login_controller)

const database = require("./database/create_table_user");

const register_controller = require("./controller/register/register_controller");
app.use('/', register_controller)

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
