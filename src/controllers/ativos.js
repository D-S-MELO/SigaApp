const { MASTER_DIR } = require('../helpers/constants');
const Ativo = require('../model/Ativos');
const Local = require('../model/Local');

const indexAtivos = function (request, response, next) {
  const jsFiles = ['layout.js', 'controllerAtivos.js'];
  return response.render('ativos', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
  });
};

const local = async function (request, response, next) {
  try {
    const locais = await Local.find({});
    if (locais) {
      response.json({ locais });
    }
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao requisitar os locais');
  }
};
module.exports = {
  indexAtivos,
  local,
};
