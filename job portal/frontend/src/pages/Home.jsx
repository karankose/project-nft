import React from "react";
import Navbars from "../componts/screens/Navbars";
import HeroSection from "../componts/screens/HeroSection";
import Section1 from "../componts/screens/Section1";
import Section2 from "../componts/screens/Section2";
import Section3 from "../componts/screens/Section3";
import PricingPlans from "../componts/screens/PricingPlans";
import Testimonial from "../componts/screens/Testimonial";
import FaqSection from "../componts/screens/FaqSection";
import Footer from "../componts/screens/Footer";


 const Home = () => {
  return (
    <>
     <Navbars/>
      <HeroSection/>
      <Section1/>
      <Section2/>
      <Section3/>
      <PricingPlans/>
      <Testimonial/>
      <FaqSection/>
      <Footer/>
    

    </>
    
  )
}

export default Home;