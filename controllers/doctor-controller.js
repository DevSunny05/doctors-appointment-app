const doctorModel=require('../models/doctor-model')

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

module.exports={getDoctorInfoController,updateProfileController}