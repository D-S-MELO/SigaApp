const { Schema, model } = require('mongoose');
const monitorSchema = new Schema(
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
    especificacao: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Monitor ', monitorSchema);
