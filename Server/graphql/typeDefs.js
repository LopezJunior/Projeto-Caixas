const { gql } = require("apollo-server");
const { models } = require("mongoose");

module.exports = gql`
  type User {
    id: ID!
    username: String!
    password: String
    cpf: String
    createdAt: String
    token: String
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    cpf: String!
  }

  type Produto {
    id: ID!
    nome: String
    valor: Float
    imagem: String
  }

  type Festa {
    id: ID!
    nome: String
    data: String
  }

  type Venda {
    id: ID!
    festa:String
    data:String
    produto:String
  }

  type VendaItem{
    id: ID!
    valor: Float
    qtde: Float
  }

  type Vendas{
    _id: ID!
    nome:String
    total:Float
    qtde:Int
    valor:Float
    valorMX:Float

  }

  type Query {
    getUsers: [User]
    getProdutos: [Produto]
    getProduto(id: ID!): Produto
    getFestas: [Festa]
    getFesta(id: ID!): Festa
    getVenda(id: ID!): Venda
    getVendas: [Vendas]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(cpf: String!, password: String!): User!
    addProduto(nome: String!, valor: Float, imagem: String): Produto!
    deleteProduto(id: ID!): Produto
    alterarProduto(id: ID, nome: String, valor: Float, imagem: String): Produto!
    addFesta(nome: String!, data: String!): Festa!
    deleteFesta(id: ID!): Festa
    alterarFesta(id: ID!, nome: String!, data: String!): Festa
    addVenda(festa:String!, data:String!, produto:String, valor:Float, quantidade:Float!): Venda 
  }
  type Subscription {
    produtoAdicionado: Produto!
  }
`;
