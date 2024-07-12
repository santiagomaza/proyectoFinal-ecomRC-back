const express = require('express');
const carrito = express.Router();
const { obtenerCarrito, crearCarrito, borrarCarrito, actualizarCarritoCant } = require('../controllers/carritos.controller')
const { jwtValidator } = require('../middlewares/jwt')

carrito.get('/obtener-carrito', obtenerCarrito)

carrito.post('/crear-carrito', jwtValidator, crearCarrito)

carrito.delete('/borrar-carrito', jwtValidator, borrarCarrito)

carrito.patch('/modificar-cantidad', actualizarCarritoCant)

module.exports = carrito