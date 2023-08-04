const { MASTER_DIR } = require('../helpers/constants');
const gabinete = require('../model/Gabinete');

const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controllerGabinete.js'];
  const gabinetes = await gabinete.find({});
  return response.render('gabinete', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
    gabinetes,
  });
};

const indexCadastro = function (request, response, next) {
  const jsFiles = ['layout.js'];
  return response.render('cadastroGabinete', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
  });
};

const add = async function (request, response, next) {
  const { nome, fabricante, modelo, especificacao } = request.body;
  try {
    // Verifica se já existe um usuário cadastrado com o mesmo CPF
    const existingGabinete = await gabinete.findOne({ nome });
    if (existingGabinete) {
      const description = 'Operação Bloqueada';
      const err = `Gabinete ${existingMemoria.nome}, já esta cadastrado!`;
      response.render('cadastroGabinete', {
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
      const novoGabiente = new gabinete({
        nome,
        fabricante,
        modelo,
        especificacao,
      });
      // Salvando o usuário no MongoDB usando o Mongoose
      await novoGabiente.save();
      request.flash('success_mgs', 'Gabinete Cadastrado com Sucesso!');
      response.redirect('/gabinete');
    }
  } catch (err) {
    const description =
      'Operação Bloqueada! Ocorreu um Erro ao executar a operação';
    response.render('cadastroGabinete', {
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
    const gabinetes = await gabinete.findById(request.params.id);
    return response.render('editarGabinete', {
      layout: MASTER_DIR,
      gabinetes,
      jsFiles: { files: jsFiles },
    });
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao recuperar os gabinetes');
  }
};

const update = async function (request, response, next) {
  try {
    const { nome, fabricante, modelo, especificacao } = request.body;
    await gabinete.findByIdAndUpdate(request.params.id, {
      nome,
      fabricante,
      modelo,
      especificacao,
    });
    request.flash('success_mgs', 'Gabiente Editado com Sucesso!');
    response.redirect('/gabinete');
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao atualizar esse gabinete!');
  }
};

const deletar = async function (request, response, next) {
  try {
    await gabinete.findByIdAndDelete(request.params.id);
    request.flash('success_mgs', 'Gabinete Excluído com Sucesso!');
    response.redirect('/gabinete');
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao excluir esse gabinete!');
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
