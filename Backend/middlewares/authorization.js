const AppError = require("../utils/app-error");

const authorize = (...allowedRoles) => { //["admin"]
  return (req, res, next) => {
    if(!req.user || !allowedRoles.includes(req.user.role)){
      throw new AppError("Unauthorized user", 403)
    }
    next()
  }
}

module.exports = authorize;