const { model, Schema } = require("mongoose");

const produtoSchema = new Schema({
  nome: String,
  valor: Number,
  imagem: String,
});

module.exports = model("Produto", produtoSchema);
