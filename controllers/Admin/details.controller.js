const adminDetails = require("../../models/Admin/details.model.js");

const getDetails = async (req, res) => {
  try {
    let user = await adminDetails.find(req.body);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "No Admin Found" });
    }
    const data = {
      success: true,
      message: "Admin Details Found!",
      user,
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    let allAdmin = await adminDetails.find({});
    if (!allAdmin)
      return res
        .status(404)
        .json({ success: false, message: "Admin Not Added " });

    res.status(200).json({success:true, message:"Admin Find Successfully", allAdmin})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, message: "Internal Server Error" });
  }
};

const addDetails = async (req, res) => {
  try {
    let user = await adminDetails.findOne({ employeeId: req.body.employeeId });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Admin With This EmployeeId Already Exists",
      });
    }
    console.log(req.body)
    user = await adminDetails.create({
      ...req.body,
      profile: req.body.profile,
    });
    const data = {
      success: true,
      message: "Admin Details Added!",
      user,
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateDetails = async (req, res) => {
  try {
    let user;
    if (req.file) {
      user = await adminDetails.findByIdAndUpdate(req.params.id, {
        ...req.body,
        profile: req.file.filename,
      });
    } else {
      user = await adminDetails.findByIdAndUpdate(req.params.id, req.body);
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No Admin Found",
      });
    }
    const data = {
      success: true,
      message: "Updated Successfull!",
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteDetails = async (req, res) => {
  try {
    let user = await adminDetails.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No Admin Found",
      });
    }
    const data = {
      success: true,
      message: "Deleted Successfull!",
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getCount = async (req, res) => {
  try {
    let user = await studentDetails.count(req.body);
    const data = {
      success: true,
      message: "Count Successfull!",
      user,
    };
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

module.exports = {
  getDetails,
  addDetails,
  updateDetails,
  deleteDetails,
  getCount,
  getAllAdmins
};
