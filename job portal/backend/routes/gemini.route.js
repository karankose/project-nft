import express from 'express';
import { downloadResume, GenerateResume,    saveResume } from '../controller/gemini.controller.js';

const router = express.Router();


router.post('/ai-gen',GenerateResume)
router.post('/download/:userId',downloadResume)
router.post('/save-resume',saveResume)
export default router;
