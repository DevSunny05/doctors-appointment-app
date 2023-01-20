
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd'

const Users = () => {
  const [users,setUsers]=useState([])

  // getAllUsers
  const getAllUsers=async()=>{
    try {
      const res=await axios.get('/api/v1/admin/getAllUsers',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })

      if(res.data.success){
        setUsers(res.data.data)
       
      }
    } catch (error) {
      console.log(error)
     
    }
  }

  useEffect(()=>{
    getAllUsers()
  },[])

  // table
const columns=[
  {
    title:'Name',
    dataIndex:'name'
  },
  {
    title:'Email',
    dataIndex:'email'
  },
  {
    title:'Doctor',
    dataIndex:'isDoctor',
    render:(text,record)=>(
      <span>{record.isDoctor ? 'Yes':'No'}</span>
    )
  },
  {
    title:'Actions',
    dataIndex:'actions',
    render:(text,record)=>(
      <div className='d-flex'>
        <button className=' btn btn-danger'>Block</button>
      </div>
    )
  },
]

  return (
    <Layout>
      <div style={{height:'100vh'}}>
        <h2 style={{textAlign:'center',padding:'20px'}}>User List</h2>
        <Table columns={columns} dataSource={users}/>
      </div>
      
    </Layout>
  )
}

export default Users
