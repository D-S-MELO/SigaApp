const { MASTER_DIR } = require('../helpers/constants');
const memoria = require('../model/Memoria');

const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controllerMemoria.js'];
  const memorias = await memoria.find({});
  return response.render('memoriaRam', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
    memorias,
  });
};

const indexCadastro = function (request, response, next) {
  const jsFiles = ['layout.js'];
  return response.render('cadastroMemoria', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
  });
};

const add = async function (request, response, next) {
  const { nome, fabricante, modelo, capacidade, especificacao } = request.body;
  try {
    // Verifica se já existe um usuário cadastrado com o mesmo CPF
    const existingMemoria = await memoria.findOne({ nome });
    if (existingMemoria) {
      const description = 'Operação Bloqueada';
      const err = `Memória ${existingMemoria.nome}, já esta cadastrada!`;
      response.render('cadastroMemoria', {
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
      const novaMemoria = new memoria({
        nome,
        fabricante,
        modelo,
        capacidade,
        especificacao,
      });
      // Salvando o usuário no MongoDB usando o Mongoose
      await novaMemoria.save();
      request.flash('success_mgs', 'Memória Cadastrada com Sucesso!');
      response.redirect('/memoriaRam');
    }
  } catch (err) {
    const description =
      'Operação Bloqueada! Ocorreu um Erro ao executar a operação';
    response.render('cadastroMemoria', {
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
    const memorias = await memoria.findById(request.params.id);
    return response.render('editarMemoria', {
      layout: MASTER_DIR,
      memorias,
      jsFiles: { files: jsFiles },
    });
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao recuperar as memórias');
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
    await memoria.findByIdAndUpdate(request.params.id, {
      nome,
      fabricante,
      modelo,
      capacidade,
      especificacao,
    });
    request.flash('success_mgs', 'Memória Editada com Sucesso!');
    response.redirect('/hardware');
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao atualizar a memória!');
  }
};

const deletar = async function (request, response, next) {
  try {
    await memoria.findByIdAndDelete(request.params.id);
    request.flash('success_mgs', 'Memória Excluído com Sucesso!');
    response.redirect('/hardware');
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao excluir a memória!');
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
