const Categoria = require('../models/categorias.model')

const obtenerCategorias = async (req, res) => {
  try {
    const categoria = await Categoria.find({})
    res.json(categoria)
  } catch (error) {
    console.error(error)
  }
}

const crearCategoria = async (req, res) => {
  const { categoria, descripcion } = req.body

  const categoriaBD = await Categoria.findOne({ categoria })

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
        publicada: true
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

  const categoriaBD = await Categoria.findOne({ categoria })

  if(categoriaBD){
    return res.json({
      message: `La categoria ${categoria} ya existe en la base de datos`,
      status: 400
    })
  }
  else{
    try {
      await Categoria.findByIdAndUpdate(id, { categoria, descripcion })
    }
    catch (error) {
      console.error(error)
    }
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
      message: 'Categoria publicada correctamente',
      status: 200
    })
  } catch (error) {
    console.error(error)
  }
  
}
module.exports = { obtenerCategorias, crearCategoria, modificarCategoria, publicarCategoria, borrarCategoria }