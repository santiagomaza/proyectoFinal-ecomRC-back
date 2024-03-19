const express = require('express');
const comentario = express.Router()
const { obtenerComentarios, crearComentario, modificarComentario, borrarComentario } = require('../controllers/comentarios.controller')

comentario.get('/obtener-comentarios', obtenerComentarios)

comentario.post('/crear-comentario', crearComentario)

comentario.patch('/modificar-comentario', modificarComentario)

comentario.delete('/borrar-comentario', borrarComentario)

module.exports = comentario