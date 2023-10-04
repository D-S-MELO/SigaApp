const { MASTER_DIR } = require('../helpers/constants');
const Chamado = require('../model/Chamados');
const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'chamados.js'];
  try {
    return response.render('chamados', {
      layout: MASTER_DIR,
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

const indexCadastro = function (request, response, next) {
  try {
    const jsFiles = ['layout.js', 'chamados.js'];
    return response.render('novoChamado', {
      layout: MASTER_DIR,
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

const add = async function (request, response, next) {
  const dados = request.body;
  const equipamento = dados[0];
  const local = dados[1];
  const descricao = dados[2];
  const descricao_detalhada = dados[3];
  try {
    const novoChamado = new Chamado({
      equipamento,
      local,
      descricao,
      descricao_detalhada,
    });
    await novoChamado.save();
    request.flash('success_mgs', 'Chamado Cadastrado com Sucesso!');
    response.redirect('/chamados');
  } catch (err) {
    response
      .status(500)
      .send(
        `Ocorreu um erro ao processar a solicitação. Detalhe do Erro:.${err}`
      );
  }
};

const find = async function (request, response, next) {
  try {
    const chamados = await Chamado.find({
      $or: [{ descricao: new RegExp(`${request.query.descricao}`, 'i') }],
    })
      .populate('local', 'nome')
      .exec();
    response.json(chamados);
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
    const dataAtual = new Date();
    dataAtual.setUTCHours(0, 0, 0, 0); // Define a hora para o início do dia

    const inicioDoDia = dataAtual.toISOString();
    dataAtual.setUTCHours(23, 59, 59, 999); // Define a hora para o final do dia

    const finalDoDia = dataAtual.toISOString();
    const chamados = await Chamado.find({
      createdAt: { $gte: new Date(inicioDoDia), $lte: new Date(finalDoDia) },
      status: { $in: ['Em Atendimento', 'Aguardando Atendimento'] },
    })
      .populate('local', 'nome')
      .exec();
    response.json(chamados);
  } catch (err) {
    response
      .status(500)
      .send(
        `Ocorreu um erro ao processar a solicitação Detalhe do Erro:.${err}`
      );
  }
};

const update = async function (request, response, next) {
  try {
    const camposParaAtualizar = {
      status: request.body[1],
      descricao_atendimento: request.body[2],
    };
    await Chamado.findByIdAndUpdate(
      { _id: request.body[0] },
      camposParaAtualizar,
      {
        new: true,
      }
    );
    response.status(200).send(`Chamado Atualizado Com Sucesso`);
  } catch (err) {
    response
      .status(500)
      .send(
        `Ocorreu um erro ao processar a solicitação Detalhe do Erro:.${err}`
      );
  }
};

const deletar = async function (request, response, next) {
  try {
    await Chamado.findByIdAndDelete(request.params.id);
    request.flash('success_mgs', 'Equipamento Excluído com Sucesso!');
    response.redirect('/chamados');
  } catch (err) {
    response
      .status(500)
      .send(
        `Ocorreu um erro ao processar a solicitação Detalhe do Erro:.${err}`
      );
  }
};

const showChamado = async function (request, response, next) {
  const jsFiles = ['layout.js', 'chamados.js'];
  try {
    return response.render('atenderChamado', {
      layout: MASTER_DIR,
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

const setDadosChamado = async function (request, response, next) {
  try {
    var id = request.query.id;
    const chamado = await Chamado.find({ _id: id }).populate('local', 'nome');
    response.json(chamado);
  } catch (err) {
    response.status(500).send(err);
  }
};

module.exports = {
  index,
  add,
  indexCadastro,
  find,
  getDados,
  update,
  deletar,
  showChamado,
  setDadosChamado,
};
