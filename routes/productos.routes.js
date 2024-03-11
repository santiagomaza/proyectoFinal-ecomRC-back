const express = require('express');
const producto = express.Router()
const { obtenerProductos, crearProducto, modificarProducto, destacarProducto, eliminarProducto } = require('../controllers/productos.controller')

producto.get("/obtener-productos", obtenerProductos)

producto.post("/crear-producto", crearProducto)

producto.patch("/modificar-producto", modificarProducto)

producto.patch("/destacar-producto", destacarProducto)

producto.delete("/eliminar-producto", eliminarProducto)

module.exports = producto