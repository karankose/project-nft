import express from "express";
import { adminLogin, getAllUsersData, getStats , deleteUser, updateUser,createUser,
  getAllRecruiters,createRecruiter ,updateRecruiter ,deleteRecruiter,
  getAllInquiries,
  replyInquiry,
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getAllCompanies
} from "../controller/admin.controller.js";
import validateAdminLogin from "../middleWare/admin.validation.js";
import handleValidation from "../middleWare/handleValidation.js";
import adminAuthMiddleware from "../middleWare/AdminAuth.js";

const adminRouter = express.Router();

// Admin Login
adminRouter.post("/login", validateAdminLogin, handleValidation, adminLogin);

// Protected Route
adminRouter.get("/dashboard", adminAuthMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    status: 200,
    message: "Admin dashboard accessed successfully",
    data: req.user
  });
});

adminRouter.get('/stats',getStats);

adminRouter.get('/get-users-data', getAllUsersData)

adminRouter.post('/create-user', createUser)

adminRouter.delete('/delete-user/:id', deleteUser);

adminRouter.put('/update-user/:id',updateUser)


adminRouter.get('/get-recruiters', getAllRecruiters);
adminRouter.post('/create-recruiter', createRecruiter);
adminRouter.put('/update-recruiter/:id', updateRecruiter);
adminRouter.delete('/delete-recruiter/:id', deleteRecruiter);

adminRouter.get("/inquiries", getAllInquiries); 

adminRouter.post("/inquiries/reply", replyInquiry);

//job
adminRouter.get("/jobs", getJobs); // Pagination supported
adminRouter.get("/jobs/:job_id", getJobById);
adminRouter.post("/job", createJob);
adminRouter.put("/job/:_id", updateJob);
adminRouter.delete("/job/:_id", deleteJob);
adminRouter.get("/companies",getAllCompanies)





export default adminRouter;
