const asyncWraper = require("../../utils/error-handler");
const { registerStudent } = require("./sudent.service");

const registerStudentController = async(req, res) => {
  const student = await registerStudent(req.body);
  return res.status(201).json({success: true, data: student});
}

module.exports = {
  registerStudentController: asyncWraper(registerStudentController)
}