const { MASTER_DIR } = require('../helpers/constants');

const indexCardUser = function (request, response, next) {
  const jsFiles = ['layout.js'];
  return response.render('cadastroUsuario', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
  });
};

const indexUser = function (request, response, next) {
  const jsFiles = ['layout.js'];
  return response.render('usuario', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
  });
};
module.exports = { indexCardUser, indexUser };
