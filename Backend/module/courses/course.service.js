const AppError = require("../../utils/app-error");
const Course = require("./course.model");

function normalizeName(name){
  return name.trim().toLowerCase()
}

const createCourse = async(data) => {
  if(!data){
    throw new AppError("Please fill all the required fields", 400)
  }
  const {name, description, duration} = data
  if(!name || !duration){
    throw new AppError("Please fill all the required fields", 400)
  }
  const normalizedName = normalizeName(name);
  const courseExist = await Course.findOne({name: normalizedName});
  if(courseExist){
    throw new AppError("Course Already exists")
  }

  const course = await Course.create({
    name: normalizedName,
    description,
    duration
  });
  return course
}

const getCourses = async() => {
  const courses = await Course.find();
  if(courses.length === 0){
    throw new AppError("No course found", 404)
  }
  return courses
}

module.exports = {createCourse, getCourses}