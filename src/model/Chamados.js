const { Schema, model } = require('mongoose');
const chamadoSchema = new Schema(
  {
    equipamento: [{ type: Schema.Types.ObjectId, ref: 'Ativo' }],
    local: [{ type: Schema.Types.ObjectId, ref: 'Local' }],
    descricao: {
      type: String,
      require: true,
    },
    descricao_detalhada: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Chamados ', chamadoSchema);
