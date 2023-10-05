const { MASTER_DIR } = require('../helpers/constants');
const User = require('../model/Usuario');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const index = async function (request, response, next) {
  const jsFiles = ['controllerLogin.js'];
  try {
    if (request.query.fail) {
      return response.render('login', {
        layout: MASTER_DIR,
        jsFiles: { files: jsFiles },
        message: 'Usuário e/ou senha incorretos!',
      });
    } else {
      return response.render('login', {
        layout: MASTER_DIR,
        jsFiles: { files: jsFiles },
        message: null,
      });
    }
  } catch (err) {
    response
      .status(500)
      .send(
        `Ocorreu um erro ao processar a solicitação Detalhe do Erro:.${err}`
      );
  }
};

const getDadosLogin = async function (request, response, next) {
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
  failureFlash: true,
});

module.exports = {
  getDadosLogin,
  index,
  auth,
};
