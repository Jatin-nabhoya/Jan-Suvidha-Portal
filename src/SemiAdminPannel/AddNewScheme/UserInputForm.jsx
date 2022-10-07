import React from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";

function UserInputForm(){
    const { register, handleSubmit, formState: { errors }, reset, trigger, } = useForm();
    const onSubmit = async (e) => {
        console.table(e);
        const Data = JSON.stringify(e);
      console.log(Data);
        var response = await fetch('http://127.0.0.1:8000/api/requiredfields/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: Data
      });
    }

    return (
        <>
        <Form  onSubmit={handleSubmit(onSubmit)}>
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
            label='Maratial Status'
            name="maratial-status"
            {...register("maratial_status")}
          />
        </div>
        <div className="mb-3">
          <Form.Check 
            type='checkbox'
            label='Nationality'
            name="nationality"
            {...register("natinality")}
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
            name="cast"
            {...register("cast")}
          />
        </div>
        <input type="submit" className="btn btn-primary mt-4" value="Submit" />
        </Form>
        </>
    );
}

export default UserInputForm;