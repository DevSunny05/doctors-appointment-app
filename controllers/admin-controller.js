const doctorModel=require('../models/doctor-model')
const userModel=require('../models/user-model')

const getAllUsersController=async(req,res)=>{
    try {
        const users=await userModel.find({})
        return res.status(200).json({
            success:true,
            message:"Successfully Fetch",
            data:users
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while featching users",
            error
        })
    }
}

const getAllDoctorsController=async(req,res)=>{
    try {
        const doctors=await doctorModel.find({})
        return res.status(200).json({
            success:true,
            message:"Successfully fetch data",
            data:doctors
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'Error while featching data',
            error
        })
    }
}

// change account status
const changeAccountStatusController=async(req,res)=>{
    try {
        const {doctorId,status}=req.body
        const doctor=await doctorModel.findByIdAndUpdate(doctorId,{status})
        const user=await userModel.findOne({_id:doctor.userId})
        const notification=user.notification
        notification.push({
            type:"doctors-account-request-updated",
            message:`Your doctor account request has ${status}`,
            onClickPath:'/notification'
        })
        user.isDoctor=status === 'approved' ? true : false;
        await user.save()
        return res.status(201).json({
            success:true,
            message:"Account Status Updated",
            data:doctor
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success:false,
            message:"Error while changing status",
            error
        })
    }
}

module.exports={getAllUsersController,getAllDoctorsController,changeAccountStatusController}