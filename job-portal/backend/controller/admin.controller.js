import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';

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
    