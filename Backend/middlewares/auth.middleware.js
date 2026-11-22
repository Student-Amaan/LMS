const AppError = require("../utils/app-error")
const { verifyJwt } = require("../utils/jwt")


const authenticate = async(req, res, next) => {
  const token = req.cookies.accessToken;
  if(!token){
    throw new AppError("Athentication required", 401)
  }
  try {
    const decode = verifyJwt(token)
    req.user = {
      id: decode.sub,
      role: decode.role
    }
    next()
  } catch (error) {
    throw new AppError("invalid or expired token", 401)
  }
}

module.exports = authenticate