import express from "express";
import { adminLogin } from "../controller/admin.controller.js";
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

export default adminRouter;
