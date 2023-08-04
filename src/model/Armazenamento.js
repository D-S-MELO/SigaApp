const { Schema, model } = require('mongoose');
const armazenamentoSchema = new Schema(
  {
    nome: {
      type: String,
      require: true,
    },
    fabricante: {
      type: String,
      require: true,
    },
    modelo: {
      type: String,
      require: true,
    },
    capacidade: {
      type: String,
      require: true,
    },
    especificacao: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Armazenamento ', armazenamentoSchema);
