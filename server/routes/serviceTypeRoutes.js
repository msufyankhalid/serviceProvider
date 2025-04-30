const express = require("express");
const router = express.Router();
const {
  createServiceType,
  getAllServiceTypes,
  updateServiceType,
  deleteServiceType
} = require("../controllers/serviceTypeController");

const authMiddleware = require("../middleware/authMiddleware");

// ................  .............//
router.post("/create", authMiddleware,createServiceType);
router.get("/get",authMiddleware, getAllServiceTypes);
router.put("/update/:id", authMiddleware, updateServiceType);
router.delete("/delete/:id",authMiddleware, deleteServiceType);

module.exports = router;
