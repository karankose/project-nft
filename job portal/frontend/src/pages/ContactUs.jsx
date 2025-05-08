import React from 'react'
import Navbars from '../componts/screens/Navbars';
import { Link } from 'react-router-dom';
import routers from '../Routers';
import Footer from '../componts/screens/Footer';
import FormInputs from '../componts/reuseComponts/reuseFormComponent/FormInputs';
import { Images } from '../assets/image';
import CustomButton from '../componts/reuseComponts/reuseButton/CustomButton';


 const ContactUs = () => {
  return (
    <>    
    <Navbars/>




      <div className="container-fluid" style={{ backgroundColor: '#071A44' }}>
        <div className="d-flex justify-content-center align-items-center text-light py-4">
          <h1>Contact Us </h1>
        </div>
        <div className="row justify-content-center text-light pt-0 pb-5">
          <div className="col-md-8 text-center">
            <Link to={routers.homeRouter} style={{ color: '#53B4E4', textDecoration: 'none', fontWeight: '500' }}>
              Home
            </Link>
            <span className="me-2 text-light">  Contact Us</span>
          </div>
        </div>
      </div>

        {/* form div */}
        <div className="container">
  <div className="row justify-content-center mt-5">

    {/* Left content */}
    <div className="col-12 col-lg-6 mb-4">
      <div className="text-center text-lg-start mb-4">
        <h3>
          Contact <span style={{ color: "#004595" }}>Us</span>
        </h3>
        <p>
          We’re here to help! Whether you have questions about your job search, need support with our platform, or want more information about sponsorship opportunities, we’d love to hear from you.
        </p>
      </div>

      <div className="d-flex mb-4 align-items-start">
        <img src={Images.Icon10} className="me-3" alt="Icon 1" style={{ width: "30px", height: "30px" }} />
        <div>
          <h5>Phone Number</h5>
          <p>
          +44 20 7946 0857          </p>
        </div>
      </div>

      <div className="d-flex mb-4 align-items-start">
        <img src={Images.Icon11} className="me-3" alt="Icon 2" style={{ width: "30px", height: "30px" }} />
        <div>
          <h5>Email Address</h5>
          <p>
          support@jobportal.com   </p>
        </div>
      </div>

      <div className="d-flex mb-4 align-items-start">
        <img src={Images.Icon11} className="me-3" alt="Icon 2" style={{ width: "30px", height: "30px" }} />
        <div>
          <h5>Location</h5>
          <p>
          123 Career Lane, London, UK   </p>
        </div>
      </div>

    </div>

    {/* Form section */}
    <div className="col-12 col-lg-5 mb-4 d-flex justify-content-center">
      <div className="bg-white pricing-card shadow-sm text-start p-4 rounded-4 w-100">
        <form>
          <FormInputs
            label={'Full Name'}
            placeholder={'Chance Kenter'}
            required={true}
            type={'text'}
            name={'Full name'}
          />
          <FormInputs
            label={'Email'}
            placeholder={'Enter your email address'}
            required={true}
            type={'email'}
            name={'email'}
          />
          <FormInputs
            label={'Phone Number'}
            placeholder={'+44 7895462541'}
          />
          <FormInputs
            label={'Message'}
            placeholder={'Write...'}
            type={'textarea'}
            required={true}
          />
          <CustomButton label={'Send Message'} btnClassName='btn btn-primary w-100 mt-3 text-light ' />
        </form>
      </div>
    </div>

  </div>
</div>



    <Footer/>
  </>

  )
}

export default ContactUs;