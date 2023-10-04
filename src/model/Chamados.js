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
    user_atendimento: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }],
    status: {
      type: String,
      default: 'Aguardando Atendimento',
    },
    descricao_atendimento: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Chamados ', chamadoSchema);
