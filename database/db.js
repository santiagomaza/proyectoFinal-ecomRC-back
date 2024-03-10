const mongoose = require('mongoose');
const DB = process.env.DB

const connectDB = async () => {
  try {
    await mongoose.connect(DB)
    console.log("Conexión exitosa a la base de datos")
  } catch (error) {
    console.error(error)
  }
}

connectDB()

module.exports = { connectDB }