const express=require('express')
const { getDoctorInfoController, updateProfileController,getSingleDoctorController } = require('../controllers/doctor-controller')
const authMiddleware = require('../middlewares/authMiddleware')

const router=express.Router()


// post single doctor
router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController)

// post update profile
router.post('/updateProfile',authMiddleware,updateProfileController)

// get single DOC || POST
router.post('/getSingleDoctor',authMiddleware,getSingleDoctorController)

module.exports=router