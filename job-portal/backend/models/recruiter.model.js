import mongoose from "mongoose";

const RecruiterSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
    trim: true,
  },
  LastName: {
    type: String,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  Password: {
    type: String,
    required: true,
    minlength: 6,
  },
  CompanyName: {
    type: String,
    required: true,
    trim: true,
  },
  Phone:{
    type : Number,
    minlength : 10,
    required : true,
  },
  Designation: {
    type: String,
    default: "",
    trim: true,
  },
  UserProfile: {
    type: String,
    default: "",
  },
  Role: {
    type: String, 
    default: "recruiter",
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Recruiter = mongoose.model("Recruiter", RecruiterSchema);
export default Recruiter;
