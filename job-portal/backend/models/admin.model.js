import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  Email: { type: String, required: true, unique: true, lowercase: true },
  Password: { type: String, required: true, minlength: 6 },
  Role: { type: String, default: "admin" }, 
});

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
