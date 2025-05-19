import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';
import Job from '../models/job.model.js'
import Company from '../models/company.module.js'
import User from '../models/user.model.js'
import Recruiter from '../models/recruiter.model.js';
import Inquiry from '../models/Inquiry.model.js';
import { sendMail } from '../service/emailService.js';
import ReplyInquiry from '../models/replyInquiry.model.js';
import { setLogCapture } from 'puppeteer';
import adminRouter from '../routes/admin.route.js';

//  login 
export const adminLogin = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const admin = await Admin.findOne({ Email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Admin not found",
        data: null
      });
    }

    const isPasswordValid = await bcrypt.compare(Password, admin.Password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Invalid email or password",
        data: null
      });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.Role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Admin login successful",
      data: {
        token,
        admin: {
          id: admin._id,
          Email: admin.Email,
          Role: admin.Role
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Login failed",
      data: error.message
    });
  }
};


//  state data
export const getStats = async(req , res) =>{
    try {
        // Get the latest posted date
        const latestJob = await Job.findOne().sort({ createdAt: -1 }); // Fetch the most recent job
        const latestDate = latestJob ? latestJob.createdAt.toISOString().split('T')[0] : null; // Extract the date part (YYYY-MM-DD)
    
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


//  users
//  get users
    export const getAllUsersData = async (req, res) => {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;
    
        const total = await User.countDocuments({ Role: 'jobseeker' });
        const users = await User.find({ Role: 'jobseeker' })
          .select('-Password')
          .skip(skip)
          .limit(limit);
    
        return res.status(200).json({
          success: true,
          status: 200,
          message: 'User data fetched successfully',
          data: users,
          pagination: {
            totalPages: Math.ceil(total / limit),
            currentPage: page,
          },
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          status: 500,
          message: 'Failed to fetch user data',
          data: null,
        });
      }
    };
//  create user
export const createUser = async (req , res)=>{

   try {
      const { FirstName, LastName, Email, Password , Phone} = req.body;
  
      const existingUser = await User.findOne({ Email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "User already exists with this email",
          data: null
        });
      }
  
      const hashedPassword = await bcrypt.hash(Password, 10);
  
      const newUser = await User.create({
        FirstName,
        LastName,
        Email,
        Password: hashedPassword,
        Phone
      });
  
      res.status(201).json({
        success: true,
        status: 201,
        message: "User created successfully",
        data: {
          id: newUser._id,
          FirstName: newUser.FirstName,
          LastName: newUser.LastName,
          Email: newUser.Email,
          Phone : newUser.Phone
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        status: 500,
        message: "Error creating user",
        data: error.message,
      });
    }


}
//  delete user
    export const deleteUser = async (req, res) => {
      const userId = req.params.id;
    
      try {
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({
            success: false,
            status: 404,
            message: 'User not found',
            data: null,
          });
        }
    
        await user.deleteOne();
    
        return res.status(200).json({
          success: true,
          status: 200,
          message: 'User deleted successfully',
          data: null,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          status: 500,
          message: 'Failed to delete user',
          data: null,
        });
      }
    };
//  update user
    export const updateUser = async (req, res) => {
      const userId = req.params.id;
      const updatedData = req.body;
    
      try {
        const user = await User.findByIdAndUpdate(
          userId,
          { $set: updatedData },
          { new: true, runValidators: true }
        ).select('-Password');
    
        if (!user) {
          return res.status(404).json({
            success: false,
            status: 404,
            message: 'User not found',
            data: null,
          });
        }
    
        return res.status(200).json({
          success: true,
          status: 200,
          message: 'User updated successfully',
          data: user,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          status: 500,
          message: 'Failed to update user',
          data: null,
        });
      }
    };


//  recruiter
//  get recruiter
    export const getAllRecruiters = async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = 5;
      const skip = (page - 1) * limit;
    
      try {
        const recruiters = await Recruiter.find().skip(skip).limit(limit);
        const totalCount = await Recruiter.countDocuments();
    
        res.status(200).json({
          success: true,
          message: 'Recruiters fetched successfully',
          data: recruiters,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalCount: totalCount,
          }
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ 
          success: false, 
          message: 'Error fetching recruiters', 
          error: error.message 
        });
      }
    };
// create recruiter
export const createRecruiter = async (req, res) => {
  const { FirstName, LastName, Email, Password, Phone, CompanyName, Designation, UserProfile } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(Password, 10);

    const newRecruiter = new Recruiter({
      FirstName,
      LastName,
      Email,
      Phone,
      Password: hashedPassword,
      CompanyName,
      Designation,
      UserProfile
    });

    await newRecruiter.save();

    // Email content
    const htmlContent = `
      <h2>Welcome to Job Portal</h2>
      <p>Hello ${FirstName},</p>
      <p>Your recruiter account has been created successfully.</p>
      <p><strong>Email:</strong> ${Email}</p>
      <p><strong>Password:</strong> ${Password}</p>
      <p>Please login and change your password after your first login.</p>
    `;

    // Send email
    await sendMail(Email, 'Your Recruiter Account Credentials', htmlContent);

    res.status(201).json({
      success: true,
      message: 'Recruiter created successfully and email sent',
      data: newRecruiter
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error creating recruiter',
      error: error.message
    });
  }
};
//  update recruiter
    export const updateRecruiter = async (req, res) => {
      const { id } = req.params;
      const { FirstName, LastName, Email,Phone, CompanyName, Designation, UserProfile } = req.body;
    
      try {
        const updatedRecruiter = await Recruiter.findByIdAndUpdate(id, {
          FirstName,
          LastName,
          Email,
          CompanyName,
          Designation,
          Phone,
          UserProfile
        }, { new: true });
    
        if (!updatedRecruiter) {
          return res.status(404).json({
            success: false,
            message: 'Recruiter not found',
          });
        }
    
        res.status(200).json({
          success: true,
          message: 'Recruiter updated successfully',
          data: updatedRecruiter
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: 'Error updating recruiter',
          error: error.message
        });
      }
    };
//  Delete Recruiter
    export const deleteRecruiter = async (req, res) => {
      const { id } = req.params;
    
      try {
        const recruiter = await Recruiter.findByIdAndDelete(id);
        if (!recruiter) {
          return res.status(404).json({
            success: false,
            message: 'Recruiter not found',
          });
        }
        res.status(200).json({
          success: true,
          message: 'Recruiter deleted successfully',
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: 'Error deleting recruiter',
          error: error.message
        });
      }
    };


//  inquiries
//  get onquires
    export const getAllInquiries = async (req, res) => {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;
    
        const total = await Inquiry.countDocuments();
        const inquiries = await Inquiry.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    
        res.status(200).json({
          success: true,
          status: 200,
          message: "Inquiries fetched successfully",
          data: {
            inquiries,
            pagination: {
              total,
              currentPage: page,
              totalPages: Math.ceil(total / limit),
            },
          },
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          status: 500,
          message: "Server Error",
          data: null,
        });
      }
    };
//  inquiries reply
    export const replyInquiry = async (req, res) => {
      const { email, subject, message, inquiryId } = req.body;
    
      // Validate input
      if (!email || !subject || !message || !inquiryId) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Email, subject, message, and inquiryId are required.",
          data: null,
        });
      }
    
      // Check if the email exists in the Inquiry collection
      const existingInquiry = await Inquiry.findOne({ _id: inquiryId, Email: email });
    
      if (!existingInquiry) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "Inquiry with the provided email and ID not found.",
          data: null,
        });
      }
    
      // Create email content
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <p>${message}</p>
          <br/>
          <p>Regards,<br/>Job Portal Team</p>
        </div>
      `;
    
      // Send email
      const result = await sendMail(email, subject, htmlContent);
    
      if (result.success) {
        // Save reply in database
        const savedReply = await ReplyInquiry.create({
          inquiryId,
          replyMessage: message,
          repliedBy: "Admin", // In future: use auth
        });
    
        return res.status(200).json({
          success: true,
          status: 200,
          message: "Reply sent and saved successfully.",
          data: savedReply,
        });
      } else {
        return res.status(500).json({
          success: false,
          status: 500,
          message: "Failed to send reply email.",
          data: result.error.message,
        });
      }
    };

//  Jobs
// Create Job

export const createJob = async (req, res) => {
  try {
    const {
      title,
      company_name,
      location,
      via,
      extensions,
      // description,
    } = req.body;

    console.log("Incoming job data:", req.body);

    const formattedExtensions = Array.isArray(extensions)
      ? extensions
      : extensions.split(',').map(e => e.trim());

    const newJob = await Job.create({
      title,
      company_name,
      location,
      via,
      extensions: formattedExtensions,
      // description,
    });

    res.status(201).json({
      success: true,
      status: 201,
      message: "Job created successfully",
      data: newJob,
    });
  } catch (error) {
    // ✅ Add this line to see the real cause in your terminal
    console.error("Create Job Error:", error);

    res.status(500).json({
      success: false,
      status: 500,
      message: "Server error",
      data: error.message,
    });
  }
};





// Get Jobs 
export const getJobs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;
    
        const { title, location, company_name } = req.query;
    
      
        const query = {};
        if (title) {
          query.title = { $regex: title, $options: "i" };
        }
        if (location) {
          query.location = { $regex: location, $options: "i" };
        }
        if (company_name) {
          query.company_name = { $regex: company_name, $options: "i" };
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
  // try {
  //   const { title, company_name, location, page = 1, limit = 5 } = req.query;

  //   const filter = {};
  //   if (title) filter.title = { $regex: title, $options: "i" };
  //   if (company_name) filter.company_name = { $regex: company_name, $options: "i" };
  //   if (location) filter.location = { $regex: location, $options: "i" };

  //   const totalJobs = await Job.countDocuments(filter);
  //   const jobs = await Job.find(filter)
  //     .skip((page - 1) * limit)
  //     .limit(Number(limit));

  //   res.status(200).json({
  //     success: true,
  //     status: 200,
  //     message: "Jobs fetched successfully",
  //     data: {
  //       jobs,
  //       totalPages: Math.ceil(totalJobs / limit),
  //       currentPage: Number(page),
  //     },
  //   });
  // } catch (err) {
  //   res.status(500).json({ success: false, status: 500, message: "Server Error", error: err.message });
  // }
};
// Get Job
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({ job_id: req.params.job_id });
    if (!job) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Job not found",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Job fetched successfully",
      data: job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
      data: null,
    });
  }
};
// Update Job 
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    );
    if (!job) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Job not found",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Job updated successfully",
      data: job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
      data: null,
    });
  }
};
// Delete Job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params._id });
    console.log(req.params._id,">>>>>>>>>");
    
    if (!job) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Job not found",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Job deleted successfully",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
      data: null,
    });
  }
};


export const getAllCompanies = async (req, res) => {
  try {
    const { page = 1, limit = 5, company_name, location } = req.query;

    const filter = {};
    if (company_name) {
      filter.company_name = { $regex: company_name, $options: "i" };
    }
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    const totalCompanies = await Company.countDocuments(filter);

    const companies = await Company.find(filter)
      .populate("jobs")
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.status(200).json({
      success: true,
      status: 200,
      message: "Companies fetched successfully",
      data: {
        companies,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCompanies / limit),
        totalCompanies,
      },
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
