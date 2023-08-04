const { MASTER_DIR } = require('../helpers/constants');
const armazenamento = require('../model/Armazenamento');

const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controllerArmazenamento.js'];
  const armazenamentos = await armazenamento.find({});
  return response.render('armazenamento', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
    armazenamentos,
  });
};

const indexCadastro = function (request, response, next) {
  const jsFiles = ['layout.js'];
  return response.render('cadastroArmazenamento', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
  });
};

const add = async function (request, response, next) {
  const { nome, fabricante, modelo, capacidade, especificacao } = request.body;
  try {
    // Verifica se já existe um usuário cadastrado com o mesmo CPF
    const existingArmazenamento = await armazenamento.findOne({ nome });
    if (existingArmazenamento) {
      const description = 'Operação Bloqueada';
      const err = `Armazenamento ${existingMemoria.nome}, já esta cadastrado!`;
      response.render('cadastroArmazenamento', {
        layout: MASTER_DIR,
        err,
        description,
        nome,
        fabricante,
        modelo,
        capacidade,
        especificacao,
      });
    } else {
      // Criando um novo usuário com os dados fornecidos
      const novoArmazenamento = new armazenamento({
        nome,
        fabricante,
        modelo,
        capacidade,
        especificacao,
      });
      // Salvando o usuário no MongoDB usando o Mongoose
      await novoArmazenamento.save();
      request.flash('success_mgs', 'Armazenemto Cadastrada com Sucesso!');
      response.redirect('/armazenamento');
    }
  } catch (err) {
    const description =
      'Operação Bloqueada! Ocorreu um Erro ao executar a operação';
    response.render('cadastroArmazenamento', {
      layout: MASTER_DIR,
      err,
      description,
      nome,
      fabricante,
      modelo,
      capacidade,
      especificacao,
    });
  }
};

const show = async function (request, response, next) {
  const jsFiles = ['layout.js'];
  try {
    const armazenamentos = await armazenamento.findById(request.params.id);
    return response.render('editarArmazenamento', {
      layout: MASTER_DIR,
      armazenamentos,
      jsFiles: { files: jsFiles },
    });
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao recuperar os armazenamentos');
  }
};

const update = async function (request, response, next) {
  try {
    const {
      nome,
      fabricante,
      modelo,
      capacidade,
      especificacao,
    } = request.body;
    await armazenamento.findByIdAndUpdate(request.params.id, {
      nome,
      fabricante,
      modelo,
      capacidade,
      especificacao,
    });
    request.flash('success_mgs', 'Armazenamento Editado com Sucesso!');
    response.redirect('/armazenamento');
  } catch (err) {
    request.flash(
      'erro_mgs',
      'Ocorreu um erro ao atualizar esse armazenamento!'
    );
  }
};

const deletar = async function (request, response, next) {
  try {
    await armazenamento.findByIdAndDelete(request.params.id);
    request.flash('success_mgs', 'Armazenamento Excluído com Sucesso!');
    response.redirect('/armazenamento');
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao excluir esse armazenamento!');
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
