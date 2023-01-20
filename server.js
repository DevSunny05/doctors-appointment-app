const express=require('express')
const mongoose=require('mongoose')
const colors=require('colors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const connectDB = require('./config/db')

// config
dotenv.config()


// mongodb connection
mongoose.set('strictQuery', true)
connectDB();


// rest obj
const app=express();


// middlewares
app.use(express.json())
app.use(morgan('dev'))


// routes
// user routes
app.use('/api/v1/user',require('./routes/user-routes'))

// addmin routes
app.use('/api/v1/admin',require('./routes/admin-routes'))

// doctor routes
app.use('/api/v1/doctor',require('./routes/doctor-routes'))


//  port
const port=process.env.PORT || 8080


// listen
app.listen(port,()=>{
    console.log(`server running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}` .bgCyan.white)
})
