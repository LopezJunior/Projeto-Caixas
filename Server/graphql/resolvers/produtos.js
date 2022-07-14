const Produto = require("../../models/Produto");
const { validaProduto } = require("../../util/validators");
const { UserInputError } = require("apollo-server");

module.exports = {
  Query: {
    async getProdutos() {
      const produto = await Produto.find();
      return produto;
    },
    async getProduto(_, { id }) {
      return Produto.findById({ _id: id });
    },
  },
  Mutation: {
    async addProduto(_, { nome, valor, imagem }, {pubsub}) {
      const { errors, valid } = validaProduto(nome, valor);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const produto = await Produto.findOne({ nome });
      if (produto) {
        throw new UserInputError("Esse produto já está cadastrado", {
          errors: {
            nome: "Esse produto já existe",
          },
        });
      }

      const newProduto = new Produto({
        nome,
        valor,
        imagem,
      });

      const res = await newProduto.save();
      pubsub.publish("PRODUTO_ADICIONADO", {produtoAdicionado:{
        ...res._doc,
        id: res._id,
      }})

      return {
        ...res._doc,
        id: res._id,
      };
    },
    async deleteProduto(_, { id }) {
      const res = await Produto.deleteOne({ _id: id });
      return { ...res._doc };
    },
    async alterarProduto(_, { id, nome, valor, imagem }) {
      const res = await Produto.findOneAndUpdate(
        { _id: id },
        {
          nome,
          valor,
          imagem,
        },
        { new: true }
      );
      return {
        ...res._doc,
        id: res._id,
      };
    },
  },
};
