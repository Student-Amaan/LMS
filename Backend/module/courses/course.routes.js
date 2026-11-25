const express = require("express");
const authenticate = require("../../middlewares/auth.middleware");
const {
  createCourseController,
  getCoursesController,
  getSingleCourseController,
  updateCourseController,
  archiveCourseController,
  activateCourseController,
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

courseRouter.patch(
  "/courses/:id/archive",
  authenticate,
  authorize("admin"),
  archiveCourseController,
);

courseRouter.patch(
  "/courses/:id/active",
  authenticate,
  authorize("admin"),
  activateCourseController,
);
module.exports = courseRouter;
