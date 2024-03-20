const express = require('express')
const favorito = express.Router()
const { obtenerFavoritos, crearFavorito, borrarFavorito } = require('../controllers/favoritos.controller')

favorito.get('/obtener-favoritos', obtenerFavoritos)

favorito.post('/crear-favorito', crearFavorito)

favorito.delete('/borrar-favorito', borrarFavorito)

module.exports = favorito