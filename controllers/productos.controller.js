const Producto = require('../models/productos.model')

const obtenerProductos = async (req, res) => {
  try {
    const producto = await Producto.find({})
    res.json(producto)
  } catch (error) {
    console.error(error)
  }
}

const crearProducto = async (req, res) => {
  const { nombre, precio, stock, categoria, descripcion, imagen1, imagen2, imagen3 } = req.body

  const productoBD = await Producto.findOne({ nombre })
  
  if(productoBD){
    return res.status(400).json({
      message: `El producto ${nombre} ya existe en la base de datos`
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
        message: `Producto ${nuevoProducto.nombre} creado correctamente`
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
      message: `Producto ${producto.nombre} eliminado correctamente`
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = { obtenerProductos, crearProducto, eliminarProducto }