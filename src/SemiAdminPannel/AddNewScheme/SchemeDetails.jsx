import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Navbar from "../navbar";
import axios from "axios";

function Schemedetail() {

    // const [staff, setStaff] = useState(false);
    // var response = fetch('http://127.0.0.1:8000/api/is_staff/', {
    //     method: "GET",
    //     headers: { 'Content-Type': 'application/json' },
    //     credentials: 'include'
    // });
    // var content = response.json();
    // setStaff(content.is_staff);
    // var staff = false;
    useEffect(() => {
        
    }, []);

    const [caste, setCaste] = useState(false);
    const [age, setAge] = useState(false);
    const [valage, setValage] = useState();
    const [agetxt, setAgetxt] = useState();
    const [nationality, setNationality] = useState(false);
    const [disability, setDisability] = useState(false);
    const [income, setIncome] = useState();
    const [incometxt, setIncometxt] = useState();
    const [lastaquire, setLastaquire] = useState(false);
    const [maritialstatus, setMaritialstatus] = useState(false);
    const [schname, setSchname] = useState();

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    // console.log(incometxt); 
    console.log(agetxt);
    console.log(valage);
    console.log(income);
    console.log(incometxt);
    // console.log("schname",schname);



    // console.log(income); 
    const onSubmit = async (e) => {
        localStorage.setItem("schname", schname);
        console.table(e);
        e[valage] = agetxt;
        e[income] = incometxt;
        const Data = JSON.stringify(e);
        console.log(Data);

        // var response = await fetch('http://127.0.0.1:8000/api/registerscheme/', {
        //     method: "POST",
        //     headers: { 'Content-Type': 'application/json' },
        //     credentials: 'include',
        //     body: Data
        // });

        axios.post(`http://127.0.0.1:8000/api/registerscheme/`, Data).then((response) => {
            console.log("API called");
            // setLoading(false);
            console.log("responsedata", response);
            // navigate('/adminHome');
            navigate('/userinputform');
          });
    }


    return (

        <>
            <Navbar />
            <div className="container pt-5">
                <div className="row justify-content-sm-center pt-5">
                    <div className="col-sm-6 shadow round pb-3">
                        <h1 className="text-center pt-3 text-secondary mb-5">
                            Scheme Detail Form
                        </h1>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group>
                                <Form.Label className="col-form-label">Scheme Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    {...register("name")}
                                    onChange={(e) => setSchname(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="col-form-label">Scheme Description :</Form.Label>
                                <Form.Control
                                    type="textarea"
                                    as="textarea" rows={5}
                                    {...register("description")}
                                />
                            </Form.Group>
                            <div className="mb-3 mt-3">
                                <Form.Check
                                    type='checkbox'
                                    label="caste"
                                    name="caste"
                                    checked={caste}

                                    onChange={(e) => setCaste(e.target.checked)}
                                />
                                {caste && (
                                    <>
                                        <Form.Select {...register("caste")}>
                                            <option>general</option>
                                            <option>ST</option>
                                            <option>SC</option>
                                            <option>OBC</option>
                                        </Form.Select>

                                    </>
                                )}
                            </div>
                            <div className="mb-3 mt-3">
                                <Form.Check
                                    type='checkbox'
                                    label="age"
                                    name="age"
                                    checked={age}
                                    onChange={(e) => setAge(e.target.checked)}
                                />
                                {age && (
                                    <>
                                        <Form.Select size="sm" onChange={(e) => setValage(e.target.value)} >
                                            <option value="agegt">age greaterthan</option>
                                            <option value="agelt">age Lessthan</option>

                                        </Form.Select>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>age :</Form.Label>
                                            <Form.Control type="text" placeholder="Enter age" onChange={(e) => { setAgetxt(e.target.value) }} />
                                        </Form.Group>
                                    </>
                                )}
                            </div>
                            <div className="mb-3 mt-3">
                                <Form.Check
                                    type='checkbox'
                                    label="nationality"
                                    name="nationality"
                                    checked={nationality}

                                    onChange={(e) => setNationality(e.target.checked)}
                                />
                                {nationality && (
                                    <>
                                        <Form.Select size="sm" {...register("nationality")}>
                                            <option>indian</option>
                                            <option>other</option>
                                        </Form.Select>
                                    </>
                                )}
                            </div>
                            <div className="mb-3 mt-3">
                                <Form.Check
                                    type='checkbox'
                                    label="disability"
                                    name="disability"

                                    checked={disability}
                                    onChange={(e) => setDisability(e.target.checked)}
                                />
                                {disability && (
                                    <>
                                        <Form.Select size="sm" {...register("disability")}>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </Form.Select>

                                    </>
                                )}
                            </div>
                            <div className="mb-3 mt-3">
                                <Form.Check
                                    type='checkbox'
                                    label="income"
                                    name="income"
                                    checked={income}
                                    onChange={(e) => setIncome(e.target.checked)}
                                />
                                {income && (
                                    <>
                                        <Form.Select size="sm" onChange={(e) => setIncome(e.target.value)}>
                                            <option value="incomelt">less than</option>
                                            <option value="incomegt">greater then</option>
                                        </Form.Select>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>income</Form.Label>
                                            <Form.Control type="text" placeholder="Enter income" onChange={(e) => { setIncometxt(e.target.value) }} />
                                        </Form.Group>
                                    </>
                                )}
                            </div>
                            {/* <div className="mb-3 mt-3">
                                <Form.Check
                                    type='checkbox'
                                    label="last aquire"
                                    name="lastaquire"
                                    checked={lastaquire}
                                    onChange={(e) => setLastaquire(e.target.checked)}
                                />
                                {lastaquire && (
                                    <>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="text" placeholder="Enter years"  {...register("lastaquire")}/>
                                        </Form.Group>
                                    </>
                                )}
                            </div> */}
                            <div className="mb-3 mt-3">
                                <Form.Check
                                    type='checkbox'
                                    label="maritial status"
                                    name="maritialstatus"
                                    checked={maritialstatus}
                                    onChange={(e) => setMaritialstatus(e.target.checked)}
                                />
                                {maritialstatus && (
                                    <>
                                        <Form.Select size="sm" {...register("maritialstatus")}>
                                            <option>Single</option>
                                            <option>Married</option>
                                            <option>Widowed</option>
                                        </Form.Select>

                                    </>
                                )}
                            </div>
                            <input type="submit" className="btn btn-primary mt-4" value="Next" />
                        </Form>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Schemedetail;