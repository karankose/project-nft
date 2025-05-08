import express from 'express';
import { body } from 'express-validator'; 

import handleValidation from '../middleWare/handleValidation.js';

import { CreateUser, UserLogin } from '../controller/user.controller.js';

const routers = express.Router();


const validateSignup = [
  body('FirstName')
    .notEmpty().withMessage("First name is required")
    .isAlpha().withMessage("First name should only contain letters"),

  body('LastName')
    .notEmpty().withMessage("Last name is required")
    .isAlpha().withMessage("Last name should only contain letters"),

  body('Email')
    .isEmail().withMessage("Enter a valid email"),

  body('Password')
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];


const validateLogin = [
    body('Email')
    .isEmail().withMessage("Enter a valid email"),
    body('Password')
    .isLength({min : 6} ).withMessage("Password must be at least 6 characters")
]


routers.post('/signUp', validateSignup, handleValidation, CreateUser);
routers.post('/login',validateLogin, handleValidation, UserLogin);

export default routers;
  