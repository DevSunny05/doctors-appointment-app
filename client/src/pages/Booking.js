import { DatePicker, TimePicker } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { moment } from "moment";

const Booking = () => {
  const [doctors, setDoctors] = useState([]);
  const params = useParams();
  const [date, setDate] = useState("");
  const [timing, setTiming] = useState();
  const [isAvailable, setIsAvailable] = useState(false);

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
                  format="DD_MM_YYYY"
                  onChange={(value) =>
                    setDate(moment(value).format("DD_MM_YYYY"))
                  }
                />
                <TimePicker.RangePicker
                  format="HH:mm"
                  onChange={(values) =>
                    setTiming([
                      moment(values[0]).format("HH:mm"),
                      moment(values[1]).format("HH:mm"),
                    ])
                  }
                />
                <button style={{width:'200px',margin:'20px 0'}} className="btn btn-primary mt-2">
                  Check Availability
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
