const AppError = require("../../utils/app-error");
const { generateJwt } = require("../../utils/jwt");
const Admin = require("../admin/admin.model");
const bcrypt = require("bcryptjs");


const login = async (data) => {
  if (!data) {
    throw new AppError("All fields required", 400)
  }
  const { email, password } = data;
  if (!email || !password) {
    throw new AppError("All fields are required", 400);
  }

  const normalizeEmail = email.trim().toLowerCase();
  const admin = await Admin.findOne({ email: normalizeEmail });
  if (!admin) {
    throw new AppError("invalid email", 404);
  }
  const isPasswordCorrect = await bcrypt.compare(password, admin.password)
  if(!isPasswordCorrect){
    throw new AppError("invalid password", 403)
  }

  const token = generateJwt({
    userId: admin._id,
    role: admin.role
  })

  return {admin, token}
};



module.exports = login;
