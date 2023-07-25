const { Schema, model } = require('mongoose');
const placaMaeSchema = new Schema(
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
    tipo: {
      type: String,
      require: true,
    },
    chipset: {
      type: String,
      require: true,
    },
    memoria: {
      type: String,
      require: true,
    },
    slots: {
      type: String,
      require: true,
    },
    graficos: {
      type: String,
      require: true,
    },
    conectores: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('placaMae', placaMaeSchema);
