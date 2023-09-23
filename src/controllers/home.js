const { MASTER_DIR } = require('../helpers/constants');
const Ativo = require('../model/Ativos');
const Chamado = require('../model/Chamados');
const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'dashboard.js'];
  const totChamados = await Chamado.countDocuments();
  const totEquipamentos = await Ativo.countDocuments();
  const totEquipamentosInativos = await Ativo.countDocuments({
    situacao: 'Inativo',
  });
  return response.render('home', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
    totChamados,
    totEquipamentos,
    totEquipamentosInativos,
  });
};

module.exports = { index };
