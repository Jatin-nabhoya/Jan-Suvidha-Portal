import React from "react";
import "../CSS/login.css";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "../home/Header";

function Login() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

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
            <h2 className="text-center mb-5">Login</h2>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
            </Form.Group>
            <Button
              type="submit"
              className="lgn mt-4 w-100 gradient-custom-4 shadow-sm"
              size="lg"
            >
              Login
            </Button>
          </Card.Body>
        </Card>
      </Form>
    </Container>

  );
}

export default Login;
