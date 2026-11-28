const AppError = require("../../utils/app-error");
const normalizeField = require("../../utils/normalize-function");
const Student = require("./studen.model");

const registerStudent = async (data) => {
  if (!data) {
    throw new AppError("Please provide some data", 400);
  }
  const { fullName, email, contactNumber, address } = data;

  if (!fullName || !email || !contactNumber) {
    throw new AppError("Please fill the required fields", 400);
  }
  const normalizedEmail = normalizeField(email);
  const studentExists = await Student.findOne({ email: normalizedEmail });
  if (studentExists) {
    throw new AppError("Email already exists", 409);
  }
  const student = await Student.create({
    fullName,
    email: normalizedEmail,
    contactNumber,
    address
  });
  return student;
};


module.exports = {
  registerStudent
}