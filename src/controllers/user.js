const { MASTER_DIR } = require('../helpers/constants');
const User = require('../model/Usuario');

const indexCardUser = function (request, response, next) {
  const jsFiles = ['layout.js', 'controlerCadUser.js'];
  return response.render('cadastroUsuario', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
  });
};

const getDadosUser = async function (request, response, next) {
  try {
    const usuarios = await User.find({});
    response.json(usuarios);
  } catch (err) {
    response.status(500).send(err);
  }
};

const indexUser = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controlerUser.js'];
  try {
    const users = await User.find({});
    return response.render('usuario', {
      layout: MASTER_DIR,
      jsFiles: { files: jsFiles },
      users,
    });
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao recuperar os usuários');
  }
};

const add = async function (request, response, next) {
  const {
    nome,
    idade,
    cpf,
    dtnascimento,
    sexo,
    fixo,
    celular,
    email,
    senha,
    escolaridade,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
    cep,
  } = request.body;

  try {
    // Verifica se já existe um usuário cadastrado com o mesmo CPF
    const existingUser = await User.findOne({ cpf });
    if (existingUser) {
      const description = 'Operação Bloqueada';
      const err = `Usuário ${existingUser.nome}, já esta cadastrado com o CPF ${cpf}`;
      response.render('cadastroUsuario', {
        layout: MASTER_DIR,
        err,
        description,
        nome,
        idade,
        cpf,
        dtnascimento,
        sexo,
        fixo,
        celular,
        email,
        senha,
        escolaridade,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        cep,
      });
    } else {
      // Criando um novo usuário com os dados fornecidos
      const novoUsuario = new User({
        nome,
        idade,
        cpf,
        dtnascimento,
        sexo,
        fixo,
        celular,
        email,
        escolaridade,
        endereco: {
          logradouro,
          numero,
          bairro,
          cidade,
          estado,
          cep,
        },
      });

      // Definindo a senha usando o método `encryptPassword` (assumindo que existe no modelo)
      novoUsuario.senha = await novoUsuario.encryptPassword(senha);

      // Salvando o usuário no MongoDB usando o Mongoose
      await novoUsuario.save();
      request.flash('success_mgs', 'Usuário Cadastrado com Sucesso!');
      response.redirect('/usuario');
    }
  } catch (err) {
    const description =
      'Operação Bloqueada! Ocorreu um Erro ao executar a operação';
    response.render('cadastroUsuario', {
      layout: MASTER_DIR,
      err,
      description,
      nome,
      idade,
      cpf,
      dtnascimento,
      sexo,
      fixo,
      celular,
      email,
      senha,
      escolaridade,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      cep,
    });
  }
};

const dataUser = async function (request, response, next) {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao recuperar os usuários');
  }
};

const show = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controlerCadUser.js'];
  try {
    const user = await User.findById(request.params.id);
    return response.render('editarUsuario', {
      layout: MASTER_DIR,
      user,
      jsFiles: { files: jsFiles },
    });
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao recuperar o usuário');
  }
};

const update = async function (request, response, next) {
  const {
    nome,
    idade,
    cpf,
    dtnascimento,
    sexo,
    fixo,
    celular,
    escolaridade,
    email,
    senha,
    cep,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
  } = request.body;
  try {
    await User.findByIdAndUpdate(request.params.id, {
      nome,
      idade,
      cpf,
      dtnascimento,
      sexo,
      fixo,
      celular,
      escolaridade,
      email,
      senha,
      endereco: {
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
      },
    });
    request.flash('success_mgs', 'Usuário Editado com Sucesso!');
    response.redirect('/usuario');
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro editar o usuário!');
    const description =
      'Operação Bloqueada! Ocorreu um Erro ao executar a operação';
    return response.render('editarUsuario', {
      layout: MASTER_DIR,
      err,
      description,
      user: {
        nome: nome,
        idade: idade,
        cpf: cpf,
        dtnascimento: dtnascimento,
        sexo: sexo,
        fixo: fixo,
        celular: celular,
        escolaridade: escolaridade,
        email: email,
        senha: senha,
        endereco: {
          cep: cep,
          logradouro: logradouro,
          numero: numero,
          bairro: bairro,
          cidade: cidade,
          estado: estado,
        },
      },
    });
  }
};

const deletar = async function (request, response, next) {
  try {
    await User.findByIdAndDelete(request.params.id);
    request.flash('success_mgs', 'Usuário Excluído com Sucesso!');
    response.redirect('/usuario');
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao excluir o usuário!');
  }
};

const findUser = async function (request, response, next) {
  try {
    const usuarios = await User.find({
      $or: [{ nome: new RegExp(request.query.nome, 'i') }],
    });
    response.json(usuarios);
  } catch (err) {
    response.status(500).send(err);
  }
};

module.exports = {
  indexCardUser,
  indexUser,
  add,
  dataUser,
  show,
  deletar,
  update,
  getDadosUser,
  findUser,
};
