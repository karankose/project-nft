import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // Keeping react-bootstrap Modal for layout
import { FaTimes } from 'react-icons/fa'; // Using react-icons for X icon

const API_URL = import.meta.env.VITE_API_URL;
const LIMIT = 10;

const UserTableList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  const fetchProfiles = async (currentPage) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/recruiter/all_user?page=${currentPage}&limit=${LIMIT}`);
      setUsers(res.data.data);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching user profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles(page);
  }, [page]);

  const handleNameClick = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleDownloadResume = async () => {
    if (!selectedUser?.resume?._id) return;

    try {
      const res = await axios.get(`${API_URL}/resume/download/${selectedUser.resume._id}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  return (
    <div className="container py-4" style={{ backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <h2 className="mb-4 text-center text-primary">User Profiles</h2>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered align-middle">
              <thead className="table-info">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Experience</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNameClick(user);
                        }}
                        className="text-decoration-none text-primary fw-semibold"
                      >
                        {user.FirstName} {user.LastName}
                      </a>
                    </td>
                    <td>{user.Email}</td>
                    <td>{user.contact || 'N/A'}</td>
                    <td>{user.resume?.experience || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="btn btn-outline-secondary" onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </button>
            <span className="fw-semibold">Page {page} of {totalPages}</span>
            <button className="btn btn-outline-secondary" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </>
      )}

      {/* User Detail Modal */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)} centered>
        <Modal.Header>
          <Modal.Title>User Information</Modal.Title>
          <Button variant="link" onClick={() => setShowUserModal(false)} className="ms-auto text-dark">
            <FaTimes />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Name:</strong> {selectedUser?.FirstName} {selectedUser?.LastName}</p>
          <p><strong>Email:</strong> {selectedUser?.Email}</p>
          <p><strong>Contact:</strong> {selectedUser?.contact || 'N/A'}</p>
          <p><strong>Experience:</strong> {selectedUser?.resume?.experience || 'N/A'}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowResumeModal(true)} disabled={!selectedUser?.resume?.html}>
            View Resume
          </Button>
          <Button variant="success" onClick={handleDownloadResume} disabled={!selectedUser?.resume?._id}>
            Download Resume
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Resume View Modal */}
      <Modal show={showResumeModal} onHide={() => setShowResumeModal(false)} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Resume Preview</Modal.Title>
          <Button variant="link" onClick={() => setShowResumeModal(false)} className="ms-auto text-dark">
            <FaTimes />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div
            dangerouslySetInnerHTML={{ __html: selectedUser?.resume?.html || '<p>No resume available.</p>' }}
            style={{ maxHeight: '70vh', overflowY: 'auto' }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserTableList;
