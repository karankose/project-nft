import e from 'cors'
import express from 'express'
import { create_recruiter } from '../controller/recruiter.controller.js';
const recruiterRouter = express.Router();








recruiterRouter.post('/create-recruiter' ,create_recruiter);







export default recruiterRouter;