const express = require('express');
const categoria = express.Router()
const { obtenerCategorias, crearCategoria, modificarCategoria, publicarCategoria, borrarCategoria } = require('../controllers/categorias.controller')

categoria.get("/obtener-categorias", obtenerCategorias)

categoria.post("/crear-categoria", crearCategoria)

categoria.patch("/modificar-categoria", modificarCategoria)

categoria.patch("/publicar-categoria", publicarCategoria)

categoria.delete("/borrar-categoria", borrarCategoria)

module.exports = categoria