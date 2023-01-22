import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import moment from 'moment'
import { Table } from 'antd'

const Appointment = () => {
    const [appointments,setAppointments]=useState([])

    const columns=[
        {
            title:'ID',
            dataIndex:'_id'
        },
        {
            title:'Name',
            dataIndex:'name',
            render:(text,record)=>(
                <span>{record.doctorInfo.firstName} {record.doctorId.lastName}</span>
            )
        },
        {
            title:'Phone',
            dataIndex:'phone',
            render:(text,record)=>(
                <span>{record.doctorInfo.phone} </span>
            )
        },
        {
            title:'Date & Time',
            dataIndex:'date',
            render:(text,record)=>(
                <span>
                    {moment(record.date).format('DD-MM-YYYY')} &nbsp;
                    {moment(record.time).format('HH:mm')}
                </span>
                
            )
        },
        {
            title:'Status',
            dataIndex:'status',
           
        },
        
    ]

    const getAppointments=async()=>{
        try {
            const res=await axios.get('/api/v1/user/user-appointments',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })

            if(res.data.success){
                setAppointments(res.data.data)
            }
        } catch (error) {
            console.log(error)
 
        }
    }

    useEffect(()=>{
        getAppointments()
    },[])

  return (
    <Layout>
      <div style={{height:'100vh'}}>
        <h1>Appintment list</h1>
        <Table columns={columns} dataSource={appointments}/>
      </div>
    </Layout>
  )
}

export default Appointment
