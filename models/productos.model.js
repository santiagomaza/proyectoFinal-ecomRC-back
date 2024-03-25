const { Schema, model } = require("mongoose")

const producto = new Schema({
  nombre: String,
  precio: Number,
  stock: Number,
  categoria: String,
  descripcion: String,
  imagen1: String,
  imagen2: String,
  imagen3: String,
  destacado: Boolean
})

module.exports = model("Producto", producto)