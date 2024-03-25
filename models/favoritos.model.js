const { Schema, model } = require("mongoose")

const favorito = new Schema({
  usuario: String,
  producto: Object
})

module.exports = model("Favorito", favorito)