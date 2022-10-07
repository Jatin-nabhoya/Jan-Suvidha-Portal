import React from 'react';
import banner from '../Photos/1.jpg';
import Carousel from "react-bootstrap/Carousel";
function Container(){
    return (
        <>
        <Carousel interval="2000" touch="true" fade="true">
        {/* <Carousel.Item touch="true">
          <img className="d-block w-100" src={banner} alt="First slide" />
        </Carousel.Item> */}
        <Carousel.Item touch="true">
          <img className="d-block w-100" src={banner} alt="Second slide" />
        </Carousel.Item>
      </Carousel>
        </>
    );
}

export default Container;