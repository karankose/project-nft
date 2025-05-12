import React from "react";
import {Navbars} from "../componts/screens/Navbars";
import Footer from "../componts/screens/Footer";
import Testimonial from "../componts/screens/Testimonial";
import Section2 from "../componts/screens/Section2";
import Section3 from "../componts/screens/Section3";
import OurMission from "../componts/screens/OurMission";
import Section1 from "../componts/screens/Section1";
import AboutSection1 from "../componts/screens/AboutSection1";
import { Link } from "react-router-dom";
import routers from "../Routers";

const AboutUs = () => {
  return (
    <>
      <Navbars />
      <div className="container-fluid" style={{ backgroundColor: '#071A44' }}>
        <div className="d-flex justify-content-center align-items-center text-light py-4">
          <h1>About Us</h1>
        </div>
        <div className="row justify-content-center text-light pt-0 pb-5">
          <div className="col-md-8 text-center">
            <Link to={routers.homeRouter} style={{ color: '#53B4E4', textDecoration: 'none', fontWeight: '500' }}>
              Home
            </Link>
            <span className="me-2 text-light">  About Us</span>
          </div>
        </div>
      </div>




      <AboutSection1 />
      <Section1 />
      <OurMission />
      <Section3 />
      <Section2 />
      <Testimonial />
      <Footer />
    </>
  )
}


export default AboutUs;


