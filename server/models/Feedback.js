// Feedback Model (jb custmer ka kaam complt ho to hmny feedback dena ha) 

const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    cru: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CRU",
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);

