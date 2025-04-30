const express = require("express");
const router = express.Router();
const { getAdminDashboardStats } = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/admin/stats", authMiddleware, getAdminDashboardStats);

module.exports = router;
