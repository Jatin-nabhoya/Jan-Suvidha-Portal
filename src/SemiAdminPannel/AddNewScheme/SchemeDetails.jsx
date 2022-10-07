import React from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
function Schemedetail() {
    const { register, handleSubmit, formState: { errors }, reset, trigger, } = useForm();
    const onSubmit = async (e) => {
        console.table(e);
        const Data = JSON.stringify(e);
        console.log(Data);
    }
    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label className="col-form-label">Scheme Name:</Form.Label>
                    <Form.Control
                        type="text"
                        className="form-control"
                        {...register("name")}
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
                <input type="submit" className="btn btn-primary mt-4" value="Submit" />
            </Form>
        </>
    );
}

export default Schemedetail;