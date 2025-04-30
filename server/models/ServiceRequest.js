const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    serviceType: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "ServiceType", 
     required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "Started", "Completed"],
      default: "Pending"
    },
    assignedCRU: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CRU",   // yh jb admin assign kryga..
      default: null
    },

    customerExpectedRate: {
      type: Number,
      required: true
    },    

    isSeenByAdmin: {
      type: Boolean,
      default: false   // default false rakhn gyjab admin dekhe to true kary gy..
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);


