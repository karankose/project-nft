import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,    
    },
    company_name: {
        type: String,
        required: true,
    },   
    location: {
        type: String,
        required: true,
    },
    via: {
        type: String,
    },
    share_link: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    extensions: {
        type: [String],
    },
    detected_extensions: {
        posted_at: { type: String },
        schedule_type: { type: String },
    },
    description: {
        type: String,
    },
    apply_options: [
        {
            title: { type: String },
            link: { type: String },
        }
    ],
    job_id: {
        type: String,
        unique: true,
       
    },
}, { timestamps: true });

const Job =  mongoose.model("Job", JobSchema);
export default Job;
