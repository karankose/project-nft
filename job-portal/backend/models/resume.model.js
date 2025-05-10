import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Linking resume to the user
    required: true,
  },
  html: { 
    type: String, 
    required: true 
  },
  title: {
    type: String, 
    default: "Untitled Resume"
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;
