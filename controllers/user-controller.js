const userModel=require('../models/user-model')
const doctorModel=require('../models/doctor-model')
const appointmentModel=require('../models/appointment-model')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


// login callback
const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(200).json({message:'User not found',success:false})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(200).json({message:'Invalid Email and Password',success:false})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.status(200).json({message:'Login Successful',success:true,token})
    } catch (error) {
        return res.status(404).json({message:`Error in loging ${error}`,success:false})
    }
}

// register callback
const registerController=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const existingUser=await userModel.findOne({email,password})
        if(existingUser){
            return res.status(201).json({message:`User already exist`,success:false})
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        req.body.password=hashedPassword;

        const newUser=await userModel(req.body)
        await newUser.save()

        return res.status(200).json({message:'User Registered Successfully',success:true})
    } catch (error) {
        console.log(error)
        return res.status(404).json({message:`Register Controller ${error} `})
    }
}

// auth controller
const authController=async(req,res)=>{
    try {
        
        const user=await userModel.findById({_id:req.body.userId})
        user.password =undefined
        if(!user){
            return res.status(200).send({
                message:"User not found",
                success:false
            })
        }else{
            return res.status(200).send({
                data:user,
                success:true
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({message:'auth error',success:false,error})
    }
}

// apply doctor 
const applyDoctorController=async(req,res)=>{
    try {
        const newDoctor=await doctorModel({...req.body,status:'pending'})
        await newDoctor.save()
        const adminUser=await userModel.findOne({isAdmin:true})
        const notification=adminUser.notification
        notification.push({
            type:"Apply-Doctor-request",
            message:`${newDoctor.firstName} ${newDoctor.lastName} Has Apply For Doctor Account`,
            doctorId:newDoctor._id,
            name:newDoctor.firstName+" "+newDoctor.lastName,
            onClickPath:'/admin/doctors'
        })
        await userModel.findByIdAndUpdate(adminUser._id,{notification})
        return res.status(201).json({
            success:true,
            message:"Doctor Account Applied Successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            error,
            message:'Error While applying for Doctor'
        })
    }
}

// Notification controller
const getAllNotificationController=async(req,res)=>{
    try {
        const user=await userModel.findOne({_id:req.body.userId})
        const seenNotification=user.seenNotification
        const notification=user.notification
        seenNotification.push(...notification)
        user.notification=[]
        user.seenNotification=notification
        const updatedUser=await user.save()
        return res.status(200).json({
            success:true,
            message:"All Notification mark as read",
            data:updatedUser
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success:false,
            message:"Error in Notification",
            error
        })
    }
}

// delete notification
const deleteAllNotificationController=async(req,res)=>{
    try {
        const user=await userModel.findOne({_id:req.body.userId})
        user.notification=[]
        user.seenNotification=[]
        const updateUser=await user.save()
        updateUser.password=undefined

        return res.status(201).json({
            success:true,
            message:'Notification Deleted Successfully',
            data:updateUser
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success:false,
            message:"Unable to delete Notification",
            error
        })
    }
}

// get all doctors to user
const getAllDoctorsController=async(req,res)=>{
    try {
        const doctor=await doctorModel.find({status:"approved"})
        return res.status(200).json({
            success:true,
            message:"Successfully fetch the data",
            data:doctor
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success:false,
            message:"Error unable to fetch data",
            error
        })
    }
}

// book appointment
const bookAppointmentController=async(req,res)=>{
    try {
        req.body.status='pending'
        const newAppointment=new appointmentModel(req.body)
        await newAppointment.save()
        const user=await userModel.findOne({_id:req.body.doctorInfo.userId})
        user.notification.push({
            type:'New-appointment-request',
            message:`A new appointment request from ${req.body.userInfo.name}`,
            onClickPath:'/user/appointments',
        })
        await user.save()
        return res.status(200).json({
            success:true,
            message:"Appointment Book successfuly",
            
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success:false,
            message:'Error While booking appointment',
            error
        })
    }
}

module.exports={loginController,registerController,authController,applyDoctorController,getAllNotificationController,deleteAllNotificationController,getAllDoctorsController,bookAppointmentController}