import { DatePicker, message, TimePicker } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
// import  moment  from "moment";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

const Booking = () => {
  const [doctors, setDoctors] = useState([]);
  const {user}=useSelector(state=>state.user)
  const params = useParams();
  const dispatch=useDispatch()
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  // const [isAvailable, setIsAvailable] = useState(false);

  const getDoctorData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getSingleDoctor",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle booking 
  const handleBooking=async()=>{
    try {
      
      if(!date && !time){
        return alert("Date and Time is required")
      }
      dispatch(showLoading())
      const res=await axios.post('/api/v1/user/book-appointment',{
        doctorId:params.doctorId,
        userId:user._id,
        doctorInfo:doctors,
        userInfo:user,
        date:date,
        time:time
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
      }
      })
      console.log(time)
      dispatch(hideLoading())
      if(res.data.success){
        message.success(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
    }
  }

  // handle availability
  const handleAvailability=async()=>{
    try {
      if(!date && !time){
        return alert("Date and Time is required")
      }
      dispatch(showLoading())
      const res=await axios.post('/api/v1/user/booking-availbity',
      {doctorId:params.doctorId,date,time},
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
      }
      }
      )
      dispatch(hideLoading())
      if(res.data.success){
      
        message.success(res.data.message)
      }else{
   
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
    }
  }

  useEffect(() => {
    getDoctorData();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <div style={{ height: "100vh" }}>
        <h3 style={{ textAlign: "center", margin: "20px" }}>Booking Page</h3>
        <div className="container m-2">
          {doctors && (
            <div style={{border:'1px solid lightgray',padding:'10px 20px',borderRadius:'10px'}}>
              <h4>
                Dr.{doctors.firstName} {doctors.lastname}
              </h4>
              <h4>Fees :{doctors.feesPerConsultation}</h4>
              <h4>
                Timings : {doctors.timings && doctors.timings[0]} -{" "}
                {doctors.timings && doctors.timings[1]}{" "}
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                }}
              >
                <DatePicker
                aria-required={"true"}
                  format="DD-MM-YYYY"
                  onChange={(value) =>{
                    setDate(value.format("DD-MM-YYYY"))
                  }
                  }
                />
                <TimePicker
                 aria-required={"true"}
                  format="HH:mm"
                  onChange={(value) =>{
                    setTime(value.format("HH:mm"))
                  }
                  }
                />
                <button style={{width:'200px',margin:'5px 0'}} className="btn btn-primary mt-2" onClick={handleAvailability}>
                  Check Availability
                </button>
 
             
                <button style={{width:'200px',margin:'5px 0'}} className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Now
                </button>
               
                
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Booking;
