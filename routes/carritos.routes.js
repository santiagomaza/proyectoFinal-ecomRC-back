const express = require('express');
const carrito = express.Router();
const { obtenerCarrito, crearCarrito, borrarCarrito } = require('../controllers/carritos.controller')

carrito.get('/obtener-carrito', obtenerCarrito)

carrito.post('/crear-carrito', crearCarrito)

carrito.delete('/borrar-carrito', borrarCarrito)

module.exports = carrito