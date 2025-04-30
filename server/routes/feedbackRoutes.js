const express = require("express");
const router = express.Router();
const { submitFeedback , getAllFeedbacks} = require("../controllers/feedbackController");
const authMiddleware = require("../middleware/authMiddleware"); // login check

router.post("/submit", authMiddleware, submitFeedback);
router.get("/all", authMiddleware, getAllFeedbacks);

module.exports = router;
