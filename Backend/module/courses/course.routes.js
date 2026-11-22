const express = require("express");
const authenticate = require("../../middlewares/auth.middleware");
const {
  createCourseController,
  getCoursesController,
} = require("./course.controller");
const authorize = require("../../middlewares/authorization");

const courseRouter = express.Router();

courseRouter.post(
  "/courses",
  authenticate,
  authorize("admin"),
  createCourseController,
);

courseRouter.get(
  "/courses",
  authenticate,
  authorize("admin"),
  getCoursesController,
);
module.exports = courseRouter;
