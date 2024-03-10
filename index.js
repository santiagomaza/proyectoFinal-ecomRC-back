const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const PUERTO = process.env.PORT
require('./database/db.js')

app.use(cors())
app.use(express.json())

app.listen(PUERTO, () => {
  console.log(`Estamos en el servidor http://localhost:${PUERTO}`)
})