const jwt = require("jsonwebtoken");
const claveToken_IS = process.env.claveTOKEN_IS

const jwtValidator = async (req, res, next) => {
  const { accessToken } = req.body

  try {
    const verify = jwt.verify(accessToken, claveToken_IS)

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