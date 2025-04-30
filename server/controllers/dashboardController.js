const ServiceRequest = require("../models/ServiceRequest");
const Job = require("../models/job");

const getAdminDashboardStats = async (req, res) => {
  try {
  //role check kiua admin ha ka ni
  if (req.user.role !== "SuperAdmin" && req.user.role !== "SubAdmin") {
    return res.status(403).json({ msg: "Access denied" });
  }

    // Pending wali service requests (incoming jobs)
    const incomingCount = await ServiceRequest.countDocuments({ status: "Pending" });

    // Assigned jobs
    const assignedCount =await Job.countDocuments({ status:"Assigned" });

     // In progress jobs
    const inProgressCount = await Job.countDocuments({ status: "InProgress" });

   // Completed jobs
    const completedCount =await Job.countDocuments({ status: "Completed" });

    res.status(200).json({
      incoming: incomingCount,
      assigned: assignedCount,
      inProgress: inProgressCount,
      completed: completedCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Errrror" });
  }
};

module.exports = {
   getAdminDashboardStats
};

