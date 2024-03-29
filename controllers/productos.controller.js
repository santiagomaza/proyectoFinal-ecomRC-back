const Producto = require('../models/productos.model')
const Categoria = require('../models/categorias.model')
const { validationResult } = require('express-validator')

const obtenerProductos = async (req, res) => {
  try {
    const producto = await Producto.find({})

    res.json({
      producto,
      status: 200
    })

  } catch (error) {
    console.error(error)
  }
}

const obtenerUnProducto = async (req, res) => {
  const { id } = req.params

  try {
    const producto = await Producto.findById(id)

    res.json({
      producto
    })
  } catch (error) {
    console.error(error)
  }
}

const crearProducto = async (req, res) => {
  const { nombre, precio, stock, categoria, descripcion, imagen1, imagen2, imagen3 } = req.body

  const productoBD = await Producto.findOne({ nombre })
  const categoriaBD = await Categoria.findOne({ categoria })

  const errors = validationResult(req)

  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }
  
  if(!categoriaBD){
    return res.json({
      message: `La categoria ${categoria} no existe en la base de datos`,
      status: 400
    })
  }

  if(productoBD){
    return res.json({
      message: `El producto ${nombre} ya existe en la base de datos`,
      status: 400
    })
  }
  else{
    try {
      const nuevoProducto = new Producto({
        nombre,
        precio,
        stock,
        categoria,
        descripcion,
        imagen1,
        imagen2,
        imagen3,
        destacado: false
      })
      await nuevoProducto.save()
  
      res.json({
        message: `Producto ${nuevoProducto.nombre} creado correctamente`,
        status: 201
      })
    } catch (error) {
      console.error(error)
    }
  }
}

const eliminarProducto = async (req, res) => {
  const { id } = req.body

  try {
    const producto = await Producto.findByIdAndDelete(id)

    res.json({
      message: `Producto ${producto.nombre} eliminado correctamente`,
      status: 200
    })
  } catch (error) {
    console.error(error)
  }
}

const modificarProducto = async (req, res) => {
  const { id, nombre, precio, stock, categoria, descripcion, imagen1, imagen2, imagen3 } = req.body
  const categoriaBD = await Categoria.findOne({ categoria })

  const errors = validationResult(req)

  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }

  if(!categoriaBD){
    return res.json({
      message: `La categoria ${categoria} no existe en la base de datos`,
      status: 400
    })
  }
  
  try {
    await Producto.findByIdAndUpdate(id, {
      nombre,
      precio,
      stock,
      categoria,
      descripcion,
      imagen1,
      imagen2,
      imagen3
    })

    res.json({
      message: `Producto modificado correctamente`,
      status: 200
    })
  } catch (error) {
    console.error(error)
  }
}

const destacarProducto = async (req, res) => {
  const { id, destacado } = req.body

  try {
    await Producto.findByIdAndUpdate(id, { destacado })

    res.json({
      message: `Producto modificado correctamente`,
      status: 200
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = { obtenerProductos, obtenerUnProducto, crearProducto, modificarProducto, destacarProducto,  eliminarProducto }