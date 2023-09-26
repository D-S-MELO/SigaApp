const { MASTER_DIR } = require('../helpers/constants');
const fonte = require('../model/Fonte');

const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controllerFonte.js'];
  try {
    const fontes = await fonte.find({});
    return response.render('fonte', {
      layout: MASTER_DIR,
      jsFiles: { files: jsFiles },
      fontes,
    });
  } catch (error) {
    response
      .status(500)
      .send(
        `Ocorreu um erro ao processar a solicitação Detalhe do Erro:.${err}`
      );
  }
};

const indexCadastro = function (request, response, next) {
  const jsFiles = ['layout.js'];
  try {
    return response.render('cadastroFonte', {
      layout: MASTER_DIR,
      jsFiles: { files: jsFiles },
    });
  } catch (error) {
    response
      .status(500)
      .send(
        `Ocorreu um erro ao processar a solicitação Detalhe do Erro:.${err}`
      );
  }
};

const add = async function (request, response, next) {
  const { nome, fabricante, modelo, especificacao } = request.body;
  try {
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
      const novaFonte = new fonte({
        nome,
        fabricante,
        modelo,
        especificacao,
      });
      await novaFonte.save();
      request.flash('success_mgs', 'Fonte Cadastrada com Sucesso!');
      response.redirect('/hardware');
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
    response
      .status(500)
      .send(
        `Ocorreu um erro ao processar a solicitação Detalhe do Erro:.${err}`
      );
  }
};

const update = async function (request, response, next) {
  const { nome, fabricante, modelo, especificacao } = request.body;
  try {
    await fonte.findByIdAndUpdate(request.params.id, {
      nome,
      fabricante,
      modelo,
      especificacao,
    });
    request.flash('success_mgs', 'Fonte Editada com Sucesso!');
    response.redirect('/hardware');
  } catch (err) {
    const description =
      'Operação Bloqueada! Ocorreu um Erro ao executar a operação';
    response.render('cadastroFonte', {
      layout: MASTER_DIR,
      err,
      description,
      nome,
      fabricante,
      especificacao,
    });
  }
};

const deletar = async function (request, response, next) {
  try {
    await fonte.findByIdAndDelete(request.params.id);
    request.flash('success_mgs', 'Fonte Excluído com Sucesso!');
    response.redirect('/hardware');
  } catch (err) {
    response
      .status(500)
      .send(
        `Ocorreu um erro ao processar a solicitação Detalhe do Erro:.${err}`
      );
  }
};

const find = async function (request, response, next) {
  try {
    const fontes = await fonte.find({
      $or: [{ nome: new RegExp(request.query.nome, 'i') }],
    });
    response.json(fontes);
  } catch (err) {
    response
      .status(500)
      .send(
        `Ocorreu um erro ao processar a solicitação Detalhe do Erro:.${err}`
      );
  }
};

const getDados = async function (request, response, next) {
  try {
    const fontes = await fonte.find({});
    response.json(fontes);
  } catch (err) {
    response
      .status(500)
      .send(
        `Ocorreu um erro ao processar a solicitação Detalhe do Erro:.${err}`
      );
  }
};

module.exports = {
  index,
  indexCadastro,
  add,
  deletar,
  update,
  show,
  getDados,
  find,
};
