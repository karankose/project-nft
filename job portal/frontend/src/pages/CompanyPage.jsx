import React from "react";

import CompaniesList from "../componts/screens/CompaniesList";

const Companies = [
  {
    title: "Frontend Developer",
    company: "Tech Solutions Ltd.",
    location: "London, UK",
  
  },
  {
    title: "Backend Developer",
    company: "DevCore",
    location: "Remote",
    
  },
  {
    title: "Product Manager",
    company: "Startup Labs",
    location: "Manchester",
   
  },
  {
    title: "Frontend Developer",
    company: "Tech Solutions Ltd.",
    location: "London, UK",
    
  },
  {
    title: "Backend Developer",
    company: "DevCore",
    location: "Remote",
    
  },
  {
    title: "Product Manager",
    company: "Startup Labs",
    location: "Manchester",
   
  },
];

function CompanyPage() {
  return (
    <>
     

      <div className="container-fliud p-5 mt-5" style={{background:"#46B6EEDB"}}>
        <h1 className="mb-4 fw-bold text-light text-center">Companies List</h1>
        <div className="row g-4">
          {Companies.map((Companie, index) => (
            <div className="col-12 col-sm-6 col-lg-4" key={index}>
              <CompaniesList Companies={Companie} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CompanyPage;
