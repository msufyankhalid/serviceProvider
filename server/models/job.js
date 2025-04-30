//.. Job Model (admin ka section kaam manage krny k liye) ..//

const mongoose = require("mongoose");

  const jobSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    serviceRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequest",
      required: true
     },
    assignedCRU: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CRU",
      required: true
     },
    status: {
      type: String,
      enum: ["Incoming", "Assigned","InProgress", "Completed"],
      default: "Incoming"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);


