const Carrito = require('../models/carritos.model')

const obtenerCarrito = async (req, res) => {
  let total = 0
  
  try {
    const carrito = await Carrito.find({})

    carrito.forEach((carro) => {
      total += carro.subtotal
    })

    res.json({
      carrito,
      total
    })

  } catch (error) {
    console.error(error)
  }
}

const crearCarrito = async (req, res) => {
  const { producto, usuario, cantidad, idUsuario, idProducto } = req.body
  let subtotal = 0

  subtotal = cantidad * producto.precio

  try {
    const nuevoCarrito = new Carrito({
      idUsuario,
      idProducto,
      producto,
      usuario,
      subtotal,
      cantidad: 1
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

const actualizarCarritoCant = async (req,res) => {
  const { id, cantidad, precio } = req.body

  let subtotal = cantidad * precio

  try {
    await Carrito.findByIdAndUpdate(id, {
      cantidad, 
      subtotal
    })

  } catch (error) {
    console.error(error)
  }
}

module.exports = { obtenerCarrito, crearCarrito, borrarCarrito, actualizarCarritoCant }