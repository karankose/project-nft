import React from 'react';
import { Images } from '../../assets/image';
import { Link } from 'react-router-dom';
import routers from '../../Routers';
const Footer = () => {
  return (
    <footer className="text-white">
      
      <div className="py-5 text-center" style={{ backgroundColor: '#071B51' }}>
        <div className="container">
          <h3 className="fw-bold mb-4">
            Stay updated with the latest job listings, career tips, and exclusive offers.
          </h3>

          <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2">
            <div className="input-group" style={{ maxWidth: '400px' }}>
              <span className="input-group-text bg-white border-0">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control border-0"
                placeholder="Enter Your Email"
              />
            </div>
            <button className="btn text-white px-4" style={{ backgroundColor: '#65B9E6' }}>
              Subscribe Now
            </button>
          </div>

          <p className="text-muted mt-3" style={{ fontSize: '0.9rem' }}>
            Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>

     
      <div className="py-4" style={{ backgroundColor: '#034EA2' }}>
        <div className="container">
          <div className="row align-items-center text-center text-md-start">
            <div className="col-md-3 mb-3 mb-md-0 d-flex align-items-center justify-content-center justify-content-md-start">
              <img
                src={Images.Logo1}
                alt="Job Portal"
               
                className="me-2"
              />
            
            </div>

            <div className="col-md-6 mb-3 mb-md-0">
              <ul className="nav justify-content-center">
                <li className="nav-item"><a href="#" className="nav-link px-2 text-white">Find Jobs</a></li>
                <li className="nav-item"><Link to={routers.aboutRouter} className="nav-link px-2 text-white">About Us</Link></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-white">Blog</a></li>
                <li className="nav-item"><Link to={routers.pricingRouter} className="nav-link px-2 text-white">Pricing Plans</Link></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-white">Interview Prep</a></li>
              </ul>
            </div>

            <div className="col-md-3 d-flex justify-content-center justify-content-md-end gap-3">
              <a href="#"><i className="bi bi-facebook text-white fs-5"></i></a>
              <a href="#"><i className="bi bi-twitter text-white fs-5"></i></a>
              <a href="#"><i className="bi bi-linkedin text-white fs-5"></i></a>
            </div>
          </div>

          <hr className="border-light opacity-50 my-4" />

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-muted small">
            <p className="mb-2 mb-md-0 text-white">© Copyright 2024, All Rights Reserved</p>
            <div>
              <a href="#" className="me-3 text-white text-decoration-none">Privacy Policy</a>
              <a href="#" className="text-white text-decoration-none">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
