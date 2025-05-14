import mongoose from "mongoose";



const InquirySchema = new mongoose.Schema({
    Full_Name:{
        type : String,
        required : true,
    },
    Email : {
        type : String,
        required  : true,
    },
    Phone_Number : {
        type : Number,
        minlength: 10,
        required : true
    },
    Message :{
        type : String,
        required : true
    }
})


const Inquiry = mongoose.model( "Inquiry", InquirySchema);
export default Inquiry;