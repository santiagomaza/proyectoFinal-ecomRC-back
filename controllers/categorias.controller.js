const Categoria = require('../models/categorias.model')
const { validationResult } = require('express-validator')

const obtenerCategorias = async (req, res) => {
  try {
    const categoria = await Categoria.find({})
    res.json(categoria)
  } catch (error) {
    console.error(error)
  }
}

const crearCategoria = async (req, res) => {
  const { categoria, descripcion, publicada } = req.body

  const categoriaBD = await Categoria.findOne({ categoria })

  const errors = validationResult(req)

  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }

  if(categoriaBD){
    return res.json({
      message: `La categoria ${categoria} ya existe en la base de datos`,
      status: 400
    })
  }
  else{
    try {
      const nuevaCategoria = new Categoria({
        categoria,
        descripcion,
        publicada
      })

      await nuevaCategoria.save()

      res.json({
        message: `La categoria ${nuevaCategoria.categoria} se ha creado con exito`,
        status: 201
      })
    } catch (error) {
      console.error(error)
    }
  }
}

const modificarCategoria = async (req, res) => {
  const { id, categoria, descripcion } = req.body

  const errors = validationResult(req)

  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    await Categoria.findByIdAndUpdate(id, { categoria, descripcion })

    res.json({
      message: `La categoria ${categoria} se ha modificado con exito`,
      status: 200
    })
  }
  catch (error) {
    console.error(error)
  }
}

const borrarCategoria = async (req, res) => {
  const { id } = req.body

  try {
    await Categoria.findByIdAndDelete(id)

    res.json({
      message: 'Categoria eliminada correctamente',
      status: 200
    })
  } catch (error) {
    console.log(error)
  }
}

const publicarCategoria = async (req, res) => {
  const { id, publicada } = req.body
  
  try {
    await Categoria.findByIdAndUpdate(id, { publicada })

    res.json({
      message: 'Estado de categoria modificado correctamente',
      status: 200
    })
  } catch (error) {
    console.error(error)
  }
  
}
module.exports = { obtenerCategorias, crearCategoria, modificarCategoria, publicarCategoria, borrarCategoria }