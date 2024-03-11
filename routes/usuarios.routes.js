const express = require("express")
const usuario = express.Router()
const { obtenerUsuarios, crearUsuario, registrarUsuario, borrarUsuario, modificarUsuario, cambiarEstado, recuperarContraseña } = require('../controllers/usuarios.controller')

usuario.get("/obtener-usuarios", obtenerUsuarios)

usuario.post("/crear-usuario", crearUsuario)

usuario.post("/registrar-usuario", registrarUsuario)

usuario.post("/eliminar-usuario", borrarUsuario)

usuario.patch("/modificar-usuario", modificarUsuario)

usuario.patch("/cambiar-estado", cambiarEstado)

usuario.patch("/recuperar-contraseña", recuperarContraseña)

module.exports = usuario