const { MASTER_DIR } = require('../helpers/constants');
const Local = require('../model/Local');

const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controllerAtivos.js'];
  const local = await Local.find({});
  return response.render('local', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
    local,
  });
};
const indexCadastro = function (request, response, next) {
  const jsFiles = ['layout.js'];
  return response.render('cadastroLocal', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
  });
};

const add = async function (request, response, next) {
  const { nome } = request.body;
  try {
    // Verifica se já existe um usuário cadastrado com o mesmo CPF
    const existingLocal = await Local.findOne({ nome });
    if (existingLocal) {
      const description = 'Operação Bloqueada';
      const err = `Local ${existingUser.nome}, já esta cadastrado!`;
      response.render('cadastroLocal', {
        layout: MASTER_DIR,
        err,
        description,
        nome,
      });
    } else {
      // Criando um novo usuário com os dados fornecidos
      const novoLocal = new Local({
        nome,
      });
      // Salvando o usuário no MongoDB usando o Mongoose
      await novoLocal.save();
      request.flash('success_mgs', 'Local Cadastrado com Sucesso!');
      response.redirect('/hardware');
    }
  } catch (err) {
    const description =
      'Operação Bloqueada! Ocorreu um Erro ao executar a operação';
    response.render('cadastroLocal', {
      layout: MASTER_DIR,
      err,
      description,
      nome,
    });
  }
};

const show = async function (request, response, next) {
  const jsFiles = ['layout.js'];
  try {
    const local = await Local.findById(request.params.id);
    return response.render('editarLocal', {
      layout: MASTER_DIR,
      local,
      jsFiles: { files: jsFiles },
    });
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao recuperar os locais');
  }
};

const update = async function (request, response, next) {
  try {
    const { nome } = request.body;
    await Local.findByIdAndUpdate(request.params.id, {
      nome,
    });
    request.flash('success_mgs', 'Local Editado com Sucesso!');
    response.redirect('/hardware');
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao excluir o Local!');
  }
};

const deletar = async function (request, response, next) {
  try {
    await Local.findByIdAndDelete(request.params.id);
    request.flash('success_mgs', 'Local Excluído com Sucesso!');
    response.redirect('/hardware');
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao excluir o local!');
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
