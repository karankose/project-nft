
import React from 'react'
import { Images } from '../../assets/image';

const HeroSection = () => {
  return (
    <div className="container-fluid py-5" style={{ background: 'linear-gradient(180deg, #001E4D 0%, #194B85 100%)' }}>
      <div className="container">
        <div className="row align-items-center">

       
          <div className="col-md-8 text-white">
            <h1 className="fw-bold" style={{ color: '#A4D5FF', fontSize: '2.8rem' }}>
              Helping You Find <br />
              Sponsorship <br />
              <span style={{ color: '#FFFFFF', position: 'relative', display: 'inline-block' }}>
                Jobs in the UK
                <div style={{ height: '8px', backgroundColor: '#66C7F4', width: '100%', position: 'absolute', bottom: 0, zIndex: -1 }}></div>
              </span>
            </h1>

            <p className="mt-4 text-light">
              Explore thousands of sponsorship job opportunities across the UK. Boost your chances with our AI-powered CV and cover letter tools, and prepare confidently for your next interview.
            </p>


            <div className="bg-white rounded p-2 mt-4 d-flex flex-column flex-lg-row align-items-stretch gap-2 shadow">
              <div className="input-group">
                <span className="input-group-text bg-white border-0">
                  <i className="bi bi-search"></i>
                </span>
                <input type="text" className="form-control border-0" placeholder="Job title " />
              </div>

              <div className="input-group">
                <span className="input-group-text bg-white border-0">
                  <i className="bi bi-geo-alt"></i>
                </span>
                <select className="form-select border-0">
                  <option>Florence, Italy</option>
                  <option>London, UK</option>
                  <option>Manchester, UK</option>
                </select>
              </div>

              <button className="btn btn-primary w-100 w-lg-auto">Search My Job</button>
              <button className="btn btn-info text-white w-100 w-lg-auto">Find Sponsors</button>
            </div>
          
            <p className="mt-3 text-light small">
              Suggestion: <span className="me-2">Designer,</span>
              <span className="me-2">Programming,</span>
              <span className="me-2 text-info">Digital Marketing,</span>
              <span className="me-2">Video,</span>
              <span>Animation</span>
            </p>
          </div>
 
          <div className="col-md-4 position-relative text-center mt-5 mt-md-0">
            <img src={Images.HeroSectionImage} alt="Hero" className="img-fluid" />

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
