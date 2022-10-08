import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from "axios";

import { useForm } from "react-hook-form";
import Navbar from "../navbar";
import { useNavigate } from 'react-router-dom';

function UserDocumentForm() {

    const [Schname, setSchname] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        let schname = localStorage.getItem('schname');
        console.log("schname", schname);
        setSchname(schname);
    }, []);

    const { register, handleSubmit, formState: { errors }, reset, trigger, } = useForm();
    const onSubmit = async (e) => {
        console.table(e);
        e.scheme_name = Schname;
        const Data = JSON.stringify(e);
        
        console.log("datawithschemename",Data);
        
        axios.post(`http://127.0.0.1:8000/api/requireddocs/`, Data).then((response) => {
            console.log("API called");
            // setLoading(false);
            console.log("responsedata", response);
            navigate('/adminHome');
          });
    }

    return (
        <>
            <Navbar />
            <div className="container pt-5">
                <div className="row justify-content-sm-center pt-5">
                    <div className="col-sm-6 shadow round pb-3">
                        <h1 className="text-center pt-3 text-secondary mb-5">
                            User Documents Form
                        </h1>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <Form.Check
                                    type='checkbox'
                                    label='Cast Certificate '
                                    name="castecert"
                                    {...register("castecert")}
                                />
                            </div>
                            <div className="mb-3">
                                <Form.Check
                                    type='checkbox'
                                    label="income certificate"
                                    name="incomecertificate"
                                    {...register("incomecertificate")}
                                />
                            </div>
                            <div className="mb-3">
                                <Form.Check
                                    type='checkbox'
                                    label="Ration Card"
                                    name="rationCard"
                                    {...register("rationCard")}
                                />
                            </div>
                            <div className="mb-3">
                                <Form.Check
                                    type='checkbox'
                                    label='non creamy layer'
                                    name="noncreamylayer"
                                    {...register("noncreamylayer")}
                                />
                            </div>
                            <div className="mb-3">
                                <Form.Check
                                    type='checkbox'
                                    label="10th std marksheet"
                                    name="marksheet10"
                                    {...register("marksheet10")}
                                />
                            </div>
                            <div className="mb-3">
                                <Form.Check
                                    type='checkbox'
                                    label="12th std marksheet"
                                    name="marksheet12"
                                    {...register("marksheet12")}
                                />
                            </div>
                            <div className="mb-3">
                                <Form.Check
                                    type='checkbox'
                                    label='aadhaar'
                                    name="aadhaar"
                                    {...register("aadhaar")}
                                />
                            </div>
                            <div className="mb-3">
                                <Form.Check
                                    type='checkbox'
                                    label='pancard'
                                    name="pancard"
                                    {...register("pancard")}
                                />
                            </div>
                            <div className="mb-3">
                                <Form.Check
                                    type='checkbox'
                                    label='driving license'
                                    name="drivinglicense"
                                    {...register("drivinglicense")}
                                />
                            </div>
                            <div className="mb-3">
                                <Form.Check
                                    type='checkbox'
                                    label='voter id card'
                                    name="voteridcard"
                                    {...register("voteridcard")}
                                />
                            </div>

                            <input type="submit" className="btn btn-primary mt-4" value="Submit" />
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserDocumentForm;