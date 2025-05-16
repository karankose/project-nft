import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, deleteJob, updateJob, setCurrentPage } from "../../redux/jobSlice";
import DataTable from "../screens/DataTable";

const JobList = () => {

  const JobsColumn = [
  {
    title: "Title",
    render: (j) => (
     <p>{j.title}</p>
    ),
  },
  {
    title: "company",
    render: (j) => j.company_name,
  },
  {
    title: "location",
    render: (j) => j.location,
  },
  {
    title : "Posted",
    render: (j) => j.via,
  },
  {
    title : "extensions",
    render: (j) => j.extensions,
  },
  {
    title: "Actions",
    render: () => (
      <>
        <button className="btn btn-sm edit-btn" >Edit</button>
        <button className="btn btn-sm delete-btn">Delete</button>
      </>
    ),
  },
];
  const dispatch = useDispatch();
  const { jobs, totalPages, currentPage, loading } = useSelector((state) => state.jobs);

  const [filters, setFilters] = useState({ title: "", company_name: "", location: "" });
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    dispatch(fetchJobs({ ...filters, page: currentPage }));
  }, [filters, currentPage, dispatch]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    dispatch(setCurrentPage(1));
  };

  const handlePageClick = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this job?")) {
      dispatch(deleteJob(id));
    }
  };

  const handleEditClick = (job) => {
    setEditingJob({ ...job });
    
  };

  const handleEditChange = (e) => {
    setEditingJob({ ...editingJob, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    dispatch(updateJob({ id: editingJob._id, updatedData: editingJob }));
    setEditingJob(null);
  };
  console.log(jobs);

  return (
    <div className="container mt-4">
      <h2>Job List</h2>

      {/* Filters */}
      <div className="mb-3 d-flex gap-2">
        <input name="title" className="form-control" placeholder="Title" value={filters.title} onChange={handleChange} />
        <input name="company_name" className="form-control" placeholder="Company" value={filters.company_name} onChange={handleChange} />
        <input name="location" className="form-control" placeholder="Location" value={filters.location} onChange={handleChange} />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* <table className="table table-bordered">
            <thead>
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 ? (
                jobs?.map((job) => (
                  <tr key={job.job_id}>
                    <td>{job.title}</td>
                    <td>{job.company_name}</td>
                    <td>{job.location}</td>
                    <td>
                      <button className="btn btn-sm btn-primary me-2" onClick={() => handleEditClick(job)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(job.job_id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="text-center">No jobs found</td></tr>
              )}
            </tbody>
          </table> */}


        <DataTable data={jobs} columns={JobsColumn}/>

<div className="d-flex justify-content-center align-items-center gap-2">
  <button
    className="btn btn-outline-primary"
    onClick={() => handlePageClick(currentPage - 1)}
    disabled={currentPage === 1}
  >
    Previous
  </button>

  <span className="fw-bold">Page {currentPage} of {totalPages}</span>

  <button
    className="btn btn-outline-primary"
    onClick={() => handlePageClick(currentPage + 1)}
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>
        </>
      )}

      {/* Edit Modal */}
      {editingJob && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "#00000080" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Job</h5>
                <button className="btn-close" onClick={() => setEditingJob(null)}></button>
              </div>
              <div className="modal-body">
                <input className="form-control mb-2" name="title" value={editingJob.title} onChange={handleEditChange} />
                <input className="form-control mb-2" name="company_name" value={editingJob.company_name} onChange={handleEditChange} />
                <input className="form-control mb-2" name="location" value={editingJob.location} onChange={handleEditChange} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setEditingJob(null)}>Cancel</button>
                <button className="btn btn-success" onClick={handleEditSubmit}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;
