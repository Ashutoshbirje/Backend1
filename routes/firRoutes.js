const express = require("express");
const router = express.Router();
const FirReport = require("../models/FirReport");
const verifyToken = require("../middleware/authMiddleware");

// Submit FIR
router.post("/report", verifyToken, async (req, res) => {
  try {
    const fir = new FirReport(req.body);
    await fir.save();
    res.status(201).json({ message: "FIR submitted successfully", fir });
  } catch (err) {
    res.status(400).json({ error: "Submission failed", details: err });
  }
});

// View all reports
router.get("/AllReport", verifyToken, async (req, res) => {
  try {
    const reports = await FirReport.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Fetching reports failed" });
  }
});

module.exports = router;
