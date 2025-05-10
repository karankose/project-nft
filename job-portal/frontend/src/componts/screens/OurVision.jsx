import React from 'react'
import { Images } from '../../assets/image';

 const OurVision = () => {
  return (
    <>
    

<div className="container-fluid" >
  <div className="row align-items-center justify-content-center py-5 m-4">
    
    
  <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
      <img src={Images.OurVision
      } className="img-fluid" alt="" />
    </div>

    
    <div className="col-12 col-md-6" style={{  padding: "2rem" }}>
      <div className="mb-4">
        <h3>
          Our Vision
        </h3>       
        <p>
        Our job portal offers advanced search filters, personalized job alerts, and AI-based job matching to help users find the perfect role. Employers can easily post jobs, track applications, and showcase company profiles. Job seekers benefit from a resume builder, career advice, and salary insights. With mobile support, video interview scheduling, and referral programs, our platform streamlines the job search and hiring process for both parties.
        </p>
      </div>

    

      
      

      
     
    </div>

   
    
  </div>
</div>

    </>
  )
}




export default OurVision;