const ServiceType = require("../models/ServiceType");

//.............. Create Service Type..................//
exports.createServiceType = async (req, res) => {
  try {
    if (req.user.role !== "SuperAdmin" && req.user.role !== "SubAdmin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { name } = req.body;

    const existing = await ServiceType.findOne({ name });
     if (existing)  {
      return res.status(400).json({ msg: "Service type already exists" });
    }

    const newService = new ServiceType({ name });
    await newService.save();

  res.status(201).json({ msg: "Service type created", service: newService });
  } catch (err) {
    console.error("Error creating service type", err.message);
    res.status(500).json({ msg: "Server error" });
   }
};

//............ Read All Service Types ............//
exports.getAllServiceTypes = async (req, res) => {
  try {
    const services = await ServiceType.find();
    res.status(200).json(services);
  } catch (err) {
    console.error("Error fetching service types", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

//........... Update Service Type ..........//
exports.updateServiceType = async (req, res) => {
  try {
    if (req.user.role !== "SuperAdmin" && req.user.role !== "SubAdmin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { id } = req.params;
    const { name } = req.body;

    const updated = await ServiceType.findByIdAndUpdate(id, { name }, { new: true });

    if (!updated) {
      return res.status(404).json({ msg: "Service type not found" });
    }

    res.status(200).json({ msg: "Service type updated", service: updated });
  } catch (err) {
    console.error("Error updating service type", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

//.........Delete service type ..............//
exports.deleteServiceType = async (req, res) => {
  try {
    if (req.user.role !== "SuperAdmin" && req.user.role !== "SubAdmin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { id } = req.params;

    const deleted = await ServiceType.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ msg: "Service type not found" });
    }

    res.status(200).json({ msg: "Service type deleted" });
  } catch (err) {
    console.error("Error deleting service type", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
