const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const PUERTO = process.env.PORT
require('./database/db.js')
const usuarios = require('./routes/usuarios.routes.js')
const productos = require('./routes/productos.routes.js')
const categorias = require('./routes/categorias.routes')
const comentarios = require('./routes/comentarios.routes')
const carritos = require('./routes/carritos.routes')
const favoritos = require('./routes/favoritos.routes.js')

app.use(cors())
app.use(express.json())

app.use('/usuarios', usuarios)
app.use('/productos', productos)
app.use("/categorias", categorias)
app.use('/comentarios', comentarios)
app.use('/carritos', carritos)
app.use('/favoritos', favoritos)

app.listen(PUERTO, () => {
  console.log(`Estamos en el servidor http://localhost:${PUERTO}`)
})