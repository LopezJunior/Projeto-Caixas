const { validaFesta } = require('../../util/validators')
const { UserInputError } = require("apollo-server");
const Festa = require("../../models/Festa");


module.exports = {
    Query: {
      async getFestas() {
        const festa = await Festa.find();
        return festa;
      },
      async getFesta(_, { id }) {
        return Festa.findById({ _id: id });
      },
    },
    Mutation: {
        async addFesta (_, {nome, data}){
           const { errors, valid } = validaFesta(nome, data);
            
            if (valid == false){
                throw new UserInputError("Errors", { errors })    
            }
            const festa = await Festa.findOne({ nome, data })
            if (festa) {
                throw new UserInputError("Essa festa ja esta cadastrada", {
                    errors: {
                        nome: "Essa festa ja existe",
                    },
                })
            };  
                const newFesta = new Festa({
                    nome,
                    data
                });
                const res = await newFesta.save();
                
                return {
                    ...res._doc,
                    id: res._id,
                };
            },
        async deleteFesta(_, {id}){
            const res = await Festa.deleteOne({_id: id})
            return {...res._doc};
        },
        async alterarFesta(_, {id, nome, data}){
            const res = await Festa.findOneAndUpdate(
                {_id: id},
                {
                    nome,
                    data
                },
                {new: true}
            );
            return {
                ...res._doc,
                id: res._id,
            }
        } 
    }
}
