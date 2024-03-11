const { Schema, model } = require('mongoose')

const categoria = new Schema({
  categoria: String,
  descripcion: String,
  publicada: Boolean
})

module.exports = model('Categoria', categoria)