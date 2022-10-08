import React, { useEffect } from "react";
import "../CSS/userhome.css";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const navigate = useNavigate();

  const [schemes, setSchemes] = useState([]);

  const [schname, setSchname] = useState();
  const [schdesc, setSchdesc] = useState();

  let obj = {};

  useEffect(() => {
    // setLoading(true);
    axios.get("http://127.0.0.1:8000/api/eligibleschemes/").then((response) => {
      console.log("response", response.data.schemes);
      setSchemes(response.data.schemes);
      // setLoading(false);
      // setAPIData(response.data);
    });
  }, []);

  console.log(schemes);

  const renderCard = (card, index) => {
    const postData = (card) => {
      obj.name = card;
      console.log("obj", obj);
      // let data = JSON.stringify(e);
      // setLoading(true);
      axios
        .post(`http://127.0.0.1:8000/api/viewscheme/`, obj)
        .then((response) => {
          console.log("API called");
          console.log("response", response.data);
          setSchname(response.data.name);
          setSchdesc(response.data.description);
          // setLoading(false);
          localStorage.setItem('schname', schname);
          navigate("/schemeapp");
        });
      };

    const getSchname = (card) => {
      obj.name = card;
      console.log("obj", obj);
      // let data = JSON.stringify(e);
      // setLoading(true);
      axios
        .post(`http://127.0.0.1:8000/api/viewscheme/`, obj)
        .then((response) => {
          console.log("API called");
          console.log("response", response.data);
          setSchname(response.data.name);
          setSchdesc(response.data.description);
          // setLoading(false);
          // navigate("/verifyotp");
        });
    }

    return (
      <Card style={{ width: "18rem" }} key={index} className="box">
        {/* <Card.Img variant="top" src={card.image} /> */}
        <Card.Body>
          <Card.Title>{card}</Card.Title>
          <Card.Text>{schname}</Card.Text>
          <Card.Text>{schdesc}</Card.Text>
          {schname ? (
            <Button onClick={() => postData(card)}>Apply Now</Button>
          ) : ( 
            <Button onClick={() => getSchname(card)}>More Details</Button>
          )}
        </Card.Body>
      </Card>
    );
  };

  return <div className="grid">{schemes.map(renderCard)}</div>;
};

export default UserHome;
