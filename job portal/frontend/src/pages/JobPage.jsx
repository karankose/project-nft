import React, { useState, useEffect } from "react";

import JobCard from "../componts/screens/JobCard";
import ReactPaginate from "react-paginate";
import axios from "axios"; 
import { Images } from "../assets/image";

const itemsPerPage = 6;

function JobPage() {
  const [jobs, setJobs] = useState([]); 
  const [currentPage, setCurrentPage] = useState(0); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    
    const API_URL = import.meta.env.VITE_API_URL;
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/jobs/`);
        setJobs(response.data.data); 
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Failed to fetch jobs"); 
      }
    };

    fetchJobs();
  }, []);

  const startIndex = currentPage * itemsPerPage;
  const selectedJobs = jobs.slice(startIndex, startIndex + itemsPerPage);

  
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
    

      <div className="container-fluid jobpage-style pt-5" style={{ }}>
        <h1 className="mb-4 fw-bold text-primary text-center">Available Jobs</h1>

        {loading ? (
          <div className="text-center loading-div"  ><img src={Images.loading} alt="loading " /></div>
        ) : error ? (
          <div className="text-center text-danger">{error}</div>
        ) : (
          <div className="row g-4">
            {selectedJobs.map((job, index) => (
              <div className="col-12 col-sm-6 col-lg-4" key={index}>
                <JobCard job={job} />
              </div>
            ))}
          </div>
        )}

        
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(jobs.length / itemsPerPage)} 
          onPageChange={handlePageChange}
          containerClassName={"pagination justify-content-center mt-4"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
}

export default JobPage;
