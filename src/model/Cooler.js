const { Schema, model } = require('mongoose');
const coolerSchema = new Schema(
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

module.exports = model('Cooler ', coolerSchema);
