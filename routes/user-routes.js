const express=require('express')
const { loginController, registerController, authController,applyDoctorController,getAllNotificationController,deleteAllNotificationController } = require('../controllers/user-controller')
const authMiddleware = require('../middlewares/authMiddleware')

const router=express.Router()

// routes
// login || POST
router.post('/login',loginController)

// register 
router.post('/register',registerController)

// Auth || POST
router.post('/getUserData',authMiddleware,authController)

// Apply doctor || POST
router.post('/apply-doctor',authMiddleware,applyDoctorController)

// Notification || POST
router.post('/get-all-notification',authMiddleware,getAllNotificationController)

// delete Notification || POST
router.post('/delete-all-notification',authMiddleware,deleteAllNotificationController)

module.exports=router