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
    situacao: {
      type: String,
      required: true,
    },
    hardware: [
      {
        componentes: Array,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model('Ativos', AtivoSchema);
