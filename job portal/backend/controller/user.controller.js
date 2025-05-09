import User from '../models/user.model.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Recruiter from '../models/recruiter.model.js'

export const CreateUser = async (req, res, next) => {
  try {
    const { FirstName, LastName, Email, Password } = req.body;

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
    });

    res.status(201).json({
      success: true,
      status: 201,
      message: "User created successfully",
      data: {
        id: newUser._id,
        FirstName: newUser.FirstName,
        LastName: newUser.LastName,
        Email: newUser.Email
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
};



export const UserLogin = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;

    // First, check if the user exists in the User model
    let user = await User.findOne({ Email });

    if (!user) {
      // If not found in User model, check the Recruiter model
      user = await Recruiter.findOne({ Email });

      if (!user) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "No user or recruiter found with this email",
          data: null
        });
      }
    }

    // Compare the password (for both User and Recruiter models)
    const isPasswordValid = await bcrypt.compare(Password, user.Password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Invalid email or password",
        data: null
      });
    }

    // Generate the JWT token
    const token = jwt.sign(
      { id: user._id, role: user.Role }, // Include the role (user/recruiter)
      process.env.JWT_SECRET,
      { expiresIn: '2h' } // Set token expiration
    );

    // Respond with the token and user details
    res.status(200).json({
      success: true,
      status: 200,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
          Role: user.Role,
        },
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Login failed",
      data: error.message,
    });
  }
};