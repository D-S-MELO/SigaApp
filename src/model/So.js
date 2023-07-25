const { Schema, model } = require('mongoose');
const soSchema = new Schema(
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

module.exports = model('So', soSchema);
