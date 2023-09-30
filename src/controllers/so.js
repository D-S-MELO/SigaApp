const { MASTER_DIR } = require('../helpers/constants');
const So = require('../model/So');

const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controllerSo.js'];
  const so = await So.find({});
  return response.render('so', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
    so,
  });
};
const indexCadastro = function (request, response, next) {
  const jsFiles = ['layout.js'];
  return response.render('cadastroSo', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
  });
};

const add = async function (request, response, next) {
  const { nome } = request.body;
  try {
    const existingSo = await So.findOne({ nome });
    if (existingSo) {
      const description = 'Operação Bloqueada';
      const err = `Sistema Operacional ${existingSo.nome}, já esta cadastrado!`;
      response.render('cadastroSo', {
        layout: MASTER_DIR,
        err,
        description,
        nome,
      });
    } else {
      const novoSo = new So({
        nome,
      });

      await novoSo.save();
      request.flash(
        'success_mgs',
        'Sistema Operacional Cadastrado com Sucesso!'
      );
      response.redirect('/hardware');
    }
  } catch (err) {
    const description =
      'Operação Bloqueada! Ocorreu um Erro ao executar a operação';
    response.render('cadastroSo', {
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
    const so = await So.findById(request.params.id);
    return response.render('editarSo', {
      layout: MASTER_DIR,
      so,
      jsFiles: { files: jsFiles },
    });
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao recuperar os locais');
  }
};

const update = async function (request, response, next) {
  try {
    const { nome } = request.body;
    await So.findByIdAndUpdate(request.params.id, {
      nome,
    });
    request.flash('success_mgs', 'Sistema Operacional Editado com Sucesso!');
    response.redirect('/hardware');
  } catch (err) {
    request.flash(
      'erro_mgs',
      'Ocorreu um erro ao excluir o Sistema Operacional!'
    );
  }
};

const deletar = async function (request, response, next) {
  try {
    await So.findByIdAndDelete(request.params.id);
    request.flash('success_mgs', 'Sistema Operacional Excluído com Sucesso!');
    response.redirect('/hardware');
  } catch (err) {
    request.flash(
      'erro_mgs',
      'Ocorreu um erro ao excluir o Sistema Operacional!'
    );
  }
};

const find = async function (request, response, next) {
  try {
    const so = await So.find({
      $or: [{ nome: new RegExp(request.query.nome, 'i') }],
    });
    response.json(so);
  } catch (err) {
    response.status(500).send(err);
  }
};

const getDados = async function (request, response, next) {
  try {
    const so = await So.find({});
    response.json(so);
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
  find,
  getDados,
};
