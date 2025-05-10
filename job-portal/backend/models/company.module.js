import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    company_name : {
        type : String ,
        required : true , 
        unique: true,
    },
    location : { type : String,
        required : true,
    },
    employee : { 
        type : Number,
    },
    thumbnail : {
        type : String,
    },
    url : {
        type : String,
    },
    description: {
        type: String,
    },
    jobs :  [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Job', 
        },
      ],
})

const Company = mongoose.model("Company" , CompanySchema);
export default Company;