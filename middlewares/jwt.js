const jwt = require("jsonwebtoken");
const claveToken_IS = process.env.claveTOKEN_IS
const claveToken_FP = process.env.claveTOKEN_RC

const jwtValidator = async (req, res, next) => {
  const { accessToken } = req.body

  try {
    const verify = jwt.verify(accessToken, claveToken_IS)

    if(verify){
      return next()
    }
  } catch (error) {
    res.json({
      message: "No autorizado",
      status: 500
    })
  }
}

const jwtValidator_FP = async (req, res, next) => {
  const { forgotPasswordToken } = req.body

  try {
    const verifyToken = jwt.verify(forgotPasswordToken, claveToken_FP)

    if(verifyToken){
      return next()
    }
  } catch (error) {
    res.json({
      message: "Token invalido o inexistente",
      status: 500
    })
  }
}

module.exports = { jwtValidator, jwtValidator_FP }