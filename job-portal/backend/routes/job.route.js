import express from 'express'

import { GetJobs, GetJobsFromSrap , GetJobById ,ApplyToJob, createJob } from '../controller/job.controller.js';

const jobRouter  = express.Router();


jobRouter.get('/sarp',GetJobsFromSrap);
jobRouter.get('/',GetJobs);
jobRouter.get('/:job_id',GetJobById);
jobRouter.post('/applications/apply',ApplyToJob)
jobRouter.post('/',createJob)


export default jobRouter;