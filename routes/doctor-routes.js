const express = require("express");
const {
  getDoctorInfoController,
  updateProfileController,
  getSingleDoctorController,
  doctorAppointmentsController,
  updateAppointmentStatusController
} = require("../controllers/doctor-controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// post single doctor
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

// post update profile
router.post("/updateProfile", authMiddleware, updateProfileController);

// get single DOC || POST
router.post("/getSingleDoctor", authMiddleware, getSingleDoctorController);

// get appointments list
router.get("/doctor-appointments",authMiddleware,doctorAppointmentsController);

// post update appointment status
router.post('/update-appointmentStatus',authMiddleware,updateAppointmentStatusController)


module.exports = router;
