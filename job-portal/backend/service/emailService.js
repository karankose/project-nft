import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your email address
      pass: process.env.EMAIL_PASS, // app password or email password
    },
  });

  export const sendMail = async (to, subject, htmlContent) => {
    const mailOptions = {
      from: `"Job Portal" <${process.env.EMAIL_USER}>`,
      to ,
      subject ,
      html: htmlContent,
    };
  
    try {
      const result = await transporter.sendMail(mailOptions);
      console.log("Email sent:", result.response);
      return { success: true, info: result };
    } catch (error) {
      console.error("Email error:", error);
      return { success: false, error };
    }
  };
  