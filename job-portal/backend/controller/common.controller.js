

import Job from '../models/job.model.js'
import Company from '../models/company.module.js'
import User from '../models/user.model.js'
import Inquiry from '../models/Inquiry.model.js';


export const getStats = async(req , res) =>{
    try {
        
        const latestJob = await Job.findOne().sort({ createdAt: -1 }); // Fetch the most recent job
        const latestDate = latestJob ? latestJob.createdAt.toISOString().split('T')[0] : null; // 
        // If there's a latest job, count how many jobs were posted on that date
        const jobsOnLatestDate = latestDate ? await Job.countDocuments({ createdAt: { $gte: new Date(latestDate + 'T00:00:00.000Z'), $lt: new Date(latestDate + 'T23:59:59.999Z') } }) : 0;
    
        // Get the other stats like total users, total companies, and total jobs
        const [totalUsers, totalCompanies, totalJobs, recentJobCount] = await Promise.all([
          User.countDocuments(),
          Company.countDocuments(),
          Job.countDocuments(),
          Job.countDocuments({ createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 1)) } }) // Jobs posted in the last 24 hours
        ]);
    
        return res.status(200).json({
          success: true,
          status: 200,
          message: 'Stats fetched successfully',
          data: {
            totalUsers,
            totalCompanies,
            totalJobs,
            recentJobCount,
            jobsOnLatestDate, // Count of jobs posted on the latest date
          }
        });
    
    } catch (error) {
        return res.status(500).json({
          success: false,
          status: 500,
          message: 'Failed to fetch stats',
          data: null
        });
    }
    };

export const inquireFormData = async (req , res )=>{


  try {
    const { Full_Name, Email, Phone_Number, Message } = req.body;

 
    if (!Full_Name || !Email || !Phone_Number || !Message) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "All fields are required",
        data: null,
      });
    }

   
    const newInquiry = await Inquiry.create({
      Full_Name,
      Email,
      Phone_Number,
      Message,
    });

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Inquiry submitted successfully",
      data: newInquiry,
    });
  } catch (error) {
    console.error("Error while submitting inquiry:", error.message);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Server Error. Could not submit inquiry",
      data: null,
    });
  }


}