import React from 'react'
import { Images } from '../../assets/image';

 const AboutSection1 = () => {
  return (
    <>
    

<div className="container-fluid" >
  <div className="row align-items-center justify-content-center py-5 m-4">
    
    
  <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
      <img src={Images.About1
      } className="img-fluid" alt="" />
    </div>

    
    <div className="col-12 col-md-6" style={{  padding: "2rem" }}>
      <div className="mb-4">
        <h3>
          Who We<span style={{ color: "#004595" }}>Are</span>
        </h3>       
        <p>
        Welcome to Job Portal, where ambition meets opportunity. We’re committed to making the job search journey simpler and more rewarding for professionals seeking sponsorship jobs in the UK. Our platform connects talented individuals with employers eager to support and grow international talent. Whether you're looking for your first role abroad or advancing your career, Job Portal is here to help you unlock the right opportunities.
        </p>
      </div>

    

      
      

      
     
    </div>

 
    
  </div>
</div>

    </>
  )
}




export default AboutSection1;