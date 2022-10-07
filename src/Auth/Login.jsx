import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import "../CSS/login.css";
import axios from "axios";
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
    <MDBContainer fluid>
      <MDBRow className="row">
        <MDBCol col="12">
          <form onSubmit={handleSubmit(postData)}>
            <MDBCard
              className="bg-dark text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-4">Please enter your email!</p>

                <input
                  className="form-control mb-4 mx-5 w-100"
                  id="formControlLg"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  {...register("email")}
                />

                <MDBBtn
                  // type="submit"
                  // outline
                  className="btnSbt mx-2 px-5"
                  color="white"
                  size="lg"
                >
                  Login
                </MDBBtn>

                {/* <div className="d-flex flex-row mt-3 mb-5">
                  <MDBBtn
                    tag="a"
                    color="none"
                    className="m-3"
                    style={{ color: "white" }}
                  >
                    <MDBIcon fab icon="facebook-f" size="lg" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="m-3"
                    style={{ color: "white" }}
                  >
                    <MDBIcon fab icon="twitter" size="lg" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="m-3"
                    style={{ color: "white" }}
                  >
                    <MDBIcon fab icon="google" size="lg" />
                  </MDBBtn>
                </div> */}

                {/* <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <a href="#!" class="text-white-50 fw-bold">
                      Sign Up
                    </a>
                  </p>
                </div> */}
              </MDBCardBody>
            </MDBCard>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;