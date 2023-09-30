const { MASTER_DIR } = require('../helpers/constants');
const processador = require('../model/Processador');

const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controllerProcessador.js'];
  try {
    const processadores = await processador.find({});
    return response.render('processador', {
      layout: MASTER_DIR,
      jsFiles: { files: jsFiles },
      processadores,
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
    return response.render('cadastroProcessador', {
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
    const existingProcessador = await processador.findOne({ nome });
    if (existingProcessador) {
      const description = 'Operação Bloqueada';
      const err = `Processador ${existingProcessador.nome}, já esta cadastrado!`;
      response.render('cadastroProcessador', {
        layout: MASTER_DIR,
        err,
        description,
        nome,
        fabricante,
        modelo,
        especificacao,
      });
    } else {
      const novoProcessador = new processador({
        nome,
        fabricante,
        modelo,
        especificacao,
      });
      // Salvando o usuário no MongoDB usando o Mongoose
      await novoProcessador.save();
      request.flash('success_mgs', 'Processador Cadastrado com Sucesso!');
      response.redirect('/hardware');
    }
  } catch (err) {
    const description =
      'Operação Bloqueada! Ocorreu um Erro ao executar a operação';
    response.render('cadastroProcessador', {
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
    const processadores = await processador.findById(request.params.id);
    return response.render('editarProcessador', {
      layout: MASTER_DIR,
      processadores,
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
    await processador.findByIdAndUpdate(request.params.id, {
      nome,
      fabricante,
      modelo,
      especificacao,
    });
    request.flash('success_mgs', 'Processador Editado com Sucesso!');
    response.redirect('/hardware');
  } catch (err) {
    const description =
      'Operação Bloqueada! Ocorreu um Erro ao executar a operação';
    response.render('editarProcessador', {
      layout: MASTER_DIR,
      err,
      description,
      processadores: {
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
    await processador.findByIdAndDelete(request.params.id);
    request.flash('success_mgs', 'Processador Excluído com Sucesso!');
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
    const processadores = await processador.find({
      $or: [{ nome: new RegExp(request.query.nome, 'i') }],
    });
    response.json(processadores);
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
    const processadores = await processador.find({});
    response.json(processadores);
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
  find,
  getDados,
};
