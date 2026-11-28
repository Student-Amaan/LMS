const express = require("express");
const { registerStudentController } = require("./student.controller");
const authenticate = require("../../middlewares/auth.middleware");
const authorize = require("../../middlewares/authorization");

const studentRouter = express.Router();

studentRouter.post(
  "/students",
  authenticate,
  authorize("admin"),
  registerStudentController,
);

module.exports = studentRouter;
