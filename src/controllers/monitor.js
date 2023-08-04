const { MASTER_DIR } = require('../helpers/constants');
const monitor = require('../model/Monitor');

const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controllerMonitor.js'];
  const monitores = await monitor.find({});
  return response.render('monitor', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
    monitores,
  });
};

const indexCadastro = function (request, response, next) {
  const jsFiles = ['layout.js'];
  return response.render('cadastroMonitor', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
  });
};

const add = async function (request, response, next) {
  const { nome, fabricante, modelo, especificacao } = request.body;
  try {
    // Verifica se já existe um usuário cadastrado com o mesmo CPF
    const existingMonitor = await monitor.findOne({ nome });
    if (existingMonitor) {
      const description = 'Operação Bloqueada';
      const err = `Monitor ${existingMemoria.nome}, já esta cadastrado!`;
      response.render('cadastroMonitor', {
        layout: MASTER_DIR,
        err,
        description,
        nome,
        fabricante,
        modelo,
        especificacao,
      });
    } else {
      // Criando um novo usuário com os dados fornecidos
      const novoMonitor = new monitor({
        nome,
        fabricante,
        modelo,
        especificacao,
      });
      // Salvando o usuário no MongoDB usando o Mongoose
      await novoMonitor.save();
      request.flash('success_mgs', 'Monitor Cadastrado com Sucesso!');
      response.redirect('/monitor');
    }
  } catch (err) {
    const description =
      'Operação Bloqueada! Ocorreu um Erro ao executar a operação';
    response.render('cadastroMonitor', {
      layout: MASTER_DIR,
      err,
      description,
      nome,
      fabricante,
      modelo,
      especificacao,
    });
  }
};

const show = async function (request, response, next) {
  const jsFiles = ['layout.js'];
  try {
    const monitores = await monitor.findById(request.params.id);
    return response.render('editarMonitor', {
      layout: MASTER_DIR,
      monitores,
      jsFiles: { files: jsFiles },
    });
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao recuperar os monitores');
  }
};

const update = async function (request, response, next) {
  try {
    const { nome, fabricante, modelo, especificacao } = request.body;
    await monitor.findByIdAndUpdate(request.params.id, {
      nome,
      fabricante,
      modelo,
      especificacao,
    });
    request.flash('success_mgs', 'Monitor Editado com Sucesso!');
    response.redirect('/monitor');
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao atualizar esse monitor!');
  }
};

const deletar = async function (request, response, next) {
  try {
    await monitor.findByIdAndDelete(request.params.id);
    request.flash('success_mgs', 'Monitor Excluído com Sucesso!');
    response.redirect('/monitor');
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao excluir esse monitor!');
  }
};

module.exports = {
  index,
  indexCadastro,
  add,
  deletar,
  update,
  show,
};
