const Venda = require("../../models/Venda");
const Produto = require("../../models/Produto")


module.exports = {
    Query: {
      async getVendas() {
        let venda = await Venda.aggregate(
          [
            {
          
              $group:
              {
                _id: "$produto",
                total: { $sum: { "$multiply": [ "$valor", "$quantidade" ] } },
                qtde: { $sum: "$quantidade" },

              }
            }
          ]
          );
          let vendaReturn = []

          for (let i = 0; i < venda.length; i++) {
            const prod = await Produto.findById({_id: venda[i]._id})
            console.log('prod', prod)
            vendaReturn.push({...venda[i], nome: prod.nome, valor: prod.valor })
          }
          function compare(a, b) {
            // Use toUpperCase() to ignore character casing
            const bandA = a.nome.toUpperCase();
            const bandB = b.nome.toUpperCase();
          
            let comparison = 0;
            if (bandA > bandB) {
              comparison = 1;
            } else if (bandA < bandB) {
              comparison = -1;
            }
            return comparison;
          }
          
         return  vendaReturn.sort(compare);
        console.log("venda", vendaReturn)
        return vendaReturn.sort();
      },
      async getVenda(_, { id }) {
        return Venda.findById({ _id: id });
      },
    },
    Mutation: {
        async addVenda (_, {festa, data, produto, valor, quantidade}){
                const newVenda = new Venda({
                    festa,
                    data,
                    produto,
                    valor,
                    quantidade
                });
                const res = await newVenda.save();
                
                return {
                    ...res._doc,
                    id: res._id,
                };
            },
        
       
    }
}
