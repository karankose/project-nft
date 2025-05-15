import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import FormInputs from "../reuseComponts/reuseFormComponent/FormInputs";
import CustomButton from "../reuseComponts/reuseButton/CustomButton";
const JobCRUD = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [show, setShow] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [formData, setFormData] = useState({
    job_id: "",
    title: "",
    company_name: "",
    location: "",
    type: "",
    description: "",
    min_salary: "",
    max_salary: "",
    postDate: "",
    apply_link: "",
    source: "",
    job_google_link: "",
  });

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleShow = (job = null) => {
    setEditJob(job);
    setFormData(
      job || {
        job_id: "",
        title: "",
        company_name: "",
        location: "",
        type: "",
        description: "",
        min_salary: "",
        max_salary: "",
        postDate: "",
        apply_link: "",
        source: "",
        job_google_link: "",
      }
    );
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const requiredFields = [
      "job_id",
      "title",
      "company_name",
      "location",
      "type",
      "description",
      "min_salary",
      "max_salary",
      "postDate",
      "apply_link",
      "source",
      "job_google_link",
    ];
    for (let field of requiredFields) {
      if (!formData[field].trim()) {
        alert(`${field.replace(/_/g, " ")} is required.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editJob) {
        await axios.put(`/api/admin/job/${editJob._id}`, formData);
      } else {
        await axios.post("/api/admin/job", formData);
      }
      fetchJobs();
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save job data.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`/api/admin/job/${id}`);
      fetchJobs();
    } catch (error) {
      console.error("Failed to delete job:", error);
      alert("Failed to delete job.");
    }
  };

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <h2>Job Management</h2>
      <CustomButton onClick={() => handleShow()}>Add Job</CustomButton>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Job ID</th>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Type</th>
            <th>Description</th>
            <th>Min Salary</th>
            <th>Max Salary</th>
            <th>Post Date</th>
            <th>Apply Link</th>
            <th>Source</th>
            <th>Google Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentJobs.map((job, index) => (
            <tr key={job._id}>
              <td>{indexOfFirstJob + index + 1}</td>
              <td>{job.job_id}</td>
              <td>{job.title}</td>
              <td>{job.company_name}</td>
              <td>{job.location}</td>
              <td>{job.type}</td>
              <td>{job.description}</td>
              <td>{job.min_salary}</td>
              <td>{job.max_salary}</td>
              <td>{job.postDate}</td>
              <td>
                <a href={job.apply_link} target="_blank" rel="noreferrer">
                  Apply
                </a>
              </td>
              <td>{job.source}</td>
              <td>
                <a href={job.job_google_link} target="_blank" rel="noreferrer">
                  Google
                </a>
              </td>
              <td>
                <CustomButton onClick={() => handleShow(job)}>Edit</CustomButton>{" "}
                <CustomButton
                  onClick={() => handleDelete(job._id)}
                  variant="danger"
                >
                  Delete
                </CustomButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <nav>
        <ul className="pagination">
          {Array.from(
            { length: Math.ceil(jobs.length / jobsPerPage) },
            (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button onClick={() => paginate(i + 1)} className="page-link">
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editJob ? "Edit Job" : "Add Job"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <FormInputs
              name="job_id"
              label="Job ID"
              value={formData.job_id}
              onChange={handleChange}
              required
            />
            <FormInputs
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <FormInputs
              name="company_name"
              label="Company Name"
              value={formData.company_name}
              onChange={handleChange}
              required
            />
            <FormInputs
              name="location"
              label="Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <FormInputs
              name="type"
              label="Job Type"
              value={formData.type}
              onChange={handleChange}
              required
            />
            <FormInputs
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <FormInputs
              name="min_salary"
              label="Min Salary"
              value={formData.min_salary}
              onChange={handleChange}
              required
            />
            <FormInputs
              name="max_salary"
              label="Max Salary"
              value={formData.max_salary}
              onChange={handleChange}
              required
            />
            <FormInputs
              name="postDate"
              label="Post Date"
              value={formData.postDate}
              onChange={handleChange}
              required
            />
            <FormInputs
              name="apply_link"
              label="Apply Link"
              value={formData.apply_link}
              onChange={handleChange}
              required
            />
            <FormInputs
              name="source"
              label="Source"
              value={formData.source}
              onChange={handleChange}
              required
            />
            <FormInputs
              name="job_google_link"
              label="Google Job Link"
              value={formData.job_google_link}
              onChange={handleChange}
              required
            />
            <CustomButton type="submit">
              {editJob ? "Update" : "Create"}
            </CustomButton>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default JobCRUD;
