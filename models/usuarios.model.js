const { Schema, model } = require('mongoose')

const usuario = new Schema([
  nombre = String,
  username =  String,
  domicilio = String,
  email = String,
  pais = String,
  provincia = String,
  codigoPostal = Number,
  telefono = Number,
  contraseña = String,
  estado = String,
  rol = String
])

module.exports = model('Usuario', usuario)