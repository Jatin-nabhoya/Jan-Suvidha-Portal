import React, { useState, useEffect } from 'react';
import Navbar from "./navbar";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
function AdminHome(){
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
      
          axios.get(`http://127.0.0.1:8000/api/allschemes/`
          ).then((response) => {
            console.log("API called");
            // setLoading(false);
            console.log("responsedata", response);
          });
        };
      
    return (
        <>
        <Navbar/>
        <h1>AdminHome</h1>
        </>
    );
}

export default AdminHome;