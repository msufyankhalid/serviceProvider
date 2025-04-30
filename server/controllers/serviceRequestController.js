const ServiceRequest = require("../models/ServiceRequest");

//........... Create Service Request ..................//
exports.createServiceRequest = async (req, res) => {
  try {
    const { serviceType, description , customerExpectedRate } = req.body;

    const newRequest = new ServiceRequest({
      customer: req.user.id, // jo abhi login hua user hai
      serviceType,  // ab ye ObjectId hoga ServiceType ka
      customerExpectedRate,
      isSeenByAdmin: false   // notification purpose
    });

    await newRequest.save();

    res.status(201).json({ msg: "Service request created", request: newRequest });
  } catch (error) {
    console.error("Error creating service request:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

//........... Get All Requests by Customer (only his own).............//
exports.getMyServiceRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find({ customer: req.user.id })
    .populate("assignedCRU", "name")
    .populate("serviceType", "name"); 
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching service requests:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

//............. Get All Requests (Admin can view all).............//
exports.getAllServiceRequests = async (req, res) => {
  try {
    if (req.user.role !== "SuperAdmin" && req.user.role !== "SubAdmin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const allRequests = await ServiceRequest.find()
      .populate("customer", "name email")
      .populate("assignedCRU", "name")
      .populate("serviceType", "name"); 

    res.status(200).json(allRequests);
  } catch (error) {
    console.error("Error fetching all requests:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

//......... Get Unseen Requests (for Admin notification) ..............//
exports.getUnseenRequests = async (req, res) => {
  try {
    if (req.user.role !== "SuperAdmin" && req.user.role !== "SubAdmin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const unseen = await ServiceRequest.find({ isSeenByAdmin: false })
      .populate("customer", "name email");

    res.status(200).json(unseen);
  } catch (error) {
    console.error("Error fetching unseen requests:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

//.......... Mark Requests as Seen by Admin ...........//
exports.markRequestsAsSeen = async (req, res) => {
  try {
    if (req.user.role !== "SuperAdmin" && req.user.role !== "SubAdmin") {
      return res.status(403).json({ msg: "Access denied" });
    }

     await ServiceRequest.updateMany({ isSeenByAdmin: false }, { $set: { isSeenByAdmin: true } });

 res.status(200).json({ msg: "All requests marked as seen" });
  } catch (error) {
    console.error("Error marking requests as seen:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

//........... Update Request (Only owner and only if not assigned) .........//
exports.updateServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { serviceType, description } = req.body;

    const request = await ServiceRequest.findById(id);
    if (!request) return res.status(404).json({ msg: "Request not found" });

    if (request.customer.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not allowed to update this request" });
    }

    if (request.assignedCRU) {
      return res.status(400).json({ msg: "Can't update. CRU already assigned." });
    }

    request.serviceType = serviceType;
    request.description = description;

    await request.save();

    res.status(200).json({ msg: "Request updated", request });
  } catch (error) {
    console.error("Error updating request:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

//......... Delete Request (Admin or Customer - both can delete) ...........//
exports.deleteServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await ServiceRequest.findById(id);
    if (!request) return res.status(404).json({ msg: "Request not found" });

    // Only owner or admin can delete
    if (
      req.user.id !== request.customer.toString() &&
      req.user.role !== "SuperAdmin" &&
      req.user.role !== "SubAdmin"
    ) {
      return res.status(403).json({ msg: "Not authorized to delete this request" });
    }

    await request.deleteOne();

    res.status(200).json({ msg: "Request deleted successfully" });
  } catch (error) {
    console.error("Error deleting request:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};
