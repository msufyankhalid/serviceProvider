const Feedback = require("../models/Feedback");
const Job = require("../models/job");

//submit feedback (customer only)
const submitFeedback = async (req, res) => {
  try {
    const { jobId, rating, comment } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }
    // Check if user is same as jobs customer
    if (job.customer.toString() !== req.user.id) {
      return res.status(403).json({ msg: "You are not allowed to give feedback for this job" });
    }

    if (job.status !== "Completed") {
      return res.status(400).json({ msg: "Feedback can only be given for completed jobs" });
    }
// Save kiya feedback
    const feedback = new Feedback({
      customer: job.customer,
      cru: job.assignedCRU,
      rating,
      comment
    });

    await feedback.save();

    res.status(201).json({ msg: "Feedback submitted successfully", feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

//  get all feedbacks (admin only)
const getAllFeedbacks = async (req, res) => {
  try {
    if (req.user.role !== "SuperAdmin" && req.user.role !== "SubAdmin") {
        return res.status(403).json({ msg: "Access denied" });
      }

    const feedbacks = await Feedback.find()
      .populate("customer", "name email")
      .populate("cru", "name");

    res.status(200).json({ total: feedbacks.length, feedbacks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  submitFeedback,
  getAllFeedbacks
};
