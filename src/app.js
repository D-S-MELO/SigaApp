const express = require('express');
require('dotenv').config();
const { init: initHandlebars } = require('./helpers/handlebars');
const bodyParser = require('body-parser');
const path = require('path');
require('./config/db');

// inicialização
const app = express();
initHandlebars(app);

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Arquivos Estaticos

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Rotas
app.use('/', require('./routes/index'));

//Variáveis do servidor
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

//Configurações Servidor
app.listen(port, hostname, () => {
  console.log(
    `Servidor Rodando na porta ${port}, acesse: http://${hostname}:${port}/`
  );
});

module.exports = app;
