const { Schema, model } = require("mongoose")

const carrito = new Schema({
  producto: Object,
  usuario: String,
})

module.exports = model("Carrito", carrito)