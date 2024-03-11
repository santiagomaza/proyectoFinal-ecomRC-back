const Usuario = require('../models/usuarios.model')
const bcrypt = require("bcrypt")

const obtenerUsuarios = async (req,res) => {
  try {
    const usuario = await Usuario.find({})
  
    res.json({
      usuario
    })
  } catch (error) {
    console.error(error)
  }
}

const crearUsuario = async (req,res) => {
  const { nombre, username, domicilio, email, pais, provincia, codigoPostal, telefono, contraseña, estado, rol} = req.body
  
  const usuarioBD = await Usuario.findOne({ username })
  const emailBD = await Usuario.findOne({ email })
  const saltRounds = 15
  const contraseñaEncriptada = bcrypt.hashSync(contraseña, saltRounds)

  if(usuarioBD){
    return res.status(400).json({
      message: 'El usuario ya existe en la base de datos'
    })
  }

  if(emailBD){
    return res.status(400).json({
      message: 'El email ya existe en la base de datos'
    })
  }

  if(!usuarioBD || !emailBD){
    try {
      const nuevoUsuario = new Usuario({
        nombre,
        username,
        domicilio,
        email,
        pais,
        provincia,
        codigoPostal,
        telefono,
        contraseña: contraseñaEncriptada,
        estado,
        rol
      })

      await nuevoUsuario.save()
      
      res.status(201).json({
        message: 'Usuario creado correctamente'
      })

    } catch (error) {
      console.error(error)
    }
  }
}

const registrarUsuario = async (req,res) => {
  const { nombre, username, domicilio, email, pais, provincia, codigoPostal, telefono, contraseña} = req.body

  const usuarioBD = await Usuario.findOne({ username })
  const emailBD = await Usuario.findOne({ email })
  const saltRounds = 15
  const contraseñaEncriptada = bcrypt.hashSync(contraseña, saltRounds)

  if(usuarioBD){
    return res.status(400).json({
      message: 'El usuario ya existe en la base de datos'
    })
  }

  if(emailBD){
    return res.status(400).json({
      message: 'El email ya existe en la base de datos'
    })
  }

  if(!usuarioBD || !emailBD){
    try {
      const nuevoUsuario = new Usuario({
        nombre,
        username,
        domicilio,
        email,
        pais,
        provincia,
        codigoPostal,
        telefono,
        contraseña: contraseñaEncriptada,
        estado: "Pendiente",
        rol: "usuario"
      })

      await nuevoUsuario.save()
      
      res.status(201).json({
        message: 'Usuario creado correctamente'
      })

    } catch (error) {
      console.error(error)
    }
  }
}

const borrarUsuario = async (req, res) => {
  const { id } = req.body

  try {
    await Usuario.findByIdAndDelete(id)

    res.status(200).json({
      message: 'Usuario eliminado correctamente'
    })
  } catch (error) {
    console.error(error)
  }
}

const modificarUsuario = async (req, res) => {
  const { id, nombre, username, domicilio, email, pais, provincia, codigoPostal, telefono, contraseña, estado, rol} = req.body

  const saltRounds = 15
  const contraseñaEncriptada = bcrypt.hashSync(contraseña, saltRounds)

  try {
    await Usuario.findByIdAndUpdate(id, {
      nombre,
      username,
      domicilio,
      email,
      pais,
      provincia,
      codigoPostal,
      telefono,
      contraseña: contraseñaEncriptada,
      estado,
      rol
    })

    res.status(200).json({
      message: 'Usuario modificado correctamente'
    })
  } catch (error) {
    console.log(error)
  }
}

const cambiarEstado = async (req,res) => {
  const { id } = req.body

  try {
    await Usuario.findByIdAndUpdate(id, { estado: "Activo"})

    res.status(200).json({
      message: 'Usuario activado correctamente'
    }) 
  } catch (error) {
    console.log(error)
  }
}

const recuperarContraseña = async (req, res) => {
  const { id, contraseña } = req.body
  const saltRounds = 15
  const contraseñaEncriptada = bcrypt.hashSync(contraseña, saltRounds)

  try {
    await Usuario.findByIdAndUpdate(id, {
      contraseña: contraseñaEncriptada
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = { obtenerUsuarios, crearUsuario, registrarUsuario, borrarUsuario, modificarUsuario, cambiarEstado, recuperarContraseña }