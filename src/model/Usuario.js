const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new Schema(
  {
    nome: {
      type: String,
      require: true,
    },
    idade: {
      type: String,
      require: true,
    },
    cpf: {
      type: String,
      require: true,
      unique: true,
    },
    dtnascimento: {
      type: Date,
      require: true,
    },
    sexo: {
      type: String,
      require: true,
    },
    celular: {
      type: String,
      require: true,
    },
    fixo: {
      type: String,
      require: true,
    },
    escolaridade: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    senha: {
      type: String,
      required: true,
    },
    endereco: {
      cep: {
        type: String,
        require: true,
      },
      logradouro: {
        type: String,
        require: true,
      },
      numero: {
        type: String,
        require: true,
      },
      bairro: {
        type: String,
        require: true,
      },
      cidade: {
        type: String,
        require: true,
      },
      estado: {
        type: String,
        require: true,
      },
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.methods.encryptPassword = async (senha) => {
  const salt = await bcrypt.genSaltSync(10);
  return await bcrypt.hash(senha, salt);
};

UserSchema.methods.matchPassword = async function (senha) {
  return await bcrypt.compare(senha, this.senha);
};

module.exports = model('Usuario', UserSchema);
