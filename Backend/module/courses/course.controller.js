const {createCourse, getCourses}= require("./course.service");

const createCourseController = async(req, res) => {
  const course = await createCourse(req.body);
  return res.status(201).json({success: true, data: course})
}

const getCoursesController = async(req, res) => {
  const courses = await getCourses()
  return res.status(200).json({success: true, data: courses})
}

module.exports = {createCourseController, getCoursesController};