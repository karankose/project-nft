import React from "react";

import CustomButton from "../reuseComponts/reuseButton/CustomButton";

import { Link } from "react-router-dom";
import routers from "../../Routers";

const JobCard = ({ job }) => {
  return (
    <div className="card h-100 shadow-sm  ">
      <img
        src={job.thumbnail}
        alt="Job Icon"
        className="card-img-top p-3"
        style={{ width: '120px', height: '120px', objectFit: 'contain', margin: 'auto' }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{job.title}</h5>
        <p className="card-text text-muted">{job.location}</p>
        {/* <p className="card-text text-muted">{job._id}</p>
     */}
        <p className="card-text small">{job.company_name}</p>
        <p className="card-text text-success fw-bold">{job.salary}</p>
        <Link to={"/dashboard/jobDetails/:id".replace(':id', job._id) ||
          "/jobDetails/:id".replace(':id', job._id) 
         }>
  <CustomButton btnClassName="btn btn-dark w-100" label="View Details" />
</Link>
        
      </div>
    </div>
  );
};

export default JobCard;
