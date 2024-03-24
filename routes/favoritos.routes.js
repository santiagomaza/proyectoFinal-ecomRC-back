const express = require('express')
const favorito = express.Router()
const { obtenerFavoritos, crearFavorito, borrarFavorito } = require('../controllers/favoritos.controller')
const { jwtValidator } = require('../middlewares/jwt')

favorito.get('/obtener-favoritos', obtenerFavoritos)

favorito.post('/crear-favorito', jwtValidator, crearFavorito)

favorito.delete('/borrar-favorito', jwtValidator, borrarFavorito)

module.exports = favorito