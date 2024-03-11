const express = require('express');
const producto = express.Router()
const { obtenerProductos, crearProducto, eliminarProducto } = require('../controllers/productos.controller')

producto.get("/obtener-productos", obtenerProductos)

producto.post("/crear-producto", crearProducto)

producto.delete("/eliminar-producto", eliminarProducto)

module.exports = producto