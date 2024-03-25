const { Schema, model } = require ('mongoose')

const comentario = new Schema({
  usuario: String,
  producto: String,
  fecha: String,
  mensaje: String
})

module.exports = model('Comentario', comentario)