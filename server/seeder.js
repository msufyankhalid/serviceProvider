const User = require("./models/Users"); // . ka matlab ek folder peechay jao
const bcrypt = require("bcryptjs");

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const name = "Super Admin";
    const email = "admin@gmail.com";
    const password = "admin1234";
    

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const adminUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "SuperAdmin",
    });

    await adminUser.save();
    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error creating admin user:", error.message);
  }
};

module.exports = createAdmin;


