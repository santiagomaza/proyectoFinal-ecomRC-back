const { Schema, model } = require("mongoose")

const carrito = new Schema({
  producto: Array,
  usuario: String,
  cantLlevar: Number
})

module.exports = model("Carrito", carrito)