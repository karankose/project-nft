import React from "react";
import { Images } from "../../assets/image";
import CustomButton from "../reuseComponts/reuseButton/CustomButton";

const CompaniesList = ({ company, onViewJobs }) => {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={Images.Icon6}
        alt="Company"
        className="card-img-top p-3"
        style={{ width: "120px", height: "120px", objectFit: "contain", margin: "auto" }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{company.company_name}</h5>
        <p className="card-text text-muted">{company.location}</p>
        <CustomButton btnClassName="btn btn-dark w-100" label="View Jobs" onClick={onViewJobs} />
      </div>
    </div>
  );
};

export default CompaniesList;
