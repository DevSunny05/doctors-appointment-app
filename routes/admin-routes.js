const express=require('express')
const { getAllUsersController, getAllDoctorsController,changeAccountStatusController } = require('../controllers/admin-controller')
const authMiddleware = require('../middlewares/authMiddleware')

const router=express.Router()

// get all users methods
router.get('/getAllUsers',authMiddleware,getAllUsersController)

// get all doctors
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)

// Account status POST
router.post('/changeAccountStatus',authMiddleware,changeAccountStatusController)

module.exports=router