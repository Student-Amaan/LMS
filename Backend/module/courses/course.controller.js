const {
  createCourse,
  getCourses,
  getSingleCourse,
  updateCourse
} = require("./course.service");

const createCourseController = async (req, res) => {
  const course = await createCourse(req.body);
  return res.status(201).json({ success: true, data: course });
};

const getCoursesController = async (req, res) => {
  const courses = await getCourses();
  return res.status(200).json({ success: true, data: courses });
};

const getSingleCourseController = async (req, res) => {
  const {id} = req.params;
  const course = await getSingleCourse(id);
  return res.status(200).json({ success: true, data: course, message: "done an" });
};

const updateCourseController = async(req, res) => {
  const {id} = req.params;
  const course = await updateCourse(id, req.body);
  return res.status(200).json({success: true, data: course})
}

module.exports = {
  createCourseController,
  getCoursesController,
  getSingleCourseController,
  updateCourseController
};
