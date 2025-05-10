import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";
import CustomButton from "../reuseComponts/reuseButton/CustomButton";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

function JobDetails() {
  const { id } = useParams(); 
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applyStatus, setApplyStatus] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  const { currentUser, isLoggedIn } = useSelector((state) => state.user); // Redux state

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${API_URL}/jobs/${id}`);
        setJob(response.data.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching job:", error);
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleViewMoreClick = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleJobApplyClick = async () => {
    // If the user is not logged in, redirect to the login page

    if (!isLoggedIn || !currentUser?.id) {
      toast.warning("Please log in to apply for the job.");
      navigate("/login");
      return;
    }

    try {
      setApplying(true);
      const response = await axios.post(`${API_URL}/jobs/applications/apply`, {
        userId: currentUser.id,
        jobId: id,
      });

      toast.success("Applied successfully!");
    } catch (error) {
      console.error("Application error:", error);
      toast.error("Failed to apply. You may have already applied.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (!job) return <div className="text-center text-danger">Job not found</div>;

  const descriptionPreview = job.description.slice(0, Math.floor(job.description.length * 0.2));
  const fullDescription = job.description;

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h2>{job.title}</h2>
            </div>
            <div className="card-body">
              <div className="mb-3 text-center">
                {job.thumbnail && (
                  <img
                    src={job.thumbnail}
                    alt={job.title}
                    className="img-fluid mb-3"
                    style={{ maxWidth: "300px", height: "auto", objectFit: "contain" }}
                  />
                )}
                <p><strong>Company:</strong> {job.company_name}</p>
                <p><strong>Location:</strong> {job.location}</p>
                {job.via && <p><strong>Posted via:</strong> {job.via}</p>}
                {job.extensions?.length > 0 && (
                  <div>
                    <p><strong>Job Extensions:</strong></p>
                    <ul>
                      {job.extensions.map((ext, idx) => (
                        <li key={idx}>{ext}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {job.detected_extensions && (
                  <div>
                    <p><strong>Posted At:</strong> {job.detected_extensions.posted_at}</p>
                    <p><strong>Schedule Type:</strong> {job.detected_extensions.schedule_type}</p>
                  </div>
                )}
                <p><strong>Salary:</strong> {job.salary}</p>


                {currentUser?.Role !== 'recruiter' && (
                  <CustomButton
                    wrapperClassName="col"
                    btnClassName="btn-dark w-100"
                    label={applying ? "Applying..." : "Apply Now"}
                    type="button"
                    onClick={handleJobApplyClick}
                  />
                )}
                {applyStatus && (
                  <div className="mt-2 text-success text-center">
                    {applyStatus}
                  </div>
                )}
              </div>

              {/* Description Section */}
              <div>
                <p><strong>Description:</strong></p>
                <p>
                  {isDescriptionExpanded ? fullDescription : descriptionPreview}
                  {fullDescription.length > descriptionPreview.length && (
                    <button
                      onClick={handleViewMoreClick}
                      className="btn btn-link p-0"
                    >
                      {isDescriptionExpanded ? "View Less" : "View More"}
                    </button>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
