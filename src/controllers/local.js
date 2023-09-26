const { MASTER_DIR } = require('../helpers/constants');
const Local = require('../model/Local');

const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controlerLocal.js'];
  try {
    const local = await Local.find({});
    return response.render('local', {
      layout: MASTER_DIR,
      jsFiles: { files: jsFiles },
      local,
    });
  } catch (error) {
    return response
      .status(404)
      .send('Ocorreu um erro, procure o administrador do sistema');
  }
};

const indexCadastro = function (request, response, next) {
  const jsFiles = ['layout.js'];
  try {
    return response.render('cadastroLocal', {
      layout: MASTER_DIR,
      jsFiles: { files: jsFiles },
    });
  } catch (error) {
    return response
      .status(404)
      .send('Ocorreu um erro, procure o administrador do sistema');
  }
};

const add = async function (request, response, next) {
  const { nome } = request.body;
  try {
    const existingLocal = await Local.findOne({ nome });
    if (existingLocal) {
      const description = 'Operação Bloqueada';
      const err = `Local ${existingLocal.nome}, já esta cadastrado!`;
      response.render('cadastroLocal', {
        layout: MASTER_DIR,
        err,
        description,
        nome,
      });
    } else {
      const novoLocal = new Local({
        nome,
      });
      await novoLocal.save();
      request.flash('success_mgs', 'Local Cadastrado com Sucesso!');
      response.redirect('/local');
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
    await Locals.findByIdAndDelete(request.params.id);
    request.flash('success_mgs', 'Local Excluído com Sucesso!');
    response.redirect('/hardware');
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao excluir o local!');
    return response
      .status(500)
      .send('Ocorreu um erro, procure o administrador do sistema');
  }
};

const findLocal = async function (request, response, next) {
  try {
    const local = await Local.find({
      $or: [{ nome: new RegExp(request.query.nome, 'i') }],
    });
    response.json(local);
  } catch (err) {
    response.status(500).send(err);
  }
};

const getDadosLocal = async function (request, response, next) {
  try {
    const local = await Local.find({});
    response.json(local);
  } catch (err) {
    response.status(500).send(err);
  }
};

module.exports = {
  index,
  indexCadastro,
  add,
  deletar,
  update,
  show,
  getDadosLocal,
  findLocal,
};
