const jwt = require("jsonwebtoken");

const generateJwt = ({ userId, role }) => {
  const payload = {
    sub: userId,
    role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || "30m",
  });
};

const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
  generateJwt,
  verifyJwt
}