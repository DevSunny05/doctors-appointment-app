import { message, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import moment from 'moment'
import axios from 'axios'

const DoctorAppointments = () => {
    const [appointments,setAppointments]=useState([])

    const columns=[
        {
            title:'ID',
            dataIndex:'_id'
        },
        // {
        //     title:'Name',
        //     dataIndex:'name',
        //     render:(text,record)=>(
        //         <span>{record.doctorInfo.firstName} {record.doctorId.lastName}</span>
        //     )
        // },
        // {
        //     title:'Phone',
        //     dataIndex:'phone',
        //     render:(text,record)=>(
        //         <span>{record.doctorInfo.phone} </span>
        //     )
        // },
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
        {
            title:'Actions',
            dataIndex:'actions',
            render:(text,record)=>(
                <div className="d-flex">
                    {
                        record.status === 'pending' && (
                            <div className="d-flex">
                                <button className="btn btn-success" onClick={()=>handleStatus(record,'approved')}>
                                    Approved
                                </button>

                                <button className="btn btn-danger ms-2" onClick={()=>handleStatus(record,'reject')}>
                                    Reject
                                </button>
                            </div>
                        )
                    }
                </div>
            )
        }
        
    ]

    const getAppointments=async()=>{
        try {
            const res=await axios.get('/api/v1/doctor/doctor-appointments',{
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

    const handleStatus=async(record,status)=>{
        try {
            const res=await axios.post('/api/v1/doctor/update-appointmentStatus',
            {appointmentsId:record._id,status},
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            }
            )
            if(res.data.success){
                message.success(res.data.message)
                getAppointments()
            }
        } catch (error) {
            console.log(error)
            message.error('Something went wrong')
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

export default DoctorAppointments
