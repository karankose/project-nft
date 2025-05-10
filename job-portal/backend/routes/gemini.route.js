import express from 'express';
import {
  GenerateResume,
  saveResume,
  downloadResume,
  getUserResumes,
} from '../controller/gemini.controller.js';

const router = express.Router();

// Generate resume from paragraph
router.post('/ai-gen', GenerateResume);

// Save resume to DB
router.post('/save', saveResume);



// Get all resumes for a user
router.get('/resumes/:userId', getUserResumes);

router.get('/download/:resumeId', downloadResume);
export default router;
