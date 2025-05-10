import React from 'react'
import PricingPlans from '../componts/screens/PricingPlans';
import { Link } from 'react-router-dom';
import routers from '../Routers';
import {Navbars} from '../componts/screens/Navbars';
import Footer from '../componts/screens/Footer';
import Section2 from '../componts/screens/Section2';
import OurVision from '../componts/screens/OurVision';
import Section3 from '../componts/screens/Section3';
import Testimonial from '../componts/screens/Testimonial';
import FaqSection from '../componts/screens/FaqSection';


 const Features = () => {
  return (
    <>
     <Navbars />
      <div className="container-fluid" style={{ backgroundColor: '#071A44' }}>
        <div className="d-flex justify-content-center align-items-center text-light py-4">
          <h1>Features </h1>
        </div>
        <div className="row justify-content-center text-light pt-0 pb-5">
          <div className="col-md-8 text-center">
            <Link to={routers.homeRouter} style={{ color: '#53B4E4', textDecoration: 'none', fontWeight: '500' }}>
              Home
            </Link>
            <span className="me-2 text-light">  Features</span>
          </div>
        </div>
      </div>
      <OurVision/>
      <Section2/>
      <Section3/>
      <Testimonial/>
      <FaqSection/>
      <Footer/>

    </>
  )
}


export default Features;
