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
