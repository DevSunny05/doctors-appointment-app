import { message, Tabs } from 'antd'
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { hideLoading, showLoading } from '../redux/features/alertSlice'

const Notification = () => {
const {user}=useSelector(state=>state.user)
const navigate=useNavigate()
const dispatch=useDispatch()
    const handleMarkAllRead= async()=>{   
        try {
            dispatch(showLoading())
            const res=await axios.post('/api/v1/user/get-all-notification',{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
            }else{
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error("Something went wrong")
        }  
    }

    const handleDeleteAllRead=async()=>{
        try {
            dispatch(showLoading())
            const res=await axios.post('/api/v1/user/delete-all-notification',{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
            }else{
                message.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            message.error('Something went wrong')
        }
    }
  return (
    <Layout>
      <div style={{height:'100vh'}}>
      <h4 style={{padding:'3px',textAlign:'center'}}>Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab='UnRead' key={0}>
            <div style={{display:'flex',justifyContent:'end'}}>
                <h4 style={{padding:'10px',cursor:'pointer'}} onClick={handleMarkAllRead}>Mark All Read</h4>
            </div>
            {
            user?.notification.map(notificationMsg=>(
                <div className='card' onClick={()=>navigate(notificationMsg.onClickPath)} style={{cursor:'pointer'}}>
                    <div className="card-text">{notificationMsg.message}</div>
                </div>
            ))
        }
        </Tabs.TabPane>
       
        <Tabs.TabPane tab='Read' key={1}>
            <div style={{display:'flex',justifyContent:'end'}}>
                <h4 style={{padding:'10px',cursor:'pointer'}} onClick={handleDeleteAllRead}>Delete All Read</h4>
            </div>
            {
            user?.seenNotification.map(notificationMsg=>(
                <div className='card' onClick={()=>navigate(notificationMsg.onClickPath)} style={{cursor:'pointer'}}>
                    <div className="card-text">{notificationMsg.message}</div>
                </div>
            ))
        }
        </Tabs.TabPane>
      </Tabs>
      </div>
    </Layout>
  )
}

export default Notification
