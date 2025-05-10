
import express from 'express'
import { create_recruiter , get_all_user_profiles} from '../controller/recruiter.controller.js';
const recruiterRouter = express.Router();








recruiterRouter.post('/create-recruiter' ,create_recruiter);
recruiterRouter.get('/all_user',get_all_user_profiles)







export default recruiterRouter;