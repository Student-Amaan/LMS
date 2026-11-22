require("dotenv").config();
const { default: mongoose } = require("mongoose");
const connectDB = require("./config/db");
const registerAdmin = require("./seed/seed.admin");

const seedAdmin = async() => {
  try {
    await connectDB()
    await registerAdmin()
    await mongoose.disconnect();
    console.log("seeding completed")
  } catch (error) {
    console.error("error seeding admin", error)
    await mongoose.disconnect()
    process.exit(1)
  }
}

seedAdmin()
