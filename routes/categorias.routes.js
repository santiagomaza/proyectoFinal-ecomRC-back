const express = require('express');
const categoria = express.Router()
const { obtenerCategorias, crearCategoria, modificarCategoria, publicarCategoria, borrarCategoria } = require('../controllers/categorias.controller')
const { jwtValidator } = require('../middlewares/jwt')
const { body } = require('express-validator')

categoria.get("/obtener-categorias", obtenerCategorias)

categoria.post("/crear-categoria", 
  body("categoria").exists().trim().escape().isAlpha("es-ES", { ignore: ' '}).not().isEmpty().isLength({ min: 5, max: 20}).withMessage("Categoría Invalida"),
  body("descripcion").exists().trim().escape().isAlphanumeric("es-ES", { ignore: ' .,-_/#$%&/()?¡! '}).not().isEmpty().isLength({ min: 8, max: 200}).withMessage("Descripcion Invalida"), 
crearCategoria)

categoria.patch("/modificar-categoria",
  body("categoria").exists().trim().escape().isAlpha("es-ES", { ignore: ' '}).not().isEmpty().isLength({ min: 5, max: 20}).withMessage("Categoría Invalida"),
  body("descripcion").exists().trim().escape().isAlpha("es-ES", { ignore:' .,-_/#$%&/()?¡! '}).not().isEmpty().isLength({ min: 8, max: 200}).withMessage("Descripcion Invalida"),
jwtValidator, modificarCategoria)

categoria.patch("/publicar-categoria",jwtValidator, publicarCategoria)

categoria.delete("/borrar-categoria", jwtValidator, borrarCategoria)

module.exports = categoria