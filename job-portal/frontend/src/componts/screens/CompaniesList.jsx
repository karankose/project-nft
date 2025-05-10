


import React from "react";
import { Images } from "../../assets/image"; 
import CustomButton from "../reuseComponts/reuseButton/CustomButton";

const CompaniesList = ({ Companies }) => {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={Images.Icon6}
        alt="Job Icon"
        className="card-img-top p-3"
        style={{ width: '120px', height: '120px', objectFit: 'contain', margin: 'auto' }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{Companies.company}</h5>
        <p className="card-text text-muted">{Companies.title}</p>

        <CustomButton btnClassName="btn btn-dark w-100 "  label={'View Details'} />
      </div>
    </div>
  );    
};


  export default CompaniesList;