const express = require("express")
const usuario = express.Router()
const { obtenerUsuarios, obtenerUnUsuario, crearUsuario, registrarUsuario, borrarUsuario, modificarUsuario, cambiarEstado, buscarEmailRecContraseña, restablecerContraseña, inicioSesion } = require('../controllers/usuarios.controller')
const { body } = require('express-validator')
const { jwtValidator, jwtValidator_FP } = require('../middlewares/jwt')

usuario.get("/obtener-usuarios", obtenerUsuarios)

usuario.get("/:id", obtenerUnUsuario)

usuario.post("/crear-usuario", 
  body("nombre").exists().trim().escape().isAlpha("es-ES", {ignore: ' '}).not().isEmpty().isLength({ min: 5, max: 30}).withMessage("Nombre invalido"),
  body("username").exists().escape().isAlphanumeric("es-ES", { ignore: ' .-_*'}).not().isEmpty().isLength({min: 5, max: 15}).withMessage("Nombre de usuario invalido"),
  body("domicilio").exists().escape().isAlphanumeric("es-ES", {ignore: ' '}).not().isEmpty().isLength({min: 8, max: 60}),
  body("email").exists().trim().escape().isEmail().not().isEmpty().isLength({ min: 4, max: 30}).withMessage("Email invalido"),
  body("pais").exists().trim().escape().isAlpha("es-ES", {ignore:' '}).not().isEmpty().withMessage("Pais invalido"),
  body("provincia").exists().trim().escape().isAlpha("es-ES", {ignore:' '}).not().isEmpty().isLength({min: 5, max: 20}).withMessage("Provincia invalida"),
  body("codigoPostal").exists().trim().escape().isNumeric("es-ES", {ignore:' '}).not().isEmpty().isLength({min: 3, max: 8}).withMessage("Codigo postal invalido"),
  body("telefono").exists().trim().escape().isNumeric("es-ES", {ignore:' '}).not().isEmpty().isLength({min: 10, max: 15}).withMessage("Telefono invalido"),
  body("contraseña").exists().trim().escape().isAlphanumeric("es-ES", {ignore:'.-*/_'}).not().isEmpty().isLength({min: 8, max: 15}).isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }).withMessage("Contraseña invalida"),
  crearUsuario)

usuario.post("/registrar-usuario", 
  body("nombre").exists().trim().escape().isAlpha("es-ES", {ignore: ' '}).not().isEmpty().isLength({ min: 5, max: 30}).withMessage("Nombre invalido"),  
  body("username").exists().escape().isAlphanumeric("es-ES", { ignore: ' ._-*' }).not().isEmpty().isLength({min: 5, max: 15}).withMessage("Nombre de usuario invalido"),
  body("domicilio").exists().escape().isAlphanumeric("es-ES", {ignore: ' .'}).not().isEmpty().isLength({min: 8, max: 60}),
  body("email").exists().trim().escape().isEmail().not().isEmpty().isLength({ min: 4, max: 30}).withMessage("Email invalido"),
  body("pais").exists().trim().escape().isAlpha("es-ES", {ignore:' '}).not().isEmpty().withMessage("Pais invalido"),
  body("provincia").exists().trim().escape().isAlpha("es-ES", {ignore:' '}).not().isEmpty().isLength({min: 5, max: 20}).withMessage("Provincia invalida"),
  body("codigoPostal").exists().trim().escape().isNumeric("es-ES", {ignore:' '}).not().isEmpty().isLength({min: 3, max: 8}).withMessage("Codigo postal invalido"),
  body("telefono").exists().trim().escape().isNumeric("es-ES", {ignore:' '}).not().isEmpty().isLength({min: 10, max: 15}).withMessage("Telefono invalido"),
  body("contraseña").exists().trim().escape().isAlphanumeric("es-ES", {ignore:' .-*_!#$%&/())=?¡'}).not().isEmpty().isLength({min: 8, max: 15}).isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }).withMessage("Contraseña invalida"),
registrarUsuario)

usuario.post("/inicio-sesion", inicioSesion)

usuario.post("/buscar-email", 
  body("email").exists().trim().escape().isEmail().matches("/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/").not().isEmpty().withMessage("Email invalido"),
buscarEmailRecContraseña)

usuario.patch("/modificar-usuario", 
  body("nombre").exists().trim().escape().isAlpha("es-ES", {ignore: ' '}).not().isEmpty().isLength({ min: 5, max: 30}).withMessage("Nombre invalido"),
  body("username").exists().escape().isAlphanumeric("es-ES", { ignore:  '.-_*' }).not().isEmpty().isLength({min: 5, max: 15}).withMessage("Nombre de usuario invalido"),
  body("domicilio").exists().escape().isAlphanumeric("es-ES", {ignore: ' '}).not().isEmpty().isLength({min: 8, max: 60}),
  body("email").exists().trim().escape().isEmail().not().isEmpty().isLength({ min: 4, max: 30}).withMessage("Email invalido"),
  body("pais").exists().trim().escape().isAlpha("es-ES", {ignore:' '}).not().isEmpty().withMessage("Pais invalido"),
  body("provincia").exists().trim().escape().isAlpha("es-ES", {ignore:' '}).not().isEmpty().isLength({min: 5, max: 20}).withMessage("Provincia invalida"),
  body("codigoPostal").exists().trim().escape().isNumeric("es-ES", {ignore:' '}).not().isEmpty().isLength({min: 3, max: 8}).withMessage("Codigo postal invalido"),
  body("telefono").exists().trim().escape().isNumeric("es-ES", {ignore:' '}).not().isEmpty().isLength({min: 10, max: 15}).withMessage("Telefono invalido"),
jwtValidator, modificarUsuario)

usuario.patch("/cambiar-estado", cambiarEstado)

usuario.patch("/restablecer-contrasenia", 
  body("contraseña").exists().trim().escape().isAlphanumeric("es-ES", {ignore: '.-*/_'}).not().isEmpty().isLength({min: 8, max: 15}).isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }).withMessage("Contraseña invalida"),
jwtValidator_FP, restablecerContraseña)

usuario.delete("/eliminar-usuario", jwtValidator, borrarUsuario)

module.exports = usuario