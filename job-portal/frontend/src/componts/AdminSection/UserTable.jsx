
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormInputs from '../../componts/reuseComponts/reuseFormComponent/FormInputs';
import CustomButton from '../../componts/reuseComponts/reuseButton/CustomButton';

const VITE_ADMIN_URL = import.meta.env.VITE_ADMIN_URL;

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editUser, setEditUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: ''
  });

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUserData, setNewUserData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    
  });

  const fetchUsers = (page) => {
    axios.get(`${VITE_ADMIN_URL}/get-users-data?page=${page}`)
      .then((response) => {
        setUsers(response.data.data);
        setCurrentPage(response.data.pagination.currentPage);
        setTotalPages(response.data.pagination.totalPages);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleDelete = (userId) => {
    axios.delete(`${VITE_ADMIN_URL}/delete-user/${userId}`)
      .then(() => {
        fetchUsers(currentPage);
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setEditFormData({
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      Password : user.Password,
      Phone: user.Phone || ''
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios.put(`${VITE_ADMIN_URL}/update-user/${editUser._id}`, editFormData)
      .then(() => {
        fetchUsers(currentPage);
        setEditUser(null);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  const handleCreateChange = (e) => {
    setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    axios.post(`${VITE_ADMIN_URL}/create-user`, newUserData)
      .then(() => {
        setNewUserData({
          FirstName: '',
          LastName: '',
          Email: '',
          Password : '',
          Phone: '',
         
        });
        setShowCreateForm(false);
        fetchUsers(currentPage);
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mt-5">
      <h2>User List</h2>

      <CustomButton
        label={showCreateForm ? "Close Create Form" : "Create New User"}
        onClick={() => setShowCreateForm(!showCreateForm)}
        btnClassName="btn btn-success mb-3"
      />

      {showCreateForm && (
        <div className="card p-4 mb-4">
          <h5>Create New User</h5>
          <form onSubmit={handleCreateSubmit}>
            <FormInputs
              label="First Name"
              name="FirstName"
              value={newUserData.FirstName}
              onChange={handleCreateChange}
              required
              placeholder="Enter First Name"
              wrapperClassName="mb-3"
            />
            <FormInputs
              label="Last Name"
              name="LastName"
              value={newUserData.LastName}
              onChange={handleCreateChange}
              required
              placeholder="Enter Last Name"
              wrapperClassName="mb-3"
            />
            <FormInputs
              label="Email"
              name="Email"
              type="email"
              value={newUserData.Email}
              onChange={handleCreateChange}
              required
              placeholder="Enter Email"
              wrapperClassName="mb-3"
            />
            <FormInputs
              label="Password"
              name="Password"
              type="Password"
              value={newUserData.Password}
              onChange={handleCreateChange}
              required
              placeholder="Enter Password"
              wrapperClassName="mb-3"
            />
            <FormInputs
              label="Phone"
              name="Phone"
              value={newUserData.Phone}
              onChange={handleCreateChange}
              placeholder="Enter Phone"
              wrapperClassName="mb-3"
            />
           
            <CustomButton type="submit" label="Create User" btnClassName="btn btn-primary" />
          </form>
        </div>
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{(currentPage - 1) * 5 + index + 1}</td>
              <td>{user.FirstName}</td>
              <td>{user.LastName}</td>
              <td>{user.Email}</td>
              <td>{user.Phone || 'N/A'}</td>
              <td>{user.Role}</td>
              <td>
                <button className="btn btn-primary me-2" onClick={() => handleEdit(user)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
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
      {editUser && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form onSubmit={handleEditSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit User</h5>
                  <button type="button" className="btn-close" onClick={() => setEditUser(null)}></button>
                </div>
                <div className="modal-body">
                  <FormInputs
                    label="First Name"
                    name="FirstName"
                    value={editFormData.FirstName}
                    onChange={handleEditChange}
                    required
                    placeholder="Enter First Name"
                    wrapperClassName="mb-3"
                  />
                  <FormInputs
                    label="Last Name"
                    name="LastName"
                    value={editFormData.LastName}
                    onChange={handleEditChange}
                    required
                    placeholder="Enter Last Name"
                    wrapperClassName="mb-3"
                  />
                  <FormInputs
                    label="Email"
                    name="Email"
                    type="email"
                    value={editFormData.Email}
                    onChange={handleEditChange}
                    required
                    placeholder="Enter Email"
                    wrapperClassName="mb-3"
                  />
                  <FormInputs
                    label="Phone"
                    name="Phone"
                    value={editFormData.Phone}
                    onChange={handleEditChange}
                    placeholder="Enter Phone"
                    wrapperClassName="mb-3"
                  />
                </div>
                <div className="modal-footer">
                  <CustomButton type="submit" label="Update" btnClassName="btn btn-success" />
                  <CustomButton type="button" label="Cancel" onClick={() => setEditUser(null)} btnClassName="btn btn-secondary" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
