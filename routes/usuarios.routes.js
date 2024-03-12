const express = require("express")
const usuario = express.Router()
const { obtenerUsuarios, obtenerUnUsuario, crearUsuario, registrarUsuario, borrarUsuario, modificarUsuario, cambiarEstado, buscarEmailRecContraseña, recuperarContraseña, inicioSesion } = require('../controllers/usuarios.controller')

usuario.get("/obtener-usuarios", obtenerUsuarios)

usuario.get("/:id", obtenerUnUsuario)

usuario.post("/crear-usuario", crearUsuario)

usuario.post("/registrar-usuario", registrarUsuario)

usuario.post("/inicio-sesion", inicioSesion)

usuario.post("/eliminar-usuario", borrarUsuario)

usuario.post("/buscar-email", buscarEmailRecContraseña)

usuario.patch("/modificar-usuario", modificarUsuario)

usuario.patch("/cambiar-estado", cambiarEstado)

usuario.patch("/recuperar-contraseña", recuperarContraseña)

module.exports = usuario