
import React from 'react';
import { Images } from '../../assets/image';

const Section3 = () => {
  return (
    <div className="container-fluid py-5" style={{ backgroundColor: "#091F4F" }}>
      <div className="container">
        <div className="row align-items-center g-4">

          {/* Image Section */}
          <div className="col-lg-6 text-center">
            <img
              src={Images.GroupImage}
              alt="Why Choose Us"
              className="img-fluid"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>

          {/* Text + Cards Section */}
          <div className="col-lg-6">
            <div className="bg-light p-4 rounded shadow-sm">
              <h3 className="fw-bold text-center text-lg-start mb-3">
                Why Choose <span className="text-primary">JobPortal</span>
              </h3>
              <p className="text-center text-lg-start">
                Welcome to Job Portal, where we connect UK job seekers with exceptional sponsorship opportunities,
                empowering diverse individuals to navigate the job market with confidence.
              </p>

              {/* Card 1 */}
              <div className="d-flex align-items-start mb-3">
                <img
                  src={Images.Icon10}
                  alt="Job Seekers"
                  className="me-3"
                  style={{ width: "40px", height: "40px" }}
                />
                <div>
                  <h6 className="fw-semibold">Job Seekers in the UK:</h6>
                  <p className="mb-0">
                    Individuals actively seeking employment opportunities and looking to enhance their career prospects within the UK job market.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="d-flex align-items-start mb-3">
                <img
                  src={Images.Icon11}
                  alt="International Graduates"
                  className="me-3"
                  style={{ width: "40px", height: "40px" }}
                />
                <div>
                  <h6 className="fw-semibold">International Graduates:</h6>
                  <p className="mb-0">
                    Recent graduates aiming to kick-start their careers in the UK, eager to connect with employers who value their unique perspectives and skills.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="d-flex align-items-start">
                <img
                  src={Images.Icon12}
                  alt="Skilled Professionals"
                  className="me-3"
                  style={{ width: "40px", height: "40px" }}
                />
                <div>
                  <h6 className="fw-semibold">Skilled Professionals:</h6>
                  <p className="mb-0">
                    Experienced individuals seeking to relocate and further their careers through sponsorship, looking for meaningful roles that align with their expertise and ambitions.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Section3;
