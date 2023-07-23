const { Schema, model } = require('mongoose');
const localSchema = new Schema(
  {
    nome: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Local', localSchema);
