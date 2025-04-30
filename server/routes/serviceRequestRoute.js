const express = require("express");
const router = express.Router();

const {
  createServiceRequest,
  getMyServiceRequests,
  getAllServiceRequests,
  updateServiceRequest,
  deleteServiceRequest,
  getUnseenRequests,
  markRequestsAsSeen
} = require("../controllers/serviceRequestController");

const authMiddleware = require("../middleware/authMiddleware");

// .........Main Routes ..........//
router.post("/create", authMiddleware, createServiceRequest);
router.get("/my", authMiddleware, getMyServiceRequests);
router.get("/all", authMiddleware, getAllServiceRequests);
router.put("/update/:id", authMiddleware, updateServiceRequest);
router.delete("/delete/:id", authMiddleware, deleteServiceRequest);

//......Notification Routes ......../
router.get("/notifications/unseen", authMiddleware, getUnseenRequests);
router.put("/notifications/mark-seen", authMiddleware, markRequestsAsSeen);

module.exports = router;
