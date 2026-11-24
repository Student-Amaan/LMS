const express = require("express");
const authenticate = require("../../middlewares/auth.middleware");
const {
  createCourseController,
  getCoursesController,
  getSingleCourseController,
  updateCourseController,
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

courseRouter.get(
  "/courses/:id",
  authenticate,
  authorize("admin"),
  getSingleCourseController,
);

courseRouter.patch(
  "/courses/:id/update",
  authenticate,
  authorize("admin"),
  updateCourseController,
);
module.exports = courseRouter;
