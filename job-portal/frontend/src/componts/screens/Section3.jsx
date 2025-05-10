import React from 'react'
import { Images } from '../../assets/image';

 const Section3 = () => {
  return (
    <>
    

<div className="container-fluid" style={{ background: "#091F4F" }}>
  <div className="row align-items-center justify-content-center ">
    
    
    <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
      <img src={Images.GroupImage
      } className="img-fluid" alt="" />
    </div>

    
    <div className="col-12 col-md-6" style={{ background: "#ECF4FE", padding: "2rem" }}>
      <div className="mb-4">
        <h3>
          Why Choose <span style={{ color: "#004595" }}>JobPortal</span>
        </h3>
        <p>
          Welcome to Job Portal, where we connect UK job seekers with exceptional sponsorship opportunities,
          empowering diverse individuals to navigate the job market with confidence.
        </p>
      </div>

     
      <div className="d-flex mb-4 align-items-start">
        <img src={Images.Icon10} className="me-3" alt="Icon 1" style={{ width: "40px", height: "40px" }} />
        <div>
          <h5>Job Seekers in the UK:</h5>
          <p>
            Individuals actively seeking employment opportunities and looking to enhance their career
            prospects within the UK job market.
          </p>
        </div>
      </div>

      
      <div className="d-flex mb-4 align-items-start">
        <img src={Images.Icon11} className="me-3" alt="Icon 2" style={{ width: "40px", height: "40px" }} />
        <div>
          <h5>International Graduates:</h5>
          <p>
            Recent graduates aiming to kick-start their careers in the UK, eager to connect with employers
            who value their unique perspectives and skills.
          </p>
        </div>
      </div>

      
      <div className="d-flex align-items-start">
        <img src={Images.Icon12} className="me-3" alt="Icon 3" style={{ width: "40px", height: "40px" }} />
        <div>
          <h5>Skilled Professionals:</h5>
          <p>
            Experienced individuals seeking to relocate and further their careers through sponsorship,
            looking for meaningful roles that align with their expertise and ambitions.
          </p>
        </div>
      </div>
    </div>
    
  </div>
</div>

    </>
  )
}




export default Section3;