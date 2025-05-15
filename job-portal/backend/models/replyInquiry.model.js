import mongoose from "mongoose";

const ReplyInquirySchema = new mongoose.Schema({
  inquiryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inquiry",
    required: true,
  },
  replyMessage: {
    type: String,
    required: true,
  },
  repliedBy: {
    type: String, // could be admin email or name
    default: "Admin",
  },
  repliedAt: {
    type: Date,
    default: Date.now,
  },
});

const ReplyInquiry = mongoose.model("ReplyInquiry", ReplyInquirySchema);
export default ReplyInquiry;
