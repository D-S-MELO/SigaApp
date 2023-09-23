const { MASTER_DIR } = require('../helpers/constants');
const placa = require('../model/placaMae');

const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controllerPlacaMae.js'];
  const placaMae = await placa.find({});
  return response.render('placaMae', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
    placaMae,
  });
};

const indexCadastro = function (request, response, next) {
  const jsFiles = ['layout.js'];
  return response.render('cadastroPlacaMae', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
  });
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
    // Verifica se já existe um usuário cadastrado com o mesmo CPF
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
      // Criando um novo usuário com os dados fornecidos
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
      // Salvando o usuário no MongoDB usando o Mongoose
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
    request.flash('erro_mgs', 'Ocorreu um erro ao recuperar as placas');
  }
};

const update = async function (request, response, next) {
  try {
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
    request.flash('erro_mgs', 'Ocorreu um erro ao excluir a Placa Mãe!');
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

module.exports = {
  index,
  indexCadastro,
  add,
  deletar,
  update,
  show,
};
