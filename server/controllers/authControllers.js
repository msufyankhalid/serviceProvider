const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

  // Register user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

// check user exist krta
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ msg: "User already exists" });

    // hash kiuya  password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

  // create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      
    });

    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

//..................................................................//

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email" });

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    // create token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Error:", error.message); 
    res.status(500).json({ msg: "Server error" });
  }
  
};
// ................................................... //

// Create SubAdmin (Only SuperAdmin)
exports.createSubAdmin = async (req, res) => {
  try {
    // Check if requester is SuperAdmin
    if (req.user.role !== "SuperAdmin") {
      return res.status(403).json({ msg: "Access denied. Only SuperAdmin can add Admins." });
    }

    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new User({
      name,
      email,
      password: hashedPassword,
      role: "SubAdmin" //  set role
    });

    await newAdmin.save();

    res.status(201).json({ msg: "Sub Admin created successfully", user: newAdmin });
  } catch (error) {
    console.error("Create SubAdmin Error:", error.message); 
    res.status(500).json({ msg: "Server error" });
  }
};

