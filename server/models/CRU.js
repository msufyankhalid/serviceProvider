// CRU Model (admin apnyyy technicians/CRU add karegaaaa...)

const mongoose = require("mongoose");

const cruSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    serviceType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceType",
      required: true
    },
    rating: {
      type: Number,
      default: 0
    },
    charge: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CRU", cruSchema);


