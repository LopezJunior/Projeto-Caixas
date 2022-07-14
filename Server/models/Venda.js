const { model, Schema } = require("mongoose");
const vendaSchema = new Schema({
    festa:String,
    data:Date,
    produto:String,
    valor:Number,
    quantidade:Number,
});

module.exports = model("Venda", vendaSchema);
