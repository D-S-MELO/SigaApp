const { MASTER_DIR } = require('../helpers/constants');
const Ativo = require('../model/Ativos');
const Local = require('../model/Local');
const So = require('../model/So');
const PlacaMae = require('../model/placaMae');

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

const so = async function (request, response, next) {
  try {
    const so = await So.find({});
    if (so) {
      response.json({ so });
    }
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao requisitar os locais');
  }
};

const placa = async function (request, response, next) {
  try {
    const placaMae = await PlacaMae.find({});
    console.log(placaMae);
    if (placaMae) {
      response.json({ placaMae });
    }
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao requisitar as placas mães');
  }
};
module.exports = {
  indexAtivos,
  local,
  so,
  placa,
};
