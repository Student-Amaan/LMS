function asyncWraper(fun){
  return (req, res, next) => {
    return fun(req, res, next).catch(err => next(err))
  }
}

module.exports = asyncWraper