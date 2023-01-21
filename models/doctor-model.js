const mongoose=require('mongoose')

const doctorSchema=mongoose.Schema({
    userId:{
        type:String
    },
    firstName:{
        type:String,
        required:[true,'first name is require']
    },
    lastName:{
        type:String,
        required:[true,'last name is require']
    },
    phone:{
        type:String,
        required:[true,'phone number is require']
    },
    email:{
        type:String,
        required:[true,'email is require']
    },
    website:{
        type:String,
    },
    address:{
        type:String,
        required:[true,'address is require']
    },
    specialization:{
        type:String,
        required:[true,'specialization is require']
    },
    experience:{
        type:String,
        required:[true,'experience is require']
    },
    feesPerConsultation:{
        type:Number,
        required:[true,'fees is require']
    },
    status:{
        type:String,
        default:'pending'
    },
    timings:{
        type:Object,
        required:[true,'work timing is require']
    },
},{timesStamps:true})

const doctorModel=mongoose.model('doctors',doctorSchema)
module.exports=doctorModel