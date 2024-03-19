const express = require('express');
const producto = express.Router()
const { obtenerProductos, obtenerUnProducto, crearProducto, modificarProducto, destacarProducto, eliminarProducto } = require('../controllers/productos.controller')

producto.get("/obtener-productos", obtenerProductos)

producto.get("/:id", obtenerUnProducto)

producto.post("/crear-producto", crearProducto)

producto.patch("/modificar-producto", modificarProducto)

producto.patch("/destacar-producto", destacarProducto)

producto.delete("/eliminar-producto", eliminarProducto)

module.exports = producto