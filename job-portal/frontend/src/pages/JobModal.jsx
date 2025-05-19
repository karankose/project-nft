import React from "react";

const JobModal = ({ jobs, onClose }) => {
  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "#00000099" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Jobs in Company</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {jobs && jobs.length > 0 ? (
              <ul className="list-group">
                {jobs.map((job, index) => (
                  <li key={index} className="list-group-item">
                    <strong>{job.title}</strong> - {job.location}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No jobs available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
