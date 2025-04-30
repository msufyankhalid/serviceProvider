const CRU = require("../models/CRU");

//............. CREATE CRU (Only Admin) ................//
const createCRU = async (req, res) => {
  try {
    if (req.user.role !== "SuperAdmin" && req.user.role !== "SubAdmin") {
      return res.status(403).json({ msg: "Access denied" });
    }

  const { name, serviceType, charge, rating } = req.body;
     const newCRU = new CRU({ name, serviceType, charge, rating });
      await newCRU.save();

    res.status(201).json({ msg: "CRU added successfullyy", cru: newCRU });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something wents wrong" });
  }
};

//.............. GET all CRUs ................//
const getAllCRUs = async (req, res) => {
  try {

    if (req.user.role !== "SuperAdmin" && req.user.role !== "SubAdmin") {
      return res.status(403).json({ msg: "Access denied" });
    }
    const crus = await CRU.find();
    res.status(200).json(crus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

//.............. UPDATE CRU by Id (Only Admin) ...................//
const updateCRU = async (req, res) => {
  try {
    if (req.user.role !== "SuperAdmin" && req.user.role !== "SubAdmin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { id } = req.params;
    const updatedCRU = await CRU.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedCRU) {
      return res.status(404).json({ msg: "CRU not found" });
    }

    res.status(200).json({ msg: "CRU updated successfully", cru: updatedCRU });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

//............... DELETE CRU by id (Only Admin)................//
const deleteCRU = async (req, res) => {
  try {
    if (req.user.role !== "SuperAdmin" && req.user.role !== "SubAdmin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { id } = req.params;
  const deletedCRU = await CRU.findByIdAndDelete(id);

    if (!deletedCRU) {
      return res.status(404).json({ msg: "CRU not found" });
    }

    res.status(200).json({ msg: "CRU deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

 module.exports = {
    createCRU,
    getAllCRUs,
   updateCRU,
   deleteCRU
 };
