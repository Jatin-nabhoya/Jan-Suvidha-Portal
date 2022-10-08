import "../CSS/login.css";
import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

function VerifyOtp() {
  const navigate = useNavigate();
  const [verify, setVerify] = useState();
  const [staff, setStaff] = useState();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const postData = (e) => {
    console.log(e);
    let data = JSON.stringify(e);
    // setLoading(true);
    axios
      .post(`http://127.0.0.1:8000/api/verifyotp/`, data)
      .then((response) => {
        console.log("API called");
        console.log(response.data.login);
        setStaff(response.data.is_staff);
        setVerify(response.data.login);
        // setLoading(false);
      });
    // console.log(verify);
  };

  if(verify){
    if(staff){
      navigate("/adminHome");
    }
    else{
      navigate("/userdashboard")
    }
  }
  console.log("verify", verify);

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center bg-image"
      style={{
        height: "100vh",
      }}
    >
      <div className="mask gradient-custom-3"></div>
      <Form onSubmit={handleSubmit(postData)}>
        <Card
          className="shadow-lg p-3 mb-5 bg-white rounded"
          style={{ borderRadius: "" }}
        >
          <Card.Body className="px-5 py-4">
            <h2 className="text-center mb-5">OTP</h2>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter OTP:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                {...register("otp")}
              />
            </Form.Group>
            {verify === 0 ? (
              <span className="text-danger mb-4">Enter valid OTP</span>
            ) : (
              ""
            )}
            <Button
              className="lgn mt-4 w-100 gradient-custom-4 shadow-sm"
              size="lg"
              type="submit"
            >
              Verify OTP
            </Button>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  );
}

export default VerifyOtp;
