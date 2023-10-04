const { MASTER_DIR } = require('../helpers/constants');
const User = require('../model/Usuario');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const index = async function (request, response, next) {
  const jsFiles = ['controllerLogin.js'];
  try {
    return response.render('login', {
      layout: MASTER_DIR,
      jsFiles: { files: jsFiles },
    });
  } catch (err) {
    response
      .status(500)
      .send(
        `Ocorreu um erro ao processar a solicitação Detalhe do Erro:.${err}`
      );
  }
};

const getDadosLogin = async function (request, response, next) {
  console.log(request.isAuthenticated() === true);
  try {
    var usuario = Buffer.from(request.query.email, 'base64').toString('utf-8');
    var senha = Buffer.from(request.query.senha, 'base64').toString('utf-8');
    const user = await User.findOne({ email: usuario });
    const validate = await bcrypt.compare(senha, user.senha);
    if (validate) {
      response.json(user.id);
    } else {
      response.status(500).send('Usuário ou senha inválidos');
    }
  } catch (err) {
    response.status(500).send('Ocorreu um erro ao processar a requisição');
  }
};
const auth = passport.authenticate('local', {
  failureRedirect: '/login?fail=true',
  successRedirect: '/',
  failureFlash: false,
});

module.exports = {
  getDadosLogin,
  index,
  auth,
};
