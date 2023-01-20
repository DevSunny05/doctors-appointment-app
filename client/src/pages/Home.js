// import React, { useEffect } from "react";
// import axios from "axios";
import Layout from "../components/Layout";
// import { hideLoading, showLoading } from "../redux/features/alertSlice";
// import { useDispatch } from "react-redux";

const Home = () => {
//   const dispatch = useDispatch();

//   const getUserData = async () => {
//     console.log('home first')
//     try {
//       dispatch(showLoading());
//       await axios.post(
//         "/api/v1/user/getUserData",
//         {},
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         }
//       );
//       dispatch(hideLoading());
//     } catch (error) {
//       dispatch(hideLoading());
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getUserData();
//   }, []);

  return (
    <Layout>
      <div style={{height:'100vh'}}>
      <h1>Home</h1>
      </div>
    </Layout>
  );
};

export default Home;
