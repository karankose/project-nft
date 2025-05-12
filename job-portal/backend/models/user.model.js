import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  FirstName: { type: String, required: true, trim: true },
  LastName: { type: String, trim: true },
  Email: { type: String, required: true, unique: true, lowercase: true },
  Password: { type: String, required: true, minlength: 6 },
  UserProfile: { type: String, default: "" },
  Role: { type: String, enum: ['recruiter', 'jobseeker'], default: 'jobseeker' },
  CreatedAt: { type: Date, default: Date.now },
  Phone: { type: String, default: "" },
  Skills: { type: [String], default: [] },
  Education: { type: [Object], default: [] },
  Experience: { type: [Object], default: [] },
  Domain: { type: String, default: "" },
  resumes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume"
  }],
});
const User = mongoose.model("User", UserSchema);

export default User;