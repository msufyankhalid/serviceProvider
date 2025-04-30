const express = require("express");
const router = express.Router();
const { createCRU, getAllCRUs, updateCRU,deleteCRU} = require("../controllers/cruController");

const authMiddleware = require("../middleware/authMiddleware");

//Admin can access all routes (authMiddleware check lag chuka hu ma controller me)
router.post("/create", authMiddleware, createCRU);
router.get("/all", authMiddleware, getAllCRUs);
router.put("/update/:id", authMiddleware, updateCRU);
router.delete("/delete/:id", authMiddleware, deleteCRU);

module.exports = router;
