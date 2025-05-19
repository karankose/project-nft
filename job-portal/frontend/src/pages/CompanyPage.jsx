import React, { useEffect, useState } from "react";
import CompaniesList from "../componts/screens/CompaniesList";
import axios from "axios";
import JobModal from "../pages/JobModal";

function CompanyPage() {
  const [companies, setCompanies] = useState([]);
  const [filters, setFilters] = useState({ company_name: "", location: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedJobs, setSelectedJobs] = useState(null);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/companies", {
        params: {
          company_name: filters.company_name,
          location: filters.location,
          page,
          limit: 5,
        },
      });
      setCompanies(res.data.data.companies);
      setTotalPages(res.data.data.totalPages);
    } catch (err) {
      console.error("Error fetching companies:", err.message);
    }
  };

 useEffect(() => {
  fetchCompanies();
}, [page, filters.company_name, filters.location]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1); // reset to page 1 on new filter
  };

  return (
    <>
      <div className="container-fluid p-5 mt-5" style={{ background: "#46B6EEDB" }}>
        <h1 className="mb-4 fw-bold text-light text-center">Companies List</h1>

        {/* Filters */}
        <div className="row mb-4 justify-content-center">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="company_name"
              placeholder="Name"
              value={filters.company_name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="location"
              placeholder="Location"
              value={filters.location}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Company Cards */}
        <div className="row g-4">
          {companies.map((company, index) => (
            <div className="col-12 col-sm-6 col-lg-4" key={index}>
              <CompaniesList company={company} onViewJobs={() => setSelectedJobs(company.jobs)} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-dark mx-2"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <span className="align-self-center text-white">{page} / {totalPages}</span>
          <button
            className="btn btn-dark mx-2"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Job Popup */}
      {selectedJobs && (
        <JobModal jobs={selectedJobs} onClose={() => setSelectedJobs(null)} />
      )}
    </>
  );
}

export default CompanyPage;
