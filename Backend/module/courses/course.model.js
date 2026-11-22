const { default: mongoose } = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      time: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enums: ["active", "archived"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
