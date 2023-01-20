import React from "react";
import { Button, Form, Input, message } from "antd";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading,hideLoading } from "../redux/features/alertSlice";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const onFinishHandle = async (values) => {
    try {
        dispatch(showLoading())
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading())
      if (res.data.success) {
        message.success("Register Successfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
        dispatch(hideLoading())
      console.log(error);
      message.error("Something went wrong");
    }
  };
  return (
    <>
      <div
        className="form-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: " rgba(243, 211, 211, 0.573)",
          boxShadow: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
        }}
      >
        <div
          style={{
            border: "1px solid lightgray",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: " rgba(211, 211, 211, 0.563)",
            boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Form layout="vertical" onFinish={onFinishHandle}>
            <h3 style={{ textAlign: "center" }}>Register Form</h3>
            <Form.Item label="Name" name="name">
              <Input type="text" />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input type="text" />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <div
              style={{
                display: "flex",
                padding: "10px",
                justifyContent: "space-between",
              }}
            >
              <Link
                to="/login"
                style={{ textDecoration: "none", marginRight: "20px" }}
              >
                Already user? login here
              </Link>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
