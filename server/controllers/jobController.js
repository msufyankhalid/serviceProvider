const Job = require("../models/job");
const ServiceRequest = require("../models/ServiceRequest");
const CRU = require("../models/CRU");

// Assign Job - Only Admin can do
const assignJob = async (req, res) => {
  try {
    if (req.user.role !== "SuperAdmin" && req.user.role !== "SubAdmin") {
        return res.status(403).json({ msg: "Access denied" });
      }

    const { serviceRequest, assignedCRU } = req.body;
    // check serviceRequest exist krti yh ni
    const serviceReq = await ServiceRequest.findById(serviceRequest);
    if (!serviceReq) {
      return res.status(404).json({ msg: "Service Request not found" });
    }
// check CRU exist krta ha yh ni
    const cru = await CRU.findById(assignedCRU);
    if (!cru) {
      return res.status(404).json({ msg: "CRU not found" });
    }

     // already assigned? to ni..
    if (serviceReq.assignedCRU) {
      return res.status(400).json({ msg: "Job already assigned for this request" });
    }
    // create job
    const job = new Job({
      customer: serviceReq.customer,
      serviceRequest: serviceRequest,
      assignedCRU: assignedCRU,
      status: "Assigned"
    });
    await job.save();
    // update service request 
    serviceReq.assignedCRU = assignedCRU;
    serviceReq.status = "Started";
    await serviceReq.save();

    res.status(201).json({ msg: "Job assigned successfully", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// Mark job as In Progress when.. (Customer ka clicks Start button pa krna h isy (remember sufyan...))
const markJobInProgress = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    if (job.status !== "Assigned") {
      return res.status(400).json({ msg: "Job must be assigned before starting" });
    }

    job.status = "InProgress";
    await job.save();

    res.status(200).json({ msg: "Job marked as In Progress", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// Mark kiya job ko Completed when..> (Customer clicks Complete button)
const markJobCompleted = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    if (job.status !== "InProgress") {
      return res.status(400).json({ msg: "Job must be in progress to complete it" });
    }

    job.status = "Completed";
    await job.save();

    res.status(200).json({ msg: "Job marked as Completed", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// exports..
module.exports = {
  assignJob,
  markJobInProgress,
  markJobCompleted
};

