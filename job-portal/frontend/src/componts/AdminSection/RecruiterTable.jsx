
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormInputs from '../../componts/reuseComponts/reuseFormComponent/FormInputs';
import CustomButton from '../../componts/reuseComponts/reuseButton/CustomButton';
import CreateRecruiterForm from './CreateRecruiterForm';

const VITE_ADMIN_URL = import.meta.env.VITE_ADMIN_URL;

const RecruiterTable = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [editRecruiter, setEditRecruiter] = useState(null);
  const [editFormData, setEditFormData] = useState({
    FirstName: '', LastName: '', Email: '', Phone: '',
    CompanyName: '', Designation: ''
  });

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    FirstName: '', LastName: '', Email: '', Phone: '',
    Password: '', CompanyName: '', Designation: ''
  });

  const fetchRecruiters = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(`${VITE_ADMIN_URL}/get-recruiters?page=${page}`);
      setRecruiters(res.data.data);
      setCurrentPage(res.data.pagination.currentPage);
      setTotalPages(res.data.pagination.totalPages);
      setError(null);
    } catch (err) {
      setError('Failed to fetch recruiters');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiters(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recruiter?")) return;
    try {
      await axios.delete(`${VITE_ADMIN_URL}/delete-recruiter/${id}`);
      fetchRecruiters(currentPage);
    } catch (err) {
      console.error('Error deleting recruiter:', err);
    }
  };

  const handleEdit = (recruiter) => {
    setEditRecruiter(recruiter);
    setEditFormData({
      FirstName: recruiter.FirstName,
      LastName: recruiter.LastName,
      Email: recruiter.Email,
      Phone: recruiter.Phone || '',
      CompanyName: recruiter.CompanyName,
      Designation: recruiter.Designation || ''
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${VITE_ADMIN_URL}/update-recruiter/${editRecruiter._id}`, editFormData);
      fetchRecruiters(currentPage);
      setEditRecruiter(null);
    } catch (err) {
      console.error('Error updating recruiter:', err);
    }
  };

  const handleCreateChange = (e) => {
    setCreateFormData({ ...createFormData, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${VITE_ADMIN_URL}/create-recruiter`, createFormData);
      setShowCreateForm(false);
      setCreateFormData({
        FirstName: '', LastName: '', Email: '', Phone: '',
        Password: '', CompanyName: '', Designation: ''
      });
      fetchRecruiters(currentPage);
    } catch (err) {
      console.error('Error creating recruiter:', err);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="container mt-5">
      <h2>Recruiter List</h2>

      <CustomButton
        label={showCreateForm ? "Close Create Form" : "Create New Recruiter"}
        onClick={() => setShowCreateForm(!showCreateForm)}
        btnClassName="btn btn-success mb-3"
      />

      {/* {showCreateForm && (
        <div className="card mb-4 p-3">
          <form onSubmit={handleCreateSubmit}>
            {["FirstName", "LastName", "Email", "Phone", "CompanyName", "Designation", "Password"].map(field => (
              <FormInputs
                key={field}
                label={field.replace(/([A-Z])/g, ' $1')}
                name={field}
                type={field === 'Password' ? 'password' : field === 'Email' ? 'email' : 'text'}
                value={createFormData[field]}
                onChange={handleCreateChange}
                required={['FirstName', 'LastName', 'Email', 'CompanyName', 'Password'].includes(field)}
                wrapperClassName="mb-3"
              />
            ))}
            <CustomButton type="submit" label="Create" btnClassName="btn btn-primary" />
          </form>
        </div>
      )} */}


{showCreateForm && (
  <CreateRecruiterForm
    formData={createFormData}
    onChange={handleCreateChange}
    onSubmit={handleCreateSubmit}
  />
)}


      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>First</th>
              <th>Last</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Designation</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recruiters.map((r, i) => (
              <tr key={r._id}>
                <td>{(currentPage - 1) * 5 + i + 1}</td>
                <td>{r.FirstName}</td>
                <td>{r.LastName}</td>
                <td>{r.Email}</td>
                <td>{r.Phone || 'N/A'}</td>
                <td>{r.CompanyName}</td>
                <td>{r.Designation || 'N/A'}</td>
                <td>{r.Role}</td>
                <td>
                  <button className="btn btn-primary me-2" onClick={() => handleEdit(r)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(r._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i + 1} className={`page-item ${currentPage === i + 1 && 'active'}`}>
              <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>

      {/* Edit Modal */}
      {editRecruiter && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleEditSubmit}>
                <div className="modal-header">
                  <h5>Edit Recruiter</h5>
                  <button type="button" className="btn-close" onClick={() => setEditRecruiter(null)}></button>
                </div>
                <div className="modal-body">
                  {["FirstName", "LastName", "Email", "Phone", "CompanyName", "Designation"].map(field => (
                    <FormInputs
                      key={field}
                      label={field.replace(/([A-Z])/g, ' $1')}
                      name={field}
                      type={field === 'Email' ? 'email' : 'text'}
                      value={editFormData[field]}
                      onChange={handleEditChange}
                      required={['FirstName', 'LastName', 'Email', 'CompanyName'].includes(field)}
                      wrapperClassName="mb-3"
                    />
                  ))}
                </div>
                <div className="modal-footer">
                  <CustomButton type="submit" label="Update" btnClassName="btn btn-success" />
                  <CustomButton type="button" label="Cancel" onClick={() => setEditRecruiter(null)} btnClassName="btn btn-secondary" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterTable;









