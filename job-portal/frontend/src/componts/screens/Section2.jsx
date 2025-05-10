import React from 'react';
import { Images } from '../../assets/image';

const Section2 = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2>How Job Portal Works</h2>
      </div>
      <div className="row justify-content-center g-4">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="p-3 rounded" style={{ background: 'white' }}>
            <img src={Images.Icon4} style={{ height: '40px', width: '40px', marginBottom: '12px' }} alt="" />
            <h6>Create account</h6>
            <p style={{ fontSize: '14px' }}>
              Sign up for a free account and create a profile to showcase your skills and career goals.
            </p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="p-3 rounded" style={{ background: '#ECF4FE' }}>
            <img src={Images.Icon8}style={{ height: '40px', width: '40px', marginBottom: '12px' }} alt="" />
            <h6>Job Search</h6>
            <p style={{ fontSize: '14px' }}>
              Explore a variety of sponsorship job listings using filters for location, keywords, and industry.
            </p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="p-3 rounded" style={{ background: 'white' }}>
            <img src={Images.Icon5} style={{ height: '40px', width: '40px', marginBottom: '12px' }} alt="" />
            <h6>Application Preparation</h6>
            <p style={{ fontSize: '14px' }}>
              Use our resources to craft standout CVs and cover letters, tailoring them for each application.
            </p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="p-3 rounded" style={{ background: 'white' }}>
            <img src={Images.Icon3} style={{ height: '40px', width: '40px', marginBottom: '12px' }} alt="" />
            <h6>Apply and Secure Employment</h6>
            <p style={{ fontSize: '14px' }}>
              Submit your applications, track their status, and receive support to help you land your dream job in the UK.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
