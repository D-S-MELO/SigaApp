const { MASTER_DIR } = require('../helpers/constants');
const fonte = require('../model/Fonte');

const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controllerFonte.js'];
  const fontes = await fonte.find({});
  return response.render('fonte', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
    fontes,
  });
};

const indexCadastro = function (request, response, next) {
  const jsFiles = ['layout.js'];
  return response.render('cadastroFonte', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
  });
};

const add = async function (request, response, next) {
  const { nome, fabricante, modelo, especificacao } = request.body;
  try {
    // Verifica se já existe um usuário cadastrado com o mesmo CPF
    const existingFonte = await fonte.findOne({ nome });
    if (existingFonte) {
      const description = 'Operação Bloqueada';
      const err = `Fonte ${existingMemoria.nome}, já esta cadastrada!`;
      response.render('cadastroFonte', {
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
      const novaFonte = new fonte({
        nome,
        fabricante,
        modelo,

        especificacao,
      });
      // Salvando o usuário no MongoDB usando o Mongoose
      await novaFonte.save();
      request.flash('success_mgs', 'Fonte Cadastrada com Sucesso!');
      response.redirect('/fonte');
    }
  } catch (err) {
    const description =
      'Operação Bloqueada! Ocorreu um Erro ao executar a operação';
    response.render('cadastroFonte', {
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
    const fontes = await fonte.findById(request.params.id);
    return response.render('editarFonte', {
      layout: MASTER_DIR,
      fontes,
      jsFiles: { files: jsFiles },
    });
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao recuperar as Fontes');
  }
};

const update = async function (request, response, next) {
  try {
    const { nome, fabricante, modelo, especificacao } = request.body;
    await fonte.findByIdAndUpdate(request.params.id, {
      nome,
      fabricante,
      modelo,
      especificacao,
    });
    request.flash('success_mgs', 'Fonte Editada com Sucesso!');
    response.redirect('/fonte');
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao atualizar essa fonte!');
  }
};

const deletar = async function (request, response, next) {
  try {
    await fonte.findByIdAndDelete(request.params.id);
    request.flash('success_mgs', 'Fonte Excluído com Sucesso!');
    response.redirect('/fonte');
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao excluir essa fonte!');
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
