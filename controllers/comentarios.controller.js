const Comentario = require ('../models/comentarios.model')
const { validationResult } = require('express-validator')

const obtenerComentarios = async (req, res) => {
  try {
    const comentario = await Comentario.find({})
    res.json(comentario)
  } catch (error) {
    console.error(error)
  }
}

const crearComentario = async (req, res) => {
  const { usuario, producto, fecha, mensaje } = req.body
  
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  
  try {
    const nuevoComentario = new Comentario ({
      usuario,
      producto,
      fecha,
      mensaje
    })

    await nuevoComentario.save()
    res.json({
      message: "Comentario creado correctamente",
      status: 201
    })
  } catch (error) {
    console.error(error)
  }
}

const borrarComentario = async (req, res) => {
  const { id } = req.body

  try {
    await Comentario.findByIdAndDelete(id)

    res.json({
      message: "Comentario eliminado correctamente",
      status: 200
    })
  } catch (error) {
    console.error(error)
  }
}

const modificarComentario = async (req, res) => {
  const { id, mensaje, fecha } = req.body

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    await Comentario.findByIdAndUpdate(id, {
      mensaje,
      fecha
    })

    res.json({
      message: "Comentario modificado correctamente",
      status: 200
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = { obtenerComentarios, crearComentario, modificarComentario, borrarComentario }