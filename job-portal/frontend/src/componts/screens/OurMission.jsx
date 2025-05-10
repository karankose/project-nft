import React from 'react'
import { Images } from '../../assets/image';

 const OurMission = () => {
  return (
    <>
    

<div className="container-fluid" >
  <div className="row align-items-center justify-content-center py-5 m-4">
    
    
    

    
    <div className="col-12 col-md-6" style={{  padding: "2rem" }}>
      <div className="mb-4">
        <h3>
          Our<span style={{ color: "#004595" }}>Mission</span>
        </h3>       
        <p>
        At Job Portal, our mission is to simplify the job search for international professionals seeking sponsorship opportunities in the UK. We connect talent with employers ready to support career growth through visa sponsorship, providing tools and resources to make the job search easier, faster, and more successful.
        </p>
      </div>

    

      
      

      
     
    </div>

    <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
      <img src={Images.About2
      } className="img-fluid" alt="" />
    </div>
    
  </div>
</div>

    </>
  )
}




export default OurMission;