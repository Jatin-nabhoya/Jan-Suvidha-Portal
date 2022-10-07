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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Otp() {
  const navigate = useNavigate();
  const [verify, setVerify] = useState();

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
        setVerify(response.data.login);
        // setLoading(false);
      });
    // console.log(verify);
  };

  if(verify){
    navigate("/home");
  }
  console.log("verify", verify);

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
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  {...register("otp")}
                />
                {verify === 0 ? (
                  <span className="text-danger mb-4">Enter valid otp</span>
                ) : (
                  ""
                )}

                <MDBBtn
                  // type="submit"
                  // outline
                  className="btnSbt mx-2 px-5"
                  color="white"
                  size="lg"
                >
                  Verify OTP
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

export default Otp;
