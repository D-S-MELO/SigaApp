const { MASTER_DIR } = require('../helpers/constants');
const placa = require('../model/PlacaVideo');

const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controllerPlacaVideo.js'];
  try {
    const placas = await placa.find({});
    return response.render('placaVideo', {
      layout: MASTER_DIR,
      jsFiles: { files: jsFiles },
      placas,
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
    return response.render('cadastroPlacaVideo', {
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
  const { nome, fabricante, modelo, capacidade, especificacao } = request.body;
  try {
    const existingPlaca = await placa.findOne({ nome });
    if (existingPlaca) {
      const description = 'Operação Bloqueada';
      const err = `Placa de Vídeo ${existingMemoria.nome}, já esta cadastrado!`;
      response.render('cadastroPlacaVideo', {
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
      const novaPlaca = new placa({
        nome,
        fabricante,
        modelo,
        capacidade,
        especificacao,
      });

      await novaPlaca.save();
      request.flash('success_mgs', 'Placa de Vídeo Cadastrada com Sucesso!');
      response.redirect('/hardware');
    }
  } catch (err) {
    const description =
      'Operação Bloqueada! Ocorreu um Erro ao executar a operação';
    response.render('cadastroPlacaVideo', {
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
    const placas = await placa.findById(request.params.id);
    return response.render('editarPlacaVideo', {
      layout: MASTER_DIR,
      placas,
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
  const { nome, fabricante, modelo, capacidade, especificacao } = request.body;
  try {
    await placa.findByIdAndUpdate(request.params.id, {
      nome,
      fabricante,
      modelo,
      capacidade,
      especificacao,
    });
    request.flash('success_mgs', 'Pláca de Vídeo Editada com Sucesso!');
    response.redirect('/hardware');
  } catch (err) {
    const description =
      'Operação Bloqueada! Ocorreu um Erro ao executar a operação';
    response.render('editarPlacaVideo', {
      layout: MASTER_DIR,
      err,
      description,
      placas: {
        nome: nome,
        fabricante: fabricante,
        modelo: modelo,
        capacidade: capacidade,
        especificacao: especificacao,
      },
    });
  }
};

const deletar = async function (request, response, next) {
  try {
    await placa.findByIdAndDelete(request.params.id);
    request.flash('success_mgs', 'Placa de Vídeo Excluída com Sucesso!');
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
    const placas = await placa.find({
      $or: [{ nome: new RegExp(request.query.nome, 'i') }],
    });
    response.json(placas);
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
    const placas = await placa.find({});
    response.json(placas);
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
