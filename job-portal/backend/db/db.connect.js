import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();


const connectDB = async ()=>{
try {
    const conn = await mongoose.connect(process.env.db_url);
    console.error("db connected...");
    
    
} catch (err) {
    console.log(err)
    process.exit(1);
    
}

}

export default connectDB;