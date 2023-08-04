const { MASTER_DIR } = require('../helpers/constants');
const placa = require('../model/PlacaVideo');

const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controllerPlacaVideo.js'];
  const placas = await placa.find({});
  return response.render('placaVideo', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
    placas,
  });
};

const indexCadastro = function (request, response, next) {
  const jsFiles = ['layout.js'];
  return response.render('cadastroPlacaVideo', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
  });
};

const add = async function (request, response, next) {
  const { nome, fabricante, modelo, capacidade, especificacao } = request.body;
  try {
    // Verifica se já existe um usuário cadastrado com o mesmo CPF
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
      // Criando um novo usuário com os dados fornecidos
      const novaPlaca = new placa({
        nome,
        fabricante,
        modelo,
        capacidade,
        especificacao,
      });
      // Salvando o usuário no MongoDB usando o Mongoose
      await novaPlaca.save();
      request.flash('success_mgs', 'Placa de Vídeo Cadastrada com Sucesso!');
      response.redirect('/placaVideo');
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
    request.flash(
      'erro_mgs',
      'Ocorreu um erro ao recuperar as placas de vídeo'
    );
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
    await placa.findByIdAndUpdate(request.params.id, {
      nome,
      fabricante,
      modelo,
      capacidade,
      especificacao,
    });
    request.flash('success_mgs', 'Pláca de Vídeo Editada com Sucesso!');
    response.redirect('/placaVideo');
  } catch (err) {
    request.flash(
      'erro_mgs',
      'Ocorreu um erro ao atualizar essa placa de vídeo!'
    );
  }
};

const deletar = async function (request, response, next) {
  try {
    await placa.findByIdAndDelete(request.params.id);
    request.flash('success_mgs', 'Placa de Vídeo Excluída com Sucesso!');
    response.redirect('/placaVideo');
  } catch (err) {
    request.flash(
      'erro_mgs',
      'Ocorreu um erro ao excluir essa placa de Vídeo!'
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
};
