const AppError = require("../../utils/app-error");
const Course = require("./course.model");

function normalizeName(name) {
  return name.trim().toLowerCase();
}

const createCourse = async (data) => {
  if (!data) {
    throw new AppError("Please fill all the required fields", 400);
  }
  const { name, description, duration } = data;
  if (!name || !duration) {
    throw new AppError("Please fill all the required fields", 400);
  }
  const normalizedName = normalizeName(name);
  const courseExist = await Course.findOne({ name: normalizedName });
  if (courseExist) {
    throw new AppError("Course Already exists");
  }

  const course = await Course.create({
    name: normalizedName,
    description,
    duration,
  });
  return course;
};

const getCourses = async () => {
  const courses = await Course.find();
  if (courses.length === 0) {
    throw new AppError("No course found", 404);
  }
  return courses;
};

const getSingleCourse = async (id) => {
  const course = await Course.findById(id);
  if (!course) {
    throw new AppError("Course not found", 404);
  }
  return course;
};


const updateCourse = async (id, data) => {
  // 1. Check if data is provided
  if (!data) {
    throw new AppError("Please provide some data", 400);
  }

  // 2. Check if data is empty
  if (Object.keys(data).length === 0) {
    throw new AppError("At least one field is required to update", 400);
  }

  // 3. Validate allowed fields
  const allowedFields = ["name", "description", "duration"];

  const invalidFields = Object.keys(data).filter(
    (field) => !allowedFields.includes(field),
  );

  if (invalidFields.length > 0) {
    throw new AppError(`Invalid fields: ${invalidFields.join(", ")}`, 400);
  }

  // 4. Find existing course
  const course = await Course.findById(id);

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  // 5. Extract data
  const { name, description, duration } = data;

  // 6. Check duplicate course name
  if (name !== undefined) {
    const normalizedName = normalizeName(name);

    const courseExist = await Course.findOne({
      name: normalizedName,
      _id: { $ne: course._id },
    });

    if (courseExist) {
      throw new AppError("Course name already exists", 409);
    }

    course.name = normalizedName;
  }

  // 7. Update description
  if (description !== undefined) {
    course.description = description;
  }

  // 8. Update duration
  if (duration !== undefined) {
    course.duration = duration;
  }

  // 9. Save updated course
  await course.save();

  // 10. Return updated course
  return course;
};


module.exports = { createCourse, getCourses, getSingleCourse, updateCourse };
