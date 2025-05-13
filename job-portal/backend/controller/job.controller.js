import axios from "axios";
import Job from "../models/job.model.js";
import User from "../models/user.model.js";
import Company from '../models/company.module.js'
import dotenv from "dotenv";
import JobApplication from "../models/jobApplication.model.js";
import mongoose from "mongoose";
import cron from 'node-cron';
dotenv.config();


export const GetJobs = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 15;
      const skip = (page - 1) * limit;
  
      const { title, location, days } = req.query;
  
    
      const query = {};
      if (title) {
        query.title = { $regex: title, $options: "i" };
      }
      if (location) {
        query.location = { $regex: location, $options: "i" };
      }
      if (days) {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - parseInt(days));
        query.createdAt = { $gte: pastDate };
      }
  
      const jobs = await Job.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
  
      const totalJobs = await Job.countDocuments(query);
  
      res.status(200).json({
        success: true,
        status: 200,
        message: "Jobs fetched successfully",
        currentPage: page,
        totalPages: Math.ceil(totalJobs / limit),
        totalJobs,
        data: jobs,
      });
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
      res.status(500).json({
        success: false,
        status: 500,
        message: "Failed to fetch jobs",
        data: null,
      });
    }
  };
  
          
export const GetJobById = async (req, res, next) => {
  try {
    const { job_id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(job_id)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid job ID format",
        data: null,
      });
    }

    const job = await Job.findById(job_id);

    if (!job) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Job not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Job fetched successfully",
      data: job,
    });
  } catch (error) {
    console.error("Error fetching job by ID:", error.message);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to fetch job",
      data: null,
    });
  }
};


export const ApplyToJob = async (req, res, next) => {
  try {
    const { userId, jobId } = req.body;
   
   
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid userId or jobId format",
        data: null,
      });
    }

   
    const existingApplication = await JobApplication.findOne({ userId, jobId });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        status: 409,
        message: "User has already applied for this job",
        data: null,
      });
    }


    const application = await JobApplication.create({ userId, jobId });

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Job application submitted successfully",
      data: application,
    });
  } catch (error) {
    console.error("Error applying to job:", error.message);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to apply to job",
      data: null,
    });
  }
};


export const scrapeJobsFromSerpAPI = async (location = 'India') => {
  const itKeywords = [
    "mern developer", "mean developer", "react developer", "nodejs developer",
    "software engineer", "frontend developer", "backend developer",
    "full stack developer", "devops engineer", "qa tester",
    "data scientist", "mobile app developer", "android developer",
    "ios developer", "cloud engineer"
  ];

  const jobIdsInDatabase = new Set(await Job.find().distinct('job_id'));

  for (const keyword of itKeywords) {
    try {
      const query = `${keyword} jobs in ${location}`;
      const response = await axios.get(
        `https://serpapi.com/search.json?engine=google_jobs&q=${encodeURIComponent(query)}&hl=en&api_key=${process.env.SARP_API_KEY}`
      );

      const jobs = response.data.jobs_results;
      if (!Array.isArray(jobs) || jobs.length === 0) continue;

      for (const job of jobs) {
        const jobId = job.job_id || `${job.title}-${Date.now()}`;
        if (jobIdsInDatabase.has(jobId)) continue;

      
        const newJob = new Job({
          job_id: jobId,
          title: job.title,
          company_name: job.company_name,
          location: job.location,
          via: job.via,
          share_link: job.share_link,
          thumbnail: job.thumbnail,
          extensions: job.extensions,
          detected_extensions: job.detected_extensions,
          description: job.description || "",
          apply_options: job.apply_options,
        });

        const savedJob = await newJob.save();
        jobIdsInDatabase.add(savedJob.job_id);

    
        const companyName = job.company_name?.toLowerCase().trim();
        if (!companyName) continue;

        let company = await Company.findOne({ company_name: new RegExp(`^${companyName}$`, 'i') });

        if (!company) {
          company = new Company({
            company_name: job.company_name,
            location: location, 
            jobs: []
          });
        }

        if (!company.jobs.includes(savedJob._id)) {
          company.jobs.push(savedJob._id);
          await company.save();
        }

        console.log(`Job added: ${savedJob.title} | Company: ${company.company_name}`);
      }

    } catch (error) {
      console.error(`Error with keyword "${keyword}":`, error.message);
    }
  }
};


export const GetJobsFromSrap = async (req, res) => {
  try {
    const location = req.query.location || 'India';
    await scrapeJobsFromSerpAPI(location);
    res.status(200).json({
      success: true,
      message: 'Job scraping completed.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Job scraping failed.',
      error: error.message,
    });
  }
};




export const createJob = async (req, res) => {
  try {
    const {
      title,
      company_name,
      location,
      via,
      share_link,
      thumbnail,
      extensions,
      detected_extensions,
      description,
      apply_options,
      job_id,
    } = req.body;

    // Check if job with same job_id already exists
    const existing = await Job.findOne({ job_id });
    if (existing) {
      return res.status(409).json({
        success: false,
        status: 409,
        message: "Job with this ID already exists",
        data: null,
      });
    }

    const newJob = await Job.create({
      title,
      company_name,
      location,
      via,
      share_link,
      thumbnail,
      extensions,
      detected_extensions,
      description,
      apply_options,
      job_id,
    });

    res.status(201).json({
      success: true,
      status: 201,
      message: "Job created successfully",
      data: newJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Server error",
      data: error.message,
    });
  }
};



cron.schedule('0 0 0 * * *', async () => {
  console.log('⏰ Cron job started at midnight');
  for (let i = 0; i < 5; i++) {
    try {
      console.log(`API Hit #${i + 1}`);
      await scrapeJobsFromSerpAPI();
    } catch (err) {
      console.error(` Error on run #${i + 1}:`, err.message);
    }
  }
});
