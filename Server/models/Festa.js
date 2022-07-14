const { model, Schema } = require('mongoose')

const festaSchema = new Schema({
    nome: String,
    data: String
})

module.exports = model("festa", festaSchema)