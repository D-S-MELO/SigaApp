const { Schema, model } = require('mongoose');
const AtivoSchema = new Schema(
  {
    fabricante: {
      type: String,
      required: true,
    },
    local: {
      type: String,
      require: true,
    },
    dataInstalacao: {
      type: Date,
      default: Date.now,
    },
    so: {
      type: String,
      required: true,
    },
    situacao: {
      type: String,
      required: true,
    },
    placa_mae: {
      nome: {
        type: String,
        required: true,
      },
    },
    processador: {
      nome: {
        type: String,
        required: true,
      },
    },
    memoria: {
      nome: {
        type: String,
        required: true,
      },
    },
    armazenamento: {
      nome: {
        type: String,
        required: true,
      },
    },
    cooler: {
      nome: {
        type: String,
        required: true,
      },
    },
    fonte: {
      nome: {
        type: String,
        required: true,
      },
    },
    placa_video: {
      nome: {
        type: String,
        required: true,
      },
    },
    gabinete: {
      nome: {
        type: String,
        required: true,
      },
    },
    monitor: {
      nome: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Ativos', AtivoSchema);
