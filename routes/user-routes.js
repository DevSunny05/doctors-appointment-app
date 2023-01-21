const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
} = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// routes
// login || POST
router.post("/login", loginController);

// register
router.post("/register", registerController);

// Auth || POST
router.post("/getUserData", authMiddleware, authController);

// Apply doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// Notification || POST
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

// delete Notification || POST
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

// get all doctor to user
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

// book appointments
router.post("/book-appointment", authMiddleware, bookAppointmentController);
module.exports = router;
