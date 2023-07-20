const express = require('express');
require('dotenv').config();
const { init: initHandlebars } = require('./helpers/handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverrride = require('method-override');
require('./config/db');

// inicialização
const app = express();
initHandlebars(app);

app.use(
  session({
    secret: 'AppNOde',
    resave: false,
    saveUninitialized: false,
    resave: true,
    cookie: { maxAge: 2 * 3600000 },
  })
);

//middlewares
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverrride('_method'));

//variaveis globais
app.use((request, response, next) => {
  response.locals.success_mgs = request.flash('success_mgs');
  next();
});
app.use((request, response, next) => {
  response.locals.error_msg = request.flash('error_msg');
  next();
});

//Arquivos Estaticos
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Rotas
app.use('/', require('./routes/index'));

//Variáveis do servidor
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || '3000';

//Configurações Servidor
app.listen(port, hostname, () => {
  console.log(
    `Servidor Rodando na porta ${port}, acesse: http://${hostname}:${port}/`
  );
});

module.exports = app;
