const Carrito = require('../models/carritos.model')

const obtenerCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.find({})
    res.json(carrito)
  } catch (error) {
    console.error(error)
  }
}

const crearCarrito = async (req, res) => {
  const { producto, usuario } = req.body

  try {
    const nuevoCarrito = new Carrito({
      producto,
      usuario
    })

    await nuevoCarrito.save()

    res.json({
      message: "Producto agregado al carrito correctamente",
      status: 201
    })
  } catch (error) {
    console.error(error)
  }
}

const borrarCarrito = async (req, res) => {
  const { id } = req.body

  try {
    await Carrito.findByIdAndDelete(id)

    res.json({
      message: "Carrito eliminado correctamente",
      status: 200
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = { obtenerCarrito, crearCarrito, borrarCarrito }