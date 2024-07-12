const { Schema, model } = require("mongoose")

const carrito = new Schema({
  producto: Object,
  usuario: String,
  cantidad: Number,
  subtotal: Number,
  idUsuario: String,
  idProducto: String
})

module.exports = model("Carrito", carrito)