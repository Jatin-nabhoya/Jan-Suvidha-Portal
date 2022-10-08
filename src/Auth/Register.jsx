import React from "react";
import { Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../CSS/Register.css";

function Register() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const postData = (e) => {
    console.log(e);
    let data = JSON.stringify(e);
    console.log(data);
    // setLoading(true);
    axios.post(`http://127.0.0.1:8000/api/register/`, data).then(() => {
      console.log("API called");
      // setLoading(false);
      navigate("/login");
    });
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center bg-image"
    >
      <div className="mask gradient-custom-3"></div>
      <Form onSubmit={handleSubmit(postData)}>
        <Card className="m-5 shadow-lg" style={{ maxWidth: "600px" }}>
          <Card.Body className="px-5">
            <h2 className="text-center mb-5">Create an account</h2>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                {...register("name")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
            </Form.Group> 
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Date of Birth:</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter your name"
                {...register("dob")}
              />
            </Form.Group>
            <Form.Label>Gender:</Form.Label>
            <Form.Select className="mb-4" {...register("gender")}>
              <option value="">--Select--</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
              <option value="o">Others</option>
              <option value="a">Any</option>
            </Form.Select>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mobile:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your mobile no"
                {...register("mobile")}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Address:</Form.Label>
              <Form.Control as="textarea" rows={3} {...register("address")} />
            </Form.Group>
            <Form.Label>Caste:</Form.Label>
            <Form.Select className="mb-4" {...register("caste")}>
              <option value="">--Select Caste--</option>
              <option>General</option>
              <option>OBC</option>
              <option>SC/ST</option>
            </Form.Select>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Income:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your income"
                {...register("income")}
              />
            </Form.Group>
            <Form.Label>Maritial Status:</Form.Label>
            <Form.Select className="mb-4" {...register("maritialstatus")}>
              <option value="">--Select--</option>
              <option>Single</option>
              <option>Married</option>
              <option>Widowed</option>
            </Form.Select>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Nationality:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Nationality"
                {...register("nationality")}
              />
            </Form.Group>
            <p>Are you disabled person?</p>
            <Form.Select className="mb-4" {...register("disabilitycert")}>
              <option value="">--Select--</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Select>
            <Button type="submit" className="lgn mb-4 w-100 gradient-custom-4" size="lg">
              Register
            </Button>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  );
}

export default Register;
