import { body } from "express-validator";

const validateAdminLogin = [
  body("Email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Enter a valid email"),
  
  body("Password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

export default validateAdminLogin;
