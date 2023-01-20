import { Col, Form, Input, message, Row,TimePicker } from 'antd'
import { useDispatch,useSelector } from 'react-redux'

import React from 'react'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import moment from 'moment'

const ApplyDoctor = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {user}=useSelector(state=>state.user)
    // handle finish
    const handleFinish=async(values)=>{
       try {
        dispatch(showLoading())
        const res=await axios.post('/api/v1/user/apply-doctor',{...values,userId:user._id,
            timing: [
            moment(values.timing[0]).format("HH:mm"),
            moment(values.timing[1]).format("HH:mm"),
          ]},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        dispatch(hideLoading())
        if(res.data.success){
            navigate('/')
            message.success(res.data.message)
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
        <h1 style={{textAlign:'center'}}>Apply Doctor</h1>
        <Form layout='vertical' onFinish={handleFinish}>
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
            <button className='btn btn-primary' style={{width:'200px'}}>Submit</button>
       </div>
      </Form>
        </div>
     

     
    </Layout>
  )
}

export default ApplyDoctor
