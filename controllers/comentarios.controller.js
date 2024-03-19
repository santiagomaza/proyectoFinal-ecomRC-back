const Comentario = require ('../models/comentarios.model')

const obtenerComentarios = async (req, res) => {
  try {
    const comentario = await Comentario.find({})
    res.json(comentario)
  } catch (error) {
    console.error(error)
  }
}

const crearComentario = async (req, res) => {
  const { username, producto, mensaje } = req.body 
  
  try {
    const nuevoComentario = new Comentario ({
      username,
      producto,
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
  const { id, mensaje } = req.body

  try {
    await Comentario.findByIdAndUpdate(id, {
      mensaje
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = { obtenerComentarios, crearComentario, modificarComentario, borrarComentario }