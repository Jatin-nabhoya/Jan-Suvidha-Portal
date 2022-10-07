import React from "react";
import {
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import "../CSS/login.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const postData = (e) => {
    console.log(e);
    let data = JSON.stringify(e);
    // setLoading(true);
    axios.post(`http://127.0.0.1:8000/api/sendotp/`, data).then(() => {
      console.log("API called");
      // setLoading(false);
      navigate("/verifyotp");
    });
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center bg-image"
      style={{
        height: "100vh",
      }}
    >
      <div className="mask gradient-custom-3"></div>
      <form onSubmit={handleSubmit(postData)}>
        <MDBCard
          className="shadow-lg p-3 mb-5 bg-white rounded"
          style={{ borderRadius: "" }}
        >
          <MDBCardBody className="px-5 py-4">
            <h2 className="text-center mb-5">Login</h2>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
            </Form.Group>
            <MDBBtn
              className="lgn mt-4 w-100 gradient-custom-4 shadow-sm"
              size="lg"
            >
              Login
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </form>
    </MDBContainer>
  );
}

export default Login;
