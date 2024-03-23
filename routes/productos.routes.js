const express = require('express');
const producto = express.Router()
const { obtenerProductos, obtenerUnProducto, crearProducto, modificarProducto, destacarProducto, eliminarProducto } = require('../controllers/productos.controller')
const { body } = require('express-validator')
const { jwtValidator } = require("../middlewares/jwt")

producto.get("/obtener-productos", obtenerProductos)

producto.get("/:id", obtenerUnProducto)

producto.post("/crear-producto", 
  body("nombre").exists().trim().escape().isAlphanumeric("es-ES", {ignore: ' '}).not().isEmpty().isLength({ min: 5, max: 60 }).withMessage("Nombre invalido"),
  body("precio").exists().trim().escape().isNumeric("es-ES", {ignore:''}).not().isEmpty().withMessage("Precio invalido"),
  body("stock").exists().trim().escape().isNumeric("es-ES").not().isEmpty().withMessage("Stock invalido"),
  body("categoria").trim().escape().isAlpha("es-ES", {ignore:''}).not().isEmpty().withMessage("Categoria Invalida"),
  body("descripcion").exists().trim().escape().isLength({ min: 2, max: 560 }).not().isEmpty().withMessage("Descripcion invalida"),
  body("imagen1").exists().trim().escape().isURL().not().isEmpty().withMessage("Imagen invalida"),
  body("imagen2").exists().trim().escape().isURL().not().isEmpty().withMessage("Imagen invalida"),
  body("imagen3").exists().trim().escape().isURL().not().isEmpty().withMessage("Imagen invalida"),
jwtValidator, crearProducto)

producto.patch("/modificar-producto", 
  body("nombre").exists().trim().escape().isAlphanumeric("es-ES", {ignore: ' '}).not().isEmpty().isLength({ min: 5, max: 60 }).withMessage("Nombre invalido"),
  body("precio").exists().trim().escape().isNumeric("es-ES", {ignore:''}).not().isEmpty().withMessage("Precio invalido"),
  body("stock").exists().trim().escape().isNumeric("es-ES").not().isEmpty().withMessage("Stock invalido"),
  body("categoria").trim().escape().isAlpha("es-ES", {ignore:''}).not().isEmpty().withMessage("Categoria Invalida"),
  body("descripcion").exists().trim().escape().isLength({ min: 2, max: 560 }).not().isEmpty().withMessage("Descripcion invalida"),
  body("imagen1").exists().trim().escape().isURL().not().isEmpty().withMessage("Imagen invalida"),
  body("imagen2").exists().trim().escape().isURL().not().isEmpty().withMessage("Imagen invalida"),
  body("imagen3").exists().trim().escape().isURL().not().isEmpty().withMessage("Imagen invalida"),
jwtValidator, modificarProducto)

producto.patch("/destacar-producto", jwtValidator, destacarProducto)

producto.delete("/eliminar-producto", jwtValidator, eliminarProducto)

module.exports = producto