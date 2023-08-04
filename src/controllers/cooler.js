const { MASTER_DIR } = require('../helpers/constants');
const cooler = require('../model/Cooler');

const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controllerCooler.js'];
  const coolers = await cooler.find({});
  return response.render('cooler', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
    coolers,
  });
};

const indexCadastro = function (request, response, next) {
  const jsFiles = ['layout.js'];
  return response.render('cadastroCooler', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
  });
};

const add = async function (request, response, next) {
  const { nome, fabricante, modelo, especificacao } = request.body;
  try {
    // Verifica se já existe um usuário cadastrado com o mesmo CPF
    const existingCooler = await cooler.findOne({ nome });
    if (existingCooler) {
      const description = 'Operação Bloqueada';
      const err = `Cooler ${existingMemoria.nome}, já esta cadastrado!`;
      response.render('cadastroCooler', {
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
      const novoCooler = new cooler({
        nome,
        fabricante,
        modelo,
        especificacao,
      });
      // Salvando o usuário no MongoDB usando o Mongoose
      await novoCooler.save();
      request.flash('success_mgs', 'Cooler Cadastrado com Sucesso!');
      response.redirect('/cooler');
    }
  } catch (err) {
    const description =
      'Operação Bloqueada! Ocorreu um Erro ao executar a operação';
    response.render('cadastroCooler', {
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
    const coolers = await cooler.findById(request.params.id);
    return response.render('editarCooler', {
      layout: MASTER_DIR,
      coolers,
      jsFiles: { files: jsFiles },
    });
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao recuperar os coolers');
  }
};

const update = async function (request, response, next) {
  try {
    const { nome, fabricante, modelo, especificacao } = request.body;
    await cooler.findByIdAndUpdate(request.params.id, {
      nome,
      fabricante,
      modelo,
      especificacao,
    });
    request.flash('success_mgs', 'Cooler Editado com Sucesso!');
    response.redirect('/cooler');
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao atualizar esse cooler!');
  }
};

const deletar = async function (request, response, next) {
  try {
    await cooler.findByIdAndDelete(request.params.id);
    request.flash('success_mgs', 'Cooler Excluído com Sucesso!');
    response.redirect('/cooler');
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao excluir esse cooler!');
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
