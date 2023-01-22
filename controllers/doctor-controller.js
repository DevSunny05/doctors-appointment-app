const appointmentModel = require('../models/appointment-model')
const doctorModel=require('../models/doctor-model')
const userModel = require('../models/user-model')

const getDoctorInfoController=async(req,res)=>{
    try {
        const doctor=await doctorModel.findOne({userId:req.body.userId})
        return res.status(200).json({
            success:true,
            message:"Data featch successfully",
            data:doctor
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success:false,
            message:"Error while featching data",
            error
        })
    }
}

// update profile controller
const updateProfileController=async(req,res)=>{
    try {
        const doctor=await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body)
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            data:doctor
        })
        
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success:false,
            message:"Error while updating profile",
            error
        })
    }
}

// get single doctor
const getSingleDoctorController=async(req,res)=>{
    try {
        const doctor=await doctorModel.findOne({_id:req.body.doctorId})
        return res.status(200).json({
            success:true,
            message:"Data fetch successfully",
            data:doctor
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success:false,
            message:"Error While feaching Account",
            error
        })
    }
}

// get appointment list

const doctorAppointmentsController=async(req,res)=>{
    try {
        const doctor=await doctorModel.findOne({userId:req.body.userId})
        const appointment=await appointmentModel.find({doctorId:doctor._id})
        return res.status(200).json({
            success:true,
            message:"Doctor appointment fetch successfully",
            data:appointment
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success:false,
            message:'Error while feaching doctor appointments',
            error
        })
    }
}

// update appointment status
const updateAppointmentStatusController=async(req,res)=>{
    try {
        const {appointmentsId,status}=req.body
        const appointments=await appointmentModel.findByIdAndUpdate(appointmentsId,{status})
        const user=await userModel.findOne({_id:appointments.userId})
        const notification=user.notification
        notification.push({
            type:'status updated',
            message:`Your appointment has been updated ${status}`,
            onClickPath:'/doctor-appointments',
        })
        await user.save()
        return res.status(200).json({
            success:true,
            message:"Appointment status updated",
            
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success:false,
            message:'Error in update status',
            error
        })
    }
}

module.exports={getDoctorInfoController,updateProfileController,getSingleDoctorController,doctorAppointmentsController,updateAppointmentStatusController}