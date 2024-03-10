const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.listen(8000, () => {
  console.log(`Estamos en el servidor http://localhost:${8000}`)
})