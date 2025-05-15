// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
// // Import CreateRecruiterForm component
// import CreateRecruiterForm from "./CreateRecruiterForm";

// const VITE_ADMIN_URL = import.meta.env.VITE_ADMIN_URL;

// const InquiryTable = () => {
//   const [inquiries, setInquiries] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [selectedInquiry, setSelectedInquiry] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);

//   const [showReplyPopup, setShowReplyPopup] = useState(false);
//   const [replySubject, setReplySubject] = useState("");
//   const [replyMessage, setReplyMessage] = useState("");

//   const [showCreateRecruiterForm, setShowCreateRecruiterForm] = useState(false);
//   const [createFormData, setCreateFormData] = useState({
//     FirstName: '',
//     LastName: '',
//     Email: '',
//     Phone: '',
//     Password: '',
//     CompanyName: '',
//     Designation: ''
//   });

//   // Prefill form data when inquiry selected and create form opened
//   const openCreateRecruiterForm = () => {
//     if (selectedInquiry) {
//       const names = selectedInquiry.Full_Name.split(" ");
//       setCreateFormData({
//         FirstName: names[0] || '',
//         LastName: names.slice(1).join(" ") || '',
//         Email: selectedInquiry.Email || '',
//         Phone: selectedInquiry.Phone_Number || '',
//         Password: '', // leave blank or generate default
//         CompanyName: '', // optional to fill if you have company info
//         Designation: ''  // optional
//       });
//     }
//     setShowCreateRecruiterForm(true);
//   };

//   const handleCreateChange = (e) => {
//     setCreateFormData({ ...createFormData, [e.target.name]: e.target.value });
//   };

//   const handleCreateSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${VITE_ADMIN_URL}/create-recruiter`, createFormData);
//       alert("Recruiter account created successfully!");
//       setShowCreateRecruiterForm(false);
//       setCreateFormData({
//         FirstName: '', LastName: '', Email: '', Phone: '',
//         Password: '', CompanyName: '', Designation: ''
//       });
//       // Optionally refresh inquiries or recruiters list here
//     } catch (err) {
//       console.error('Error creating recruiter:', err);
//       alert("Failed to create recruiter.");
//     }
//   };

//   const fetchInquiries = async (page = 1) => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${VITE_ADMIN_URL}/inquiries?page=${page}`);
//       const { inquiries, pagination } = res.data.data;
//       setInquiries(inquiries);
//       setCurrentPage(pagination.currentPage);
//       setTotalPages(pagination.totalPages);
//     } catch (error) {
//       console.error("Failed to fetch inquiries:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this inquiry?");
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`/api/admin/inquiries/${id}`);
//       fetchInquiries(currentPage);
//       if (selectedInquiry?._id === id) {
//         setShowPopup(false);
//         setSelectedInquiry(null);
//       }
//     } catch (error) {
//       console.error("Failed to delete inquiry:", error);
//     }
//   };

//   const handleView = (inquiry) => {
//     setSelectedInquiry(inquiry);
//     setShowPopup(true);
//     setShowReplyPopup(false);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleReplySend = async () => {
//     if (!replySubject || !replyMessage) {
//       return alert("Please enter subject and message.");
//     }

//     try {
//       const payload = {
//         subject: replySubject,
//         message: replyMessage,
//         inquiryId: selectedInquiry._id,
//         email: selectedInquiry.Email,
//       };

//       await axios.post("http://localhost:5000/admin/inquiries/reply", payload);
//       alert("Reply sent successfully!");
//       setShowReplyPopup(false);
//       setReplySubject("");
//       setReplyMessage("");
//     } catch (error) {
//       console.error("Failed to send reply:", error);
//       alert("Failed to send reply.");
//     }
//   };

//   useEffect(() => {
//     fetchInquiries(currentPage);
//   }, [currentPage]);

//   return (
//     <div className="container mt-4">
//       <h2>All Inquiries</h2>
//       {loading ? (
//         <div className="text-center my-4">Loading...</div>
//       ) : (
//         <>
//           <div className="table-responsive mt-3">
//             <table className="table table-bordered table-striped align-middle">
//               <thead className="table-dark">
//                 <tr>
//                   <th>#</th>
//                   <th>Full Name</th>
//                   <th>Email</th>
//                   <th>Phone Number</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {inquiries.length > 0 ? (
//                   inquiries.map((inquiry, index) => (
//                     <tr key={inquiry._id}>
//                       <td>{(currentPage - 1) * 5 + index + 1}</td>
//                       <td>{inquiry.Full_Name}</td>
//                       <td>{inquiry.Email}</td>
//                       <td>{inquiry.Phone_Number}</td>
//                       <td>
//                         <button
//                           className="btn btn-sm btn-primary me-2"
//                           onClick={() => handleView(inquiry)}
//                         >
//                           View
//                         </button>
//                         <button
//                           className="btn btn-sm btn-danger"
//                           onClick={() => handleDelete(inquiry._id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="text-center">
//                       No inquiries found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <nav className="mt-3">
//             <ul className="pagination justify-content-center">
//               {[...Array(totalPages)].map((_, index) => (
//                 <li
//                   key={index}
//                   className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
//                 >
//                   <button
//                     className="page-link"
//                     onClick={() => handlePageChange(index + 1)}
//                   >
//                     {index + 1}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Inquiry View Modal */}
//           {showPopup && selectedInquiry && (
//             <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//               <div className="modal-dialog modal-dialog-centered" role="document">
//                 <div className="modal-content">
//                   <div className="modal-header">
//                     <h5 className="modal-title">Inquiry Details</h5>
//                     <button type="button" className="btn-close" onClick={() => setShowPopup(false)}></button>
//                   </div>
//                   <div className="modal-body">
//                     <p><strong>Name:</strong> {selectedInquiry.Full_Name}</p>
//                     <p><strong>Email:</strong> {selectedInquiry.Email}</p>
//                     <p><strong>Phone:</strong> {selectedInquiry.Phone_Number}</p>
//                     <p><strong>Message:</strong><br />{selectedInquiry.Message}</p>
//                   </div>
//                   <div className="modal-footer d-flex justify-content-between">
//                     <button className="btn btn-success" onClick={() => setShowReplyPopup(true)}>Reply</button>
//                     <button
//                       className="btn btn-primary"
//                       onClick={openCreateRecruiterForm}
//                     >
//                       Create Account
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Reply Modal */}
//           {showReplyPopup && selectedInquiry && (
//             <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//               <div className="modal-dialog modal-dialog-centered" role="document">
//                 <div className="modal-content">
//                   <div className="modal-header">
//                     <h5 className="modal-title">Reply to Inquiry</h5>
//                     <button type="button" className="btn-close" onClick={() => setShowReplyPopup(false)}></button>
//                   </div>
//                   <div className="modal-body">
//                     <div className="mb-3">
//                       <label className="form-label">Subject</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         value={replySubject}
//                         onChange={(e) => setReplySubject(e.target.value)}
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label">Message</label>
//                       <textarea
//                         className="form-control"
//                         rows="4"
//                         value={replyMessage}
//                         onChange={(e) => setReplyMessage(e.target.value)}
//                       ></textarea>
//                     </div>
//                   </div>
//                   <div className="modal-footer">
//                     <button className="btn btn-primary" onClick={handleReplySend}>Send</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Create Recruiter Modal */}
//           {showCreateRecruiterForm && (
//             <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//               <div className="modal-dialog modal-dialog-centered" role="document">
//                 <div className="modal-content">
//                   <div className="modal-header">
//                     <h5 className="modal-title">Create Recruiter Account</h5>
//                     <button type="button" className="btn-close" onClick={() => setShowCreateRecruiterForm(false)}></button>
//                   </div>
//                   <div className="modal-body">
//                     <CreateRecruiterForm
//                       formData={createFormData}
//                       onChange={handleCreateChange}
//                       onSubmit={handleCreateSubmit}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default InquiryTable;


































import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
// Import CreateRecruiterForm component
import CreateRecruiterForm from "./CreateRecruiterForm";

const VITE_ADMIN_URL = import.meta.env.VITE_ADMIN_URL;

const InquiryTable = () => {
  const [inquiries, setInquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [showReplyPopup, setShowReplyPopup] = useState(false);
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");

  const [showCreateRecruiterForm, setShowCreateRecruiterForm] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    Password: '',
    CompanyName: '',
    Designation: ''
  });

  // Prefill form data when inquiry selected and create form opened
  const openCreateRecruiterForm = () => {
    if (selectedInquiry) {
      const names = selectedInquiry.Full_Name.split(" ");
      setCreateFormData({
        FirstName: names[0] || '',
        LastName: names.slice(1).join(" ") || '',
        Email: selectedInquiry.Email || '',
        Phone: selectedInquiry.Phone_Number || '',
        Password: '', // leave blank or generate default
        CompanyName: '', // optional to fill if you have company info
        Designation: ''  // optional
      });
    }
    setShowCreateRecruiterForm(true);
  };

  const handleCreateChange = (e) => {
    setCreateFormData({ ...createFormData, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${VITE_ADMIN_URL}/create-recruiter`, createFormData);
      alert("Recruiter account created successfully!");
      setShowCreateRecruiterForm(false);
      setCreateFormData({
        FirstName: '', LastName: '', Email: '', Phone: '',
        Password: '', CompanyName: '', Designation: ''
      });
      // Optionally refresh inquiries or recruiters list here
    } catch (err) {
      console.error('Error creating recruiter:', err);
      alert("Failed to create recruiter.");
    }
  };

  const fetchInquiries = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(`${VITE_ADMIN_URL}/inquiries?page=${page}`);
      const { inquiries, pagination } = res.data.data;
      setInquiries(inquiries);
      setCurrentPage(pagination.currentPage);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this inquiry?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/admin/inquiries/${id}`);
      fetchInquiries(currentPage);
      if (selectedInquiry?._id === id) {
        setShowPopup(false);
        setSelectedInquiry(null);
      }
    } catch (error) {
      console.error("Failed to delete inquiry:", error);
    }
  };

  const handleView = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowPopup(true);
    setShowReplyPopup(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReplySend = async () => {
    if (!replySubject || !replyMessage) {
      return alert("Please enter subject and message.");
    }

    try {
      const payload = {
        subject: replySubject,
        message: replyMessage,
        inquiryId: selectedInquiry._id,
        email: selectedInquiry.Email,
      };

      await axios.post("http://localhost:5000/admin/inquiries/reply", payload);
      alert("Reply sent successfully!");
      setShowReplyPopup(false);
      setReplySubject("");
      setReplyMessage("");
    } catch (error) {
      console.error("Failed to send reply:", error);
      alert("Failed to send reply.");
    }
  };

  useEffect(() => {
    fetchInquiries(currentPage);
  }, [currentPage]);

  return (
    <div className="container mt-4">
      <h2>All Inquiries</h2>
      {loading ? (
        <div className="text-center my-4">Loading...</div>
      ) : (
        <>
          <div className="table-responsive mt-3">
            <table className="table table-bordered table-striped align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.length > 0 ? (
                  inquiries.map((inquiry, index) => (
                    <tr key={inquiry._id}>
                      <td>{(currentPage - 1) * 5 + index + 1}</td>
                      <td>{inquiry.Full_Name}</td>
                      <td>{inquiry.Email}</td>
                      <td>{inquiry.Phone_Number}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleView(inquiry)}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(inquiry._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No inquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <nav className="mt-3">
            <ul className="pagination justify-content-center">
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Inquiry View Modal */}
          {showPopup && selectedInquiry && (
            <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Inquiry Details</h5>
                    <button type="button" className="btn-close" onClick={() => setShowPopup(false)}></button>
                  </div>
                  <div className="modal-body">
                    <p><strong>Name:</strong> {selectedInquiry.Full_Name}</p>
                    <p><strong>Email:</strong> {selectedInquiry.Email}</p>
                    <p><strong>Phone:</strong> {selectedInquiry.Phone_Number}</p>
                    <p><strong>Message:</strong><br />{selectedInquiry.Message}</p>
                  </div>
                  <div className="modal-footer d-flex justify-content-between">
                    <button className="btn btn-success" onClick={() => setShowReplyPopup(true)}>Reply</button>
                    <button
                      className="btn btn-primary"
                      onClick={openCreateRecruiterForm}
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reply Modal */}
          {showReplyPopup && selectedInquiry && (
            <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Reply to Inquiry</h5>
                    <button type="button" className="btn-close" onClick={() => setShowReplyPopup(false)}></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        value={replySubject}
                        onChange={(e) => setReplySubject(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-primary" onClick={handleReplySend}>Send</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Create Recruiter Modal */}
          {showCreateRecruiterForm && (
            <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Create Recruiter Account</h5>
                    <button type="button" className="btn-close" onClick={() => setShowCreateRecruiterForm(false)}></button>
                  </div>
                  <div className="modal-body">
                    <CreateRecruiterForm
                      formData={createFormData}
                      onChange={handleCreateChange}
                      onSubmit={handleCreateSubmit}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InquiryTable;
