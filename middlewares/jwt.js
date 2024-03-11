const jwt = require("jsonwebtoken");
const claveToken = process.env.claveTOKEN

const jwtValidator = async (req, res, next) => {
  const { accessToken } = req.body

  try {
    const verify = jwt.verify(accessToken, claveToken)

    if(verify){
      return next()
    }
  } catch (error) {
    res.json({
      message: "No autorizado"
    })
  }
}

module.exports = { jwtValidator }