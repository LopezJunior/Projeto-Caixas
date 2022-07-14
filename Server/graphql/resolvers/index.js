const usersResolvers = require("./users");
const produtosResolvers = require("./produtos");
const festasResolvers = require("./festas")
const vendasResolvers = require("./vendas")
module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...produtosResolvers.Query,
    ...festasResolvers.Query,
    ...vendasResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...produtosResolvers.Mutation,
    ...festasResolvers.Mutation,
    ...vendasResolvers.Mutation,
     },
     Subscription: {
       produtoAdicionado: {
         subscribe:(obj, args, {pubsub}) =>
         pubsub.asyncIterator("PRODUTO_ADICIONADO")
       }
     }
};

