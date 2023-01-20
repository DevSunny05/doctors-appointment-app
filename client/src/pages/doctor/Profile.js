import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import moment from 'moment'
import { Col, Form, Input, message, Row,TimePicker } from 'antd'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'

const Profile = () => {
    const {user}=useSelector(state=>state.user)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [doctor,setDoctor]=useState(null)
    const params=useParams()

    // get doctor info
    const getDoctorInfo=async()=>{
        try {
            const res=await axios.post('/api/v1/doctor/getDoctorInfo',{userId:params.id},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
            })
            if(res.data.success){
                setDoctor(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getDoctorInfo()
        // eslint-disable-next-line
    },[])

    // handle finished
    const handleFinish=async(values)=>{
        try {
         dispatch(showLoading())
         const res=await axios.post('/api/v1/doctor/updateProfile',{...values,userId:user._id,timing:[
            moment(values.timing[0]).format('HH:mm'),
            moment(values.timing[1]).format('HH:mm')
         ]},{
             headers:{
                 Authorization:`Bearer ${localStorage.getItem('token')}`
             }
         })
         dispatch(hideLoading())
         if(res.data.success){
             message.success(res.data.message)
             navigate('/')
         }else{
             message.error(res.data.message)
         }
        } catch (error) {
         dispatch(hideLoading())
         console.log(error)
         message.error("Something Went Wrong")
        }
     }

  return (
    <Layout>
        <div>
            <h1 style={{textAlign:'center'}}>Manage Profile</h1>
            {
                doctor && (
                    <Form layout='vertical' onFinish={handleFinish} initialValues={{...doctor,
                    timing:[moment(doctor.timing[0],'HH:mm'),
                             moment(doctor.timing[1],'HH:mm')
                    ]}}>
                <h4 style={{margin:'30px 25px',fontWeight:'400'}}>Personal Details :</h4>
        <Row>
           
            <Col xs={24} md={24} lg={8} >
                <Form.Item label='First Name' name='firstName' required rules={[{required:true}]}  style={{margin:'10px'}}>
                    <Input type='text' placeholder='Enter First Name'/>
                </Form.Item>
                
            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label='Last Name' name='lastName' required rules={[{required:true}]}  style={{margin:'10px'}}>
                    <Input type='text' placeholder='Enter Last Name'/>
                </Form.Item>
                
            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label='Phone No' name='phone' required rules={[{required:true}]}  style={{margin:'10px'}}>
                    <Input type='text' placeholder='Enter phone number'/>
                </Form.Item>
                
            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label='Email' name='email' required rules={[{required:true}]}  style={{margin:'10px'}}>
                    <Input type='text' placeholder='Enter email'/>
                </Form.Item>
                
            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label='Website' name='website' required rules={[{required:true}]}  style={{margin:'10px'}}>
                    <Input type='text' placeholder='Enter website'/>
                </Form.Item>
                
            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label='Address' name='address' required rules={[{required:true}]}  style={{margin:'10px'}}>
                    <Input type='text' placeholder='Enter address'/>
                </Form.Item>
                
            </Col>
        </Row>
        <h4 style={{margin:'30px 25px',fontWeight:'400'}} >Profesional Details</h4>
        <Row >
           
           <Col xs={24} md={24} lg={8} >
               <Form.Item label='Specialization' name='specialization' required rules={[{required:true}]}  style={{margin:'10px'}}>
                   <Input type='text' placeholder='Add specialization'/>
               </Form.Item>
               
           </Col>
           <Col xs={24} md={24} lg={8}>
               <Form.Item label='Experience' name='experience' required rules={[{required:true}]}  style={{margin:'10px'}}>
                   <Input type='text' placeholder='Add your experience'/>
               </Form.Item>
               
           </Col>
           <Col xs={24} md={24} lg={8}>
               <Form.Item label='Fees Per Consultation' name='feesPerConsultation' required rules={[{required:true}]}  style={{margin:'10px'}}>
                   <Input type='text' placeholder='Add fees per consultation'/>
               </Form.Item>
               
           </Col>
           <Col xs={24} md={24} lg={8}>
               <Form.Item label='Timing' name='timing' required  style={{margin:'10px'}}>
                   <TimePicker.RangePicker format='HH:mm'/>
               </Form.Item>
               
           </Col>
       </Row>
      
       <div style={{display:'flex',justifyContent:'end',margin:'25px 50px'}}>
            <button className='btn btn-primary' style={{width:'200px'}}>Update</button>
       </div>
      </Form>
                )
            }
        </div>
      
    </Layout>
  )
}

export default Profile
