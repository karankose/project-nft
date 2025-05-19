// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchJobs, deleteJob, updateJob, setCurrentPage } from "../../redux/jobSlice";
// import DataTable from "../screens/DataTable";
// import CustomButton from "../reuseComponts/reuseButton/CustomButton";

// const JobList = () => {

//   const JobsColumn = [
//   {
//     title: "Title",
//     render: (j) => (
//      <p>{j.title}</p>
//     ),
//   },
//   {
//     title: "company",
//     render: (j) => j.company_name,
//   },
  
//   {
//     title: "location",
//     render: (j) => j.location,
//   },
//   {
//     title : "Posted",
//     render: (j) => j.via,
//   },
//   {
//     title : "extensions",
//     render: (j) => j.extensions,
//   },
//   {
//     title: "Actions",
//     render: (job) => (
//       <>
//           <CustomButton
           
//             wrapperClassName="w-100 m-2 "
//             btnClassName="btn btn-outline-primary w-100"
//             label="Edit"
//             onClick={handleEditClick}
//           />
       
      
//           <CustomButton
//            onClick={()=>handleDelete(job._id)}
//             wrapperClassName="w-100 m-2 "
//             btnClassName="btn btn-outline-danger w-100"
//             label="Delete"
//           />
        
     
   
//       </>
//     ),
//   },
// ];
//   const dispatch = useDispatch();
//   const { jobs, totalPages, currentPage, loading } = useSelector((state) => state.jobs);

//   const [filters, setFilters] = useState({ title: "", company_name: "", location: "" });
//   const [editingJob, setEditingJob] = useState(null);

//   useEffect(() => {
//     dispatch(fetchJobs({ ...filters, page: currentPage }));
//   }, [filters, currentPage, dispatch]);

//   const handleChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//     dispatch(setCurrentPage(1));
//   };

//   const handlePageClick = (page) => {
//     dispatch(setCurrentPage(page));
//   };

//   const handleDelete = (id) => {
    
//     if (confirm("Are you sure you want to delete this job?")) {
//       dispatch(deleteJob(id));
      
//     }
//   };

//   const handleEditClick = (job) => {
//     setEditingJob({ ...job });
    
//   };

//   const handleEditChange = (e) => {
//     setEditingJob({ ...editingJob, [e.target.name]: e.target.value });
//   };

//   const handleEditSubmit = () => {
//     dispatch(updateJob({ id: editingJob._id, updatedData: editingJob }));
//     setEditingJob(null);
//   };
//   console.log(jobs);

//   return (
//     <div className="container mt-4">
//       <h2>Job List</h2>

//       {/* Filters */}
//       <div className="mb-3 d-flex gap-2">
//         <input name="title" className="form-control" placeholder="Title" value={filters.title} onChange={handleChange} />
//         <input name="company_name" className="form-control" placeholder="Company" value={filters.company_name} onChange={handleChange} />
//         <input name="location" className="form-control" placeholder="Location" value={filters.location} onChange={handleChange} />
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//         <DataTable data={jobs} columns={JobsColumn}/>

// <div className="d-flex justify-content-center align-items-center gap-2">
//   <button
//     className="btn btn-outline-primary"
//     onClick={() => handlePageClick(currentPage - 1)}
//     disabled={currentPage === 1}
//   >
//     Previous
//   </button>

//   <span className="fw-bold">Page {currentPage} of {totalPages}</span>

//   <button
//     className="btn btn-outline-primary"
//     onClick={() => handlePageClick(currentPage + 1)}
//     disabled={currentPage === totalPages}
//   >
//     Next
//   </button>
// </div>
//         </>
//       )}

//       {/* Edit Modal */}
//       {editingJob && (
//         <div className="modal show d-block" tabIndex="-1" style={{ background: "#00000080" }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5>Edit Job</h5>
//                 <button className="btn-close" onClick={() => setEditingJob(null)}></button>
//               </div>
//               <div className="modal-body">
//                 <input className="form-control mb-2" name="title" value={editingJob.title} onChange={handleEditChange} />
//                 <input className="form-control mb-2" name="company_name" value={editingJob.company_name} onChange={handleEditChange} />
//                 <input className="form-control mb-2" name="location" value={editingJob.location} onChange={handleEditChange} />
//               </div>
//               <div className="modal-footer">
//                 <button className="btn btn-secondary" onClick={() => setEditingJob(null)}>Cancel</button>
//                 <button className="btn btn-success" onClick={handleEditSubmit}>Save</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobList;










import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobs,
  deleteJob,
  updateJob,
  createJob,
  setCurrentPage,
} from "../../redux/jobSlice";
import DataTable from "../screens/DataTable";
import CustomButton from "../reuseComponts/reuseButton/CustomButton";

const JobList = () => {
  const dispatch = useDispatch();
  const { jobs, totalPages, currentPage, loading } = useSelector(
    (state) => state.jobs
  );

  const [filters, setFilters] = useState({
    title: "",
    company_name: "",
    location: "",
  });

  const [editingJob, setEditingJob] = useState(null);
  const [creatingJob, setCreatingJob] = useState(false);
 const [newJob, setNewJob] = useState({
  title: "",
  company_name: "",
  location: "",
  via: "",
  extensions: "",
});


  const JobsColumn = [
    {
      title: "Title",
      render: (j) => <p>{j.title}</p>,
    },
    {
      title: "Company",
      render: (j) => j.company_name,
    },
    {
      title: "Location",
      render: (j) => j.location,
    },
    {
      title: "Posted",
      render: (j) => j.via,
    },
    {
      title: "Extensions",
      render: (j) => j.extensions,
    },
    {
      title: "Actions",
      render: (job) => (
        <>
          <CustomButton
            wrapperClassName="w-100 m-2"
            btnClassName="btn btn-outline-primary w-100"
            label="Edit"
            onClick={() => handleEditClick(job)}
          />
          <CustomButton
            onClick={() => handleDelete(job._id)}
            wrapperClassName="w-100 m-2"
            btnClassName="btn btn-outline-danger w-100"
            label="Delete"
          />
        </>
      ),
    },
  ];

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

  const handleCreateChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = () => {
    dispatch(createJob(newJob));
    setNewJob({ title: "", company_name: "", location: "" });
    setCreatingJob(false);
  };

  return (
    <div className="container mt-4">
      <h2>Job List</h2>

      {/* Filters */}
      <div className="mb-3 d-flex gap-2">
        <input
          name="title"
          className="form-control"
          placeholder="Title"
          value={filters.title}
          onChange={handleChange}
        />
        <input
          name="company_name"
          className="form-control"
          placeholder="Company"
          value={filters.company_name}
          onChange={handleChange}
        />
        <input
          name="location"
          className="form-control"
          placeholder="Location"
          value={filters.location}
          onChange={handleChange}
        />
        <CustomButton
          label="Add Job"
          btnClassName="btn btn-success"
          onClick={() => setCreatingJob(true)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <DataTable data={jobs} columns={JobsColumn} />

          <div className="d-flex justify-content-center align-items-center gap-2">
            <button
              className="btn btn-outline-primary"
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="fw-bold">
              Page {currentPage} of {totalPages}
            </span>

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

 {editingJob && (
  <div className="modal show d-block" tabIndex="-1" style={{ background: "#00000080" }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5>Edit Job</h5>
          <button className="btn-close" onClick={() => setEditingJob(null)}></button>
        </div>
        <div className="modal-body">
          <input
            className="form-control mb-2"
            name="title"
            value={editingJob.title}
            onChange={handleEditChange}
          />
          <input
            className="form-control mb-2"
            name="company_name"
            value={editingJob.company_name}
            onChange={handleEditChange}
          />
          <input
            className="form-control mb-2"
            name="location"
            value={editingJob.location}
            onChange={handleEditChange}
          />
          <input
            className="form-control mb-2"
            name="via"
            value={editingJob.via}
            onChange={handleEditChange}
          />
          <input
            className="form-control mb-2"
            name="extensions"
            value={editingJob.extensions}
            onChange={handleEditChange}
          />
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setEditingJob(null)}>Cancel</button>
          <button className="btn btn-success" onClick={handleEditSubmit}>Save</button>
        </div>
      </div>
    </div>
  </div>
)}


    {creatingJob && (
  <div className="modal show d-block" tabIndex="-1" style={{ background: "#00000080" }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5>Create New Job</h5>
          <button className="btn-close" onClick={() => setCreatingJob(false)}></button>
        </div>
        <div className="modal-body">
          <input
            className="form-control mb-2"
            name="title"
            placeholder="Job Title"
            value={newJob.title}
            onChange={handleCreateChange}
          />
          <input
            className="form-control mb-2"
            name="company_name"
            placeholder="Company Name"
            value={newJob.company_name}
            onChange={handleCreateChange}
          />
          <input
            className="form-control mb-2"
            name="location"
            placeholder="Location"
            value={newJob.location}
            onChange={handleCreateChange}
          />
          <input
            className="form-control mb-2"
            name="via"
            placeholder="Posted (via)"
            value={newJob.via}
            onChange={handleCreateChange}
          />
          <input
            className="form-control mb-2"
            name="extensions"
            placeholder="Extensions"
            value={newJob.extensions}
            onChange={handleCreateChange}
          />
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setCreatingJob(false)}>Cancel</button>
          <button className="btn btn-success" onClick={handleCreateSubmit}>Create</button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default JobList;
