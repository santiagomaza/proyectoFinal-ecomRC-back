const Usuario = require('../models/usuarios.model')
const bcrypt = require("bcrypt")
const { transporter } = require('../helpers/nodemailer.transporter')
const jwt = require("jsonwebtoken")
const claveTokenInicioSesion = process.env.claveTOKEN_IS
const claveTokenRecContraseña = process.env.claveTOKEN_RC
const { validationResult } = require('express-validator')

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

const obtenerUnUsuario = async (req, res) => {
  const { id } = req.params

  try {
    const usuario = await Usuario.findById(id)

    res.json({
      message: `El usuario encontrado es ${usuario.username}`,
      usuario,
      status: 200
    })
  } catch (error) {
    console.log(error)
  }
}

const crearUsuario = async (req,res) => {
  const { nombre, username, domicilio, email, pais, provincia, codigoPostal, telefono, contraseña, estado, rol } = req.body
  
  const usuarioBD = await Usuario.findOne({ username })
  const emailBD = await Usuario.findOne({ email })
  const saltRounds = 15

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  
  if(usuarioBD){
    return res.json({
      message: 'El usuario ya existe en la base de datos',
      status: 400
    })
  }
  
  if(emailBD){
    return res.json({
      message: 'El email ya existe en la base de datos',
      status: 400
    })
  }
  
  if(!usuarioBD || !emailBD){
    const contraseñaEncriptada = bcrypt.hashSync(contraseña, saltRounds)
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
      
      res.json({
        message: `Usuario ${nuevoUsuario.username} creado exitosamente`,
        status: 201
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

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

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

      const idUsuario = nuevoUsuario._id.toString()
      const emailUsuario = nuevoUsuario.email

      await transporter.sendMail({
        from: '"admim eComRC" <ecomrc.tuc@gmail.com>',
        to: emailUsuario,
        subject: "Registro en eComRC",
        html: 
        `
          <span>¡Hola <strong>${nuevoUsuario.nombre}</strong>!</span>
          <br>
          <p>🫂Muchas gracias por registrarte a nuestra página web🫂</p>
          <br>
          <p>Para completar el proceso de registro, necesitamos que verifiques el email que proporcionaste: <strong>${emailUsuario}</strong>. Para eso, haz click en el siguiente enlace: </p>
          <a href="http://localhost:5173/verificar-email/${idUsuario}">http://localhost:5173/verificar-email/${idUsuario}</a>
          <br>
          <br>
          <span>Saludos cordiales</span>
          <br>
          <span><strong><i>ADMIN eComRC</i></strong></span>
        `,
      });
      
      res.json({
        message: 'Usuario creado correctamente',
        idUsuario,
        status: 201
      })

    } catch (error) {
      console.error(error)
    }
  }
}

const borrarUsuario = async (req, res) => {
  const { id } = req.body

  try {
    const usuario = await Usuario.findByIdAndDelete(id)

    res.json({
      message: `Usuario ${usuario.nombre} eliminado exitosamente`,
      status: 200
    })
  } catch (error) {
    console.error(error)
  }
}

const modificarUsuario = async (req, res) => {
  const { id, nombre, username, domicilio, email, pais, provincia, codigoPostal, telefono, estado, rol } = req.body

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

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
      estado,
      rol
    })

    res.json({
      message: 'Usuario modificado correctamente',
      status: 200
    })
  } catch (error) {
    console.log(error)
  }
}

const cambiarEstado = async (req,res) => {
  const { id } = req.body

  try {
    await Usuario.findByIdAndUpdate(id, { estado: "Activo"})

    res.json({
      message: 'Usuario activado correctamente',
      status: 200
    }) 
  } catch (error) {
    console.log(error)
  }
}

const buscarEmailRecContraseña = async (req, res) => {
  const { email } = req.body
  const usuario = await Usuario.findOne({ email })
  const token_RC = jwt.sign({ usuario }, claveTokenRecContraseña)

  if(usuario){
    try {
      await transporter.sendMail({
        from: '"admim eComRC" <ecomrc.tuc@gmail.com>',
        to: email,
        subject: "Recuperación de Contraseña",
        html:
        `
          <span>¡Hola <strong>${usuario.nombre}</strong>!</span>
          <br>
          <p>Solicitaste un cambio de contraseña para el email ${email}. Para poder hacer el cambio de contraseña, por favor, haz click en el siguiente enlace: </p>
          <br>
          <a href="http://localhost:5173/restablecerContraseña/${token_RC}">http://localhost:5173/restablecerContraseña/${token_RC}</a>
          <br>
          <br>
          <span>Saludos cordiales</span>
          <br>
          <span><strong><i>admin eComRC</i></strong></span>
        `
      })

      res.json({
        message: `Email enviado correctamente al usuario ${usuario.username}`,
        token_RC,
        usuario,
        status: 200
      })
    } catch (error) {
      console.error(error)
    }
  }
  else{
    res.json({
      message: 'El email no existe en la base de datos',
      status: 400
    })
  }
}

const restablecerContraseña = async (req, res) => {
  const { id, contraseña } = req.body
  const saltRounds = 15
  const contraseñaEncriptada = bcrypt.hashSync(contraseña, saltRounds)

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    await Usuario.findByIdAndUpdate(id, {
      contraseña: contraseñaEncriptada
    })

    res.json({
      message: 'Contraseña modificada correctamente',
      status: 200
    })
  } catch (error) {
    console.log(error)
  }
}

const inicioSesion = async (req, res) => {
  const { username, contraseña } = req.body

  try {
    const usuario = await Usuario.findOne({ username }) 

    if(!usuario){
      return res.json({
        message: 'Uno de los datos es incorrecto',
        status: 400
      })
    }
    else
    {
      const pwd = bcrypt.compareSync(contraseña, usuario.contraseña)

      if(usuario.estado === "Inactivo"){
        return res.json({
          message: 'El usuario con el que estas intentando ingresar está inactivo',
          status: 401
        })
      }
      else if(usuario.estado === "Activo" || usuario.estado === "Pendiente"){
        if(pwd){
          const token = jwt.sign({ usuario }, claveTokenInicioSesion)
  
          return res.json({
            message: `¡Bienvenido ${usuario.username}!`,
            usuario,
            token,
            status: 200
          })
        }
        else{
          return res.json({
            message: 'Uno de los datos es incorrecto',
            status: 400
          })
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = { obtenerUsuarios, obtenerUnUsuario, crearUsuario, registrarUsuario, borrarUsuario, modificarUsuario, cambiarEstado, buscarEmailRecContraseña, restablecerContraseña, inicioSesion }