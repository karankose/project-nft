import React, { useState } from 'react';


const PricingPlans = () => {
  const [planType, setPlanType] = useState('monthly');

  return (
    <section className="py-5 text-center" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container">
        <h2 className="fw-bold mb-3">
          <span className="text-dark">Pricing</span> <span className="text-primary">Plans</span>
        </h2>
        <p className="text-muted">Find the perfect plan to boost your job search in the UK</p>

        <div className="d-inline-flex bg-white rounded-pill shadow-sm p-1 mt-4 pricing-toggle">
          <button
            className={`btn ${planType === 'monthly' ? 'btn-primary' : 'btn-light'}`}
            onClick={() => setPlanType('monthly')}
          >
            Monthly
          </button>
          <button
            className={`btn ${planType === 'yearly' ? 'btn-primary' : 'btn-light'}`}
            onClick={() => setPlanType('yearly')}
          >
            Yearly
          </button>
        </div>

       
        <div className="row justify-content-center mt-5">
       
          <div className="col-md-5 mb-4">
            <div className="bg-white pricing-card shadow-sm text-start p-4 rounded-4 h-100">
              <h5 className="fw-bold">Basic Plan</h5>
              <p className="text-muted">Unlock Essential Job Search Tools for Free</p>
              <h2 className="fw-bold mb-3">Free</h2>
              <hr />
              <h6 className="fw-bold mb-3">What’s included</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Access to standard UK job listings</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Apply to unlimited jobs</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Basic CV support</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Email alerts for new job openings</li>
              </ul>
              <button className="btn btn-primary w-100 mt-3">Get Started For Free</button>
            </div>
          </div>

      
          <div className="col-md-5 mb-4">
            <div className="pricing-card premium text-start text-white p-4 rounded-4 h-100" style={{ background: 'linear-gradient(to bottom right, #002366, #004AAD)' }}>
              <div className="d-flex justify-content-between align-items-start">
                <h5 className="fw-bold">Premium Plan</h5>
                <span className="badge-popular">Popular</span>
              </div>
              <p>Ideal for Candidates Seeking a Competitive Advantage</p>
              <h2 className="fw-bold mb-3">£{planType === 'monthly' ? '19.99' : '199.99'} <small className="fs-6">/{planType}</small></h2>
              <hr style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
              <h6 className="fw-bold mb-3">What’s included</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><i className="bi bi-check-circle-fill text-white me-2"></i>Priority access to top UK job listings</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-white me-2"></i>Advanced job-matching technology</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-white me-2"></i>Customised CV and cover letter</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-white me-2"></i>Real-time updates and notifications</li>
              </ul>
              <button className="btn btn-light w-100 mt-3 text-primary fw-bold">Upgrade To Premium</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
