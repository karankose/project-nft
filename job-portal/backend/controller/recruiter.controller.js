import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Recruiter from '../models/recruiter.model.js'

export const create_recruiter = async (req, res) => {
  try {
    const {
      FirstName,
      LastName,
      Email,
      Password,
      CompanyName,
      Designation
    } = req.body;

    const existing = await Recruiter.findOne({ Email });
    if (existing) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Recruiter with this email already exists",
        data: null
      });
    }

   
    const hashedPassword = await bcrypt.hash(Password, 10);

    const newRecruiter = new Recruiter({
      FirstName,
      LastName,
      Email,
      Password: hashedPassword,
      CompanyName,
      Designation,
      Role: "recruiter", 
    });

    await newRecruiter.save();

    res.status(201).json({
      success: true,
      status: 201,
      message: "Recruiter created successfully",
      data: {
        id: newRecruiter._id,
        FirstName: newRecruiter.FirstName,
        LastName: newRecruiter.LastName,
        Email: newRecruiter.Email,
        CompanyName: newRecruiter.CompanyName,
        Designation: newRecruiter.Designation,
        Role: newRecruiter.Role,
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Server error",
      data: error.message
    });
  }
};



// export const get_all_user_profiles = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     // Get total count
//     const totalUsers = await User.countDocuments();

//     // Fetch paginated users
//     const users = await User.find({}, {
//       FirstName: 1,
//       LastName: 1,
//       Email: 1,
//       contact: 1,
//       resumes: 1,
//     })
//       .skip(skip)
//       .limit(limit)
//       .populate({
//         path: 'resumes',
//         options: { sort: { createdAt: -1 } }, // Most recent resume first
//       });

//     // Format each user with only the latest resume
//     const formattedUsers = users.map(user => {
//       const latestResume = user.resumes?.[0] || null;
//       return {
//         _id: user._id,
//         FirstName: user.FirstName,
//         LastName: user.LastName,
//         Email: user.Email,
//         contact: user.contact,
//         resume: latestResume,
//       };
//     });

//     res.status(200).json({
//       success: true,
//       status: 200,
//       message: "User profiles fetched successfully",
//       data: formattedUsers,
//       currentPage: page,
//       totalPages: Math.ceil(totalUsers / limit),
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       status: 500,
//       message: "Server error while fetching user profiles",
//       data: error.message,
//     });
//   }
// };






export const get_all_user_profiles = async (req, res) => {
  
  
  try {
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();

    const users = await User.find({}, {
      FirstName: 1,
      LastName: 1,
      Email: 1,
      contact: 1,
      resumes: 1,
    })
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'resumes',
        select: 'html experience', // 👈 this line is key
        options: { sort: { createdAt: -1 } },
      });

    const formattedUsers = users.map(user => {
      const latestResume = user.resumes?.[0] || null;
      return {
        _id: user._id,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        contact: user.contact,
        resume: latestResume,
      };
    });

    res.status(200).json({
      success: true,
      status: 200,
      message: "User profiles fetched successfully",
      data: formattedUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Server error while fetching user profiles",
      data: error.message,
    });
  }
};
