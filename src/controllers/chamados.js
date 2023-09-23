const { MASTER_DIR } = require('../helpers/constants');
const Chamado = require('../model/Chamados');
const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'chamados.js'];
  const chamados = await Chamado.find().populate('local', 'nome').exec();
  return response.render('chamados', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
    chamados,
  });
};

const indexCadastro = function (request, response, next) {
  const jsFiles = ['layout.js', 'chamados.js'];
  return response.render('novoChamado', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
  });
};

const add = async function (request, response, next) {
  const dados = request.body;
  const equipamento = dados[0];
  const local = dados[1];
  const descricao = dados[2];
  const descricao_detalhada = dados[3];
  try {
    const novoChamado = new Chamado({
      equipamento,
      local,
      descricao,
      descricao_detalhada,
    });
    await novoChamado.save();
    request.flash('success_mgs', 'Chamado Cadastrado com Sucesso!');
    response.redirect('/chamados');
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  index,
  add,
  indexCadastro,
};
