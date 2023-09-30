const { MASTER_DIR } = require('../helpers/constants');
const monitor = require('../model/Monitor');

const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controllerMonitor.js'];
  try {
    const monitores = await monitor.find({});
    return response.render('monitor', {
      layout: MASTER_DIR,
      jsFiles: { files: jsFiles },
      monitores,
    });
  } catch (error) {
    response
      .status(500)
      .send(
        `Ocorreu um erro ao processar a solicitação Detalhe do Erro:.${error}`
      );
  }
};

const indexCadastro = function (request, response, next) {
  const jsFiles = ['layout.js'];
  try {
    return response.render('cadastroMonitor', {
      layout: MASTER_DIR,
      jsFiles: { files: jsFiles },
    });
  } catch (error) {
    response
      .status(500)
      .send(
        `Ocorreu um erro ao processar a solicitação Detalhe do Erro:.${error}`
      );
  }
};

const add = async function (request, response, next) {
  const { nome, fabricante, modelo, especificacao } = request.body;
  try {
    const existingMonitor = await monitor.findOne({ nome });
    if (existingMonitor) {
      const description = 'Operação Bloqueada';
      const err = `Monitor ${existingMemoria.nome}, já esta cadastrado!`;
      response.render('cadastroMonitor', {
        layout: MASTER_DIR,
        err,
        description,
        nome,
        fabricante,
        modelo,
        especificacao,
      });
    } else {
      const novoMonitor = new monitor({
        nome,
        fabricante,
        modelo,
        especificacao,
      });
      await novoMonitor.save();
      request.flash('success_mgs', 'Monitor Cadastrado com Sucesso!');
      response.redirect('/hardware');
    }
  } catch (err) {
    const description =
      'Operação Bloqueada! Ocorreu um Erro ao executar a operação';
    response.render('cadastroMonitor', {
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
    const monitores = await monitor.findById(request.params.id);
    return response.render('editarMonitor', {
      layout: MASTER_DIR,
      monitores,
      jsFiles: { files: jsFiles },
    });
  } catch (err) {
    return response.render('editarMonitor', {
      layout: MASTER_DIR,
      jsFiles: { files: jsFiles },
    });
  }
};

const update = async function (request, response, next) {
  const { nome, fabricante, modelo, especificacao } = request.body;
  try {
    await monitor.findByIdAndUpdate(request.params.id, {
      nome,
      fabricante,
      modelo,
      especificacao,
    });
    request.flash('success_mgs', 'Monitor Editado com Sucesso!');
    response.redirect('/hardware');
  } catch (err) {
    const description =
      'Operação Bloqueada! Ocorreu um Erro ao executar a operação';
    response.render('editarMonitor', {
      layout: MASTER_DIR,
      err,
      description,
      monitores: {
        nome: nome,
        fabricante: fabricante,
        modelo: modelo,
        especificacao: especificacao,
      },
    });
  }
};

const deletar = async function (request, response, next) {
  try {
    await monitor.findByIdAndDelete(request.params.id);
    request.flash('success_mgs', 'Monitor Excluído com Sucesso!');
    response.redirect('/hardware');
  } catch (err) {
    response
      .status(500)
      .send(
        `Ocorreu um erro ao processar a solicitação Detalhe do Erro:.${error}`
      );
  }
};

const find = async function (request, response, next) {
  try {
    const monitores = await monitor.find({
      $or: [{ nome: new RegExp(request.query.nome, 'i') }],
    });
    response.json(monitores);
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
    const monitores = await monitor.find({});
    response.json(monitores);
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
