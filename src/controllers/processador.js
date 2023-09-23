const { MASTER_DIR } = require('../helpers/constants');
const processador = require('../model/Processador');

const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controllerProcessador.js'];
  const processadores = await processador.find({});
  return response.render('processador', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
    processadores,
  });
};

const indexCadastro = function (request, response, next) {
  const jsFiles = ['layout.js'];
  return response.render('cadastroProcessador', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
  });
};

const add = async function (request, response, next) {
  const { nome, fabricante, modelo, especificacao } = request.body;
  try {
    // Verifica se já existe um usuário cadastrado com o mesmo CPF
    const existingProcessador = await processador.findOne({ nome });
    if (existingProcessador) {
      const description = 'Operação Bloqueada';
      const err = `Processador ${existingProcessador.nome}, já esta cadastrado!`;
      response.render('cadastroProcessador', {
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
      const novoProcessador = new processador({
        nome,
        fabricante,
        modelo,
        especificacao,
      });
      // Salvando o usuário no MongoDB usando o Mongoose
      await novoProcessador.save();
      request.flash('success_mgs', 'Processador Cadastrado com Sucesso!');
      response.redirect('/hardware');
    }
  } catch (err) {
    const description =
      'Operação Bloqueada! Ocorreu um Erro ao executar a operação';
    response.render('cadastroProcessador', {
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
    const processadores = await processador.findById(request.params.id);
    return response.render('editarProcessador', {
      layout: MASTER_DIR,
      processadores,
      jsFiles: { files: jsFiles },
    });
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao recuperar os processadores');
  }
};

const update = async function (request, response, next) {
  try {
    const { nome, fabricante, modelo, especificacao } = request.body;
    await processador.findByIdAndUpdate(request.params.id, {
      nome,
      fabricante,
      modelo,
      especificacao,
    });
    request.flash('success_mgs', 'Processador Editado com Sucesso!');
    response.redirect('/hardware');
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao atualizar o processador!');
  }
};

const deletar = async function (request, response, next) {
  try {
    await processador.findByIdAndDelete(request.params.id);
    request.flash('success_mgs', 'Processador Excluído com Sucesso!');
    response.redirect('/hardware');
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao excluir o processador!');
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
