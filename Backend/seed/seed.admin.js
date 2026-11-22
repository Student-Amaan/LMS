const Admin = require("../module/admin/admin.model");

const registerAdmin = async () => {
  try {
    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const isAdminExists = await Admin.findOne({ email });
    if (isAdminExists) {
      return console.log("email already exists")
    }
    await Admin.deleteMany({})
    const newAdmin = await Admin.create({
      name,
      email,
      password,
    });
    console.log("Admin created successfully", newAdmin)
  } catch (error) {
    console.log("error creating admin", error);
    throw error
  }
};

module.exports = registerAdmin;
