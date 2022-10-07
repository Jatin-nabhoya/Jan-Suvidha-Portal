import React from "react";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBTextArea,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import Navbar from "../home/Header";

import "../CSS/Register.css";

function Register() {
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: "Raj Mandaviya  ",
            email: "tgadhkai778@gmail.com",
            mobile: "9724197043",
            dob: "2003-05-15",
            address: "Ravaliya plot",
            caste: "general",
            income: 500000,
            maritialstatus: "Single",
            nationality: "Indian",
            disabilitycert: "true",
        },
    });

    const postData = (e) => {
        console.log(e);
        let data = JSON.stringify(e);
        console.log(data);
        // setLoading(true);
        axios.post(`http://127.0.0.1:8000/api/register/`, data).then(() => {
            console.log("API called");
            // setLoading(false);
            navigate("/verifyotp");
        });
    };

    return (
        <>
        <Navbar />
            <MDBContainer
                fluid
                className="d-flex align-items-center justify-content-center bg-image"
                style={{
                    backgroundImage:
                        "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
                }}
            >
                <div className="mask gradient-custom-3"></div>
                <form onSubmit={handleSubmit(postData)}>
                    <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
                        <MDBCardBody className="px-5">
                            <h2 className="text-uppercase text-center mb-5">
                                Create an account
                            </h2>
                            <MDBInput
                                label="Your Name"
                                id="form1"
                                type="text"
                                wrapperClass="mb-4"
                                {...register("name")}
                            />
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Your Email"
                                id="form2"
                                type="email"
                                {...register("email")}
                            />
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Your Mobile No"
                                id="form2"
                                type="Number"
                                {...register("mobile")}
                            />
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Your DOB"
                                id="form2"
                                type="date"
                                {...register("dob")}
                            />
                            <MDBTextArea
                                wrapperClass="mb-4"
                                id="textAreaExample"
                                label="Address"
                                {...register("address")}
                            ></MDBTextArea>
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Your Caste"
                                id="form2"
                                type="text"
                                {...register("caste")}
                            />
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Your Income"
                                id="form2"
                                type="Number"
                                {...register("income")}
                            />
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Your Maritial Status"
                                id="form2"
                                type="text"
                                {...register("maritialstatus")}
                            />
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Your Nationality"
                                id="form2"
                                type="text"
                                {...register("nationality")}
                            />
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Are you disable person?"
                                id="form2"
                                type="text"
                                {...register("disabilitycert")}
                            />
                            <MDBBtn className="mb-4 w-100 gradient-custom-4" size="lg">
                                Register
                            </MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </form>
            </MDBContainer>
        </>
    );
}

export default Register;