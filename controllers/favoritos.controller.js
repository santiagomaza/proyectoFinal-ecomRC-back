const Favorito = require('../models/favoritos.model')

const obtenerFavoritos = async (req, res) => {
  try {
    const favorito = await Favorito.find({})
    res.json(favorito)
  } catch (error) {
    console.error(error)
  }
}

const crearFavorito = async (req, res) => {
  const { usuario, producto } = req.body

  try {
    const nuevoFavorito = new Favorito({
      usuario,
      producto
    })

    await nuevoFavorito.save()
    res.json({
      message: `Producto agregado a favoritos correctamente`,
      status: 200
    })
  } catch (error) {
    console.error(error)
  }
}

const borrarFavorito = async (req, res) => {
  const { id } = req.body

  try {
    await Favorito.findByIdAndDelete(id)

    res.json({
      message: `Producto eliminado correctamente de favoritos`,
      status: 200
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = { obtenerFavoritos, crearFavorito, borrarFavorito } 