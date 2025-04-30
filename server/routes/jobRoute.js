const express = require("express");
const router = express.Router();
const { assignJob,markJobInProgress, markJobCompleted } = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");

// admin assign jobs
router.post("/assign", authMiddleware, assignJob);

// Mark job as In Progress customer click Start
router.put("/:jobId/In-Progress", authMiddleware, markJobInProgress);

// Mark job as Completed customer click Complete
router.put("/:jobId/complete", authMiddleware, markJobCompleted);

module.exports = router;

