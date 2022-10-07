import React from 'react';
import banner from '../Photos/1.jpg';
import Carousel from "react-bootstrap/Carousel";
function container(){
    return (
        <>
        <Carousel interval="2000" touch="true" fade="true">
        {/* <Carousel.Item touch="true">
          <img className="d-block w-100" src={banner} alt="First slide" />
        </Carousel.Item> */}
        <Carousel.Item touch="true">
          <img className="d-block w-100" src={banner} alt="Second slide" />
          <a href="/register" className="register-btn fw-bold text-dark fs-5">
            Register Now
          </a>
        </Carousel.Item>
      </Carousel>
        </>
    );
}

export default container;