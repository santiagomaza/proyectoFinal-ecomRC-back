const express = require('express');
const comentario = express.Router()
const { obtenerComentarios, crearComentario, modificarComentario, borrarComentario } = require('../controllers/comentarios.controller')
const { jwtValidator } = require('../middlewares/jwt')
const { body } = require('express-validator')

comentario.get('/obtener-comentarios', obtenerComentarios)

comentario.post('/crear-comentario', 
  body("usuario").exists().escape().trim().isAlphanumeric("es-ES", { ignore: '.-_*' }).not().isEmpty().withMessage("Usuario invalido"),
  body("producto").exists().escape().trim().isAlphanumeric("es-ES", { ignore: ' ._*-/!#$%&()=? ' }).not().isEmpty().withMessage("Producto invalido"),
  body("mensaje").exists().escape().trim().isAlphanumeric("es-ES", { ignore: ' !"#%&//()=?¡ ' }).not().isEmpty().withMessage("Comentario invalido"),
  body("fecha").exists().escape().trim().isDate({format: "MM/DD/YYYY"}).not().isEmpty().withMessage("Fecha invalida"),
  jwtValidator,
crearComentario)

comentario.patch('/modificar-comentario', 
  body("usuario").exists().escape().trim().isAlphanumeric("es-ES", { ignore: ' ' }).not().isEmpty().withMessage("Usuario invalido"),
  body("producto").exists().escape().trim().isAlphanumeric("es-ES", { ignore:' ._*-/!#$%&()=? ' }).not().isEmpty().withMessage("Producto invalido"),
  body("mensaje").exists().escape().trim().isAlphanumeric("es-ES", { ignore:' !"#%&//()=?¡ ' }).not().isEmpty().withMessage("Comentario invalido"),
  body("fecha").exists().escape().trim().isDate({format: "MM/DD/YYYY"}).not().isEmpty().withMessage("Fecha invalida"),
jwtValidator, modificarComentario)

comentario.delete('/borrar-comentario', jwtValidator,  borrarComentario)

module.exports = comentario