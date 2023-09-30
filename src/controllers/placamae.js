const { MASTER_DIR } = require('../helpers/constants');
const placa = require('../model/placaMae');

const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controllerPlacaMae.js'];
  try {
    const placaMae = await placa.find({});
    return response.render('placaMae', {
      layout: MASTER_DIR,
      jsFiles: { files: jsFiles },
      placaMae,
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
    return response.render('cadastroPlacaMae', {
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
  const {
    nome,
    fabricante,
    modelo,
    tipo,
    chipset,
    memoria,
    slots,
    graficos,
    conectores,
  } = request.body;
  try {
    const existingPlacaMae = await placa.findOne({ nome });
    if (existingPlacaMae) {
      const description = 'Operação Bloqueada';
      const err = `Placa Mãe ${existingPlacaMae.nome}, já esta cadastrado!`;
      response.render('cadastroPlacaMae', {
        layout: MASTER_DIR,
        err,
        description,
        nome,
        fabricante,
        modelo,
        tipo,
        chipset,
        memoria,
        slots,
        graficos,
        conectores,
      });
    } else {
      const novaPlaca = new placa({
        nome,
        fabricante,
        modelo,
        tipo,
        chipset,
        memoria,
        slots,
        graficos,
        conectores,
      });
      await novaPlaca.save();
      request.flash('success_mgs', 'Placa Mãe Cadastrada com Sucesso!');
      response.redirect('/hardware');
    }
  } catch (err) {
    const description =
      'Operação Bloqueada! Ocorreu um Erro ao executar a operação';
    response.render('cadastroPlacaMae', {
      layout: MASTER_DIR,
      err,
      description,
      nome,
      fabricante,
      modelo,
      tipo,
      chipset,
      memoria,
      slots,
      graficos,
      conectores,
    });
  }
};

const show = async function (request, response, next) {
  const jsFiles = ['layout.js'];
  try {
    const placaMae = await placa.findById(request.params.id);
    return response.render('editarPlacaMae', {
      layout: MASTER_DIR,
      placaMae,
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
  const {
    nome,
    fabricante,
    modelo,
    tipo,
    chipset,
    memoria,
    slots,
    graficos,
    conectores,
  } = request.body;
  try {
    await placa.findByIdAndUpdate(request.params.id, {
      nome,
      fabricante,
      modelo,
      tipo,
      chipset,
      memoria,
      slots,
      graficos,
      conectores,
    });
    request.flash('success_mgs', 'Placa Mãe Editada com Sucesso!');
    response.redirect('/hardware');
  } catch (err) {
    const description =
      'Operação Bloqueada! Ocorreu um Erro ao executar a operação';
    response.render('editarPlacaMae', {
      layout: MASTER_DIR,
      err,
      description,
      placaMae: {
        nome: nome,
        fabricante: fabricante,
        modelo: modelo,
        tipo: tipo,
        chipset: chipset,
        memoria: memoria,
        slots: slots,
        graficos: graficos,
        conectores: conectores,
      },
    });
  }
};

const deletar = async function (request, response, next) {
  try {
    await placa.findByIdAndDelete(request.params.id);
    request.flash('success_mgs', 'Placa Mãe Excluída com Sucesso!');
    response.redirect('/hardware');
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao excluir a Placa Mãe!');
  }
};
const find = async function (request, response, next) {
  try {
    const placaMae = await placa.find({
      $or: [{ nome: new RegExp(request.query.nome, 'i') }],
    });
    response.json(placaMae);
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
    const placaMae = await placa.find({});
    response.json(placaMae);
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
