import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import axios from "axios";

import { useForm } from "react-hook-form";
import Navbar from "../navbar";
import { useNavigate } from 'react-router-dom';

function UserInputForm() {
  const [Schname, setSchname] = useState()
  useEffect(() => {
    let schname = localStorage.getItem('schname');
    console.log("schname",schname);
    setSchname(schname);
  }, []);

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset, trigger, } = useForm();
  const onSubmit = async (e) => {
    console.table(e);
    e.scheme_name = Schname;
    const Data = JSON.stringify(e);
    console.log(Data);

    axios.post(`http://127.0.0.1:8000/api/requiredfields/`, Data).then((response) => {
      console.log("API called");
      // setLoading(false);
      console.log("responsedata", response);
      navigate('/userdocumentform');
    });
  };

  return (
    <>
      <Navbar />
      <div className="container pt-5">
        <div className="row justify-content-sm-center pt-5">
          <div className="col-sm-6 shadow round pb-3">
            <h1 className="text-center pt-3 text-secondary mb-5">
              User Inputs Form
            </h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <Form.Check
                  type='checkbox'
                  label='Name'
                  name="name"
                  {...register("Name")}
                />
              </div>
              <div className="mb-3">
                <Form.Check
                  type='checkbox'
                  label="Father's Name"
                  name="fname"
                  {...register("fname")}
                />
              </div>
              <div className="mb-3">
                <Form.Check
                  type='checkbox'
                  label="Aadhaar Number"
                  name="aadhaar"
                  {...register("aadhaar")}
                />
              </div>
              <div className="mb-3">
                <Form.Check
                  type='checkbox'
                  label='address'
                  name="address"
                  {...register("address")}
                />
              </div>
              <div className="mb-3">
                <Form.Check
                  type='checkbox'
                  label="State"
                  name="state"
                  {...register("state")}
                />
              </div>
              <div className="mb-3">
                <Form.Check
                  type='checkbox'
                  label="Duration of Course"
                  name="courseduration"
                  {...register("courseduration")}
                />
              </div>
              <div className="mb-3">
                <Form.Check
                  type='checkbox'
                  label='Class Currently Studying'
                  name="currentclass"
                  {...register("currentclass")}
                />
              </div>
              <div className="mb-3">
                <Form.Check
                  type='checkbox'
                  label='Dob'
                  name="dob"
                  {...register("dob")}
                />
              </div>
              <div className="mb-3">
                <Form.Check
                  type='checkbox'
                  label='Gender'
                  name="gender"
                  {...register("gender")}
                />
              </div>
              <div className="mb-3">
                <Form.Check
                  type='checkbox'
                  label='Marital Status'
                  name="marital_status"
                  {...register("marital_status")}
                />
              </div>
              <div className="mb-3">
                <Form.Check
                  type='checkbox'
                  label='Nationality'
                  name="nationality"
                  {...register("nationality")}
                />
              </div>
              <div className="mb-3">
                <Form.Check
                  type='checkbox'
                  label='Disability Certificate'
                  name="disability-certificate"
                  {...register("disabilitycert")}
                />
              </div>
              <div className="mb-3">
                <Form.Check
                  type='checkbox'
                  label='Income'
                  name="income"
                  {...register("income")}
                />
              </div>
              <div className="mb-3">
                <Form.Check
                  type='checkbox'
                  label='Caste'
                  name="caste"
                  {...register("caste")}
                />
              </div>
              <input type="submit" className="btn btn-primary mt-4" value="Next" />
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserInputForm;