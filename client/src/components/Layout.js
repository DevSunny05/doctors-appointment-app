import { message,Badge } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import { adminMenu, userMenu } from '../data/data'

const Layout = ({children}) => {
    const location=useLocation()
    const navigate=useNavigate()
    const {user}=useSelector(state=>state.user)
  

    // logout handle
    const handleLogout=()=>{
        localStorage.clear()
        message.success("Logout Successful")
        navigate('/login')
    }

    // ================Doctor Menu===========
     const doctorMenu=[
        {
            id:1,
            name:"Home",
            path:'/',
            icon:"fa-thin fa-house",
        },
        {
            id:2,
            name:"Appoinments",
            path:'/appointments',
            icon:"fa-solid fa-list"
        },
       
        {
            id:3,
            name:"Profile",
            path:`/doctor/profile/${user?._id}`,
            icon:"fa-solid fa-user"
        },
    ]
    // ================Doctor Menu===========

    // rendering menu list
    const SideMenu= user?.isAdmin ? adminMenu : user?.isDoctor?doctorMenu:userMenu;
  return (
    <>
    <div className="main" style={{height:'100%',padding:'15px',display:'flex',flexDirection:'column'}}>
        <div className="layout" style={{display:'flex',height:'100%'}}>
            <div className="sidebar" style={{width:'350px',maxheight:'100%',borderRadius:'10px',background:'#008080',marginRight:'20px',boxShadow:' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'}}>
                <div className="logo" style={{}}><h4 style={{fontSize:"30px",textAlign:'center',margin:'20px 0',color:'white',fontWeight:'800',}}>DOC APP</h4></div>
                <hr style={{color:'white'}}/>
                <div style={{marginTop:'50px'}} className="menu">
                    {
                        SideMenu.map((menu)=>{
                            const isActive=location.pathname ===menu.path
                            return (
                                
                                <div key={menu.id} className={`menu-item ${isActive && 'active'} `} style={{margin:'30px 10px'}}>
                                    <i style={{color:'white',fontSize:'20px'}} className={menu.icon}></i>
                                    <Link style={{color:'white',textDecoration:'none',marginLeft:'15px',fontSize:'20px'}} to={menu.path}>{menu.name}</Link>
                                </div>
                               
                            )
                        })
                    }
                     <div  className={`menu-item`} style={{margin:'30px 10px'}} onClick={handleLogout}>
                                    <i style={{color:'white',fontSize:'20px'}} className='fa-solid fa-right-from-bracket'></i>
                                    <Link style={{color:'white',textDecoration:'none',marginLeft:'15px',fontSize:'20px'}} to='/login'>Logout</Link>
                                </div>
                </div>
            </div>

            <div className="content" style={{display:'flex',flexDirection:'column',width:'100%',height:'100%'}}>
                <div className="header" style={{height:'10vh',marginBottom:'20px',background:'#008080',boxShadow:'box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px',width:'100%',borderRadius:'10px'}}>
                    <div className="header-content" style={{margin:'10px 15px',display:'flex',alignItems:'center',justifyContent:'flex-end',height:'50px'}}>
                        <Badge count={user && user.notification.length} onClick={()=>navigate('/notification')} style={{cursor:'pointer'}}>
                        <i className="fa-solid fa-bell"style={{fontSize:'20px'}}></i>
                        </Badge>
                        <Link to='/profile' style={{textDecoration:'none',color:'lightblue',margin:'0 10px',fontSize:'15px',fontWeight:'500',textTransform:'Uppercase'}}>{user?.name}</Link>
                    </div>
                </div>
                <div className="body" style={{background:'#FFF5EE',boxShadow:'box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px',width:'100%',borderRadius:'10px'}}>{children}</div>
            </div>
        </div>
    </div>
      
    </>
  )
}

export default Layout
