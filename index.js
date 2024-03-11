const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const PUERTO = process.env.PORT
require('./database/db.js')
const usuarios = require('./routes/usuarios.routes.js')
const productos = require('./routes/productos.routes.js')

app.use(cors())
app.use(express.json())

app.use('/usuarios', usuarios)
app.use('/productos', productos)

app.listen(PUERTO, () => {
  console.log(`Estamos en el servidor http://localhost:${PUERTO}`)
})