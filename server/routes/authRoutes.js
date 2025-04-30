const express = require("express");
const router = express.Router();
const { register, login ,  createSubAdmin} = require("../controllers/authControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

// Super Admin can create sub-admins
router.post("/create-subadmin", authMiddleware, createSubAdmin);

module.exports = router;
