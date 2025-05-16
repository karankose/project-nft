
import React, { useState, useEffect } from "react";
import JobCard from "../componts/screens/JobCard";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Images } from "../assets/image";

const itemsPerPage = 6;

function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [titleFilter, setTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/jobs`, {
        params: {
          page: currentPage + 1, // API expects 1-based index
          limit: itemsPerPage,
          title: titleFilter || undefined,
          location: locationFilter || undefined,
          days: dateFilter || undefined,
        },
      });

      setJobs(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch jobs");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [currentPage, titleFilter, locationFilter, dateFilter]);

  const handlePageChange = ({ selected }) => {
    console.log("111");
    
    setCurrentPage(selected);
  };

  return (
    <div className="container-fluid jobpage-style">
      <h1 className="mb-4 fw-bold text-primary text-center">Available Jobs</h1>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Filter by title"
            className="form-control"
            value={titleFilter}
            onChange={(e) => {
              console.log("2");
              
              setTitleFilter(e.target.value)}}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Filter by location"
            className="form-control"
            value={locationFilter}
            onChange={(e) => {
              console.log("3");
              
              setLocationFilter(e.target.value)}}
          />
        </div>
        <div className="col-md-4">
          <input
            type="number"
            placeholder="Posted within (days)"
            className="form-control"
            value={dateFilter}
            onChange={(e) => {
              console.log("444");
              
              setDateFilter(e.target.value)}}
          />
        </div>
      </div>

      {/* Jobs Display */}
      {loading ? (
        <div className="text-center loading-div">
          <img src={Images.loading} alt="Loading..." />
        </div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : jobs.length === 0 ? (
        <div className="text-center text-muted">No jobs match your filters.</div>
      ) : (
        <div className="row g-4">
          {jobs.map((job, index) => (
            <div className="col-12 col-sm-6 col-lg-4" key={index}>
              <JobCard job={job} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        containerClassName={"pagination justify-content-center mt-4"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default JobPage;
