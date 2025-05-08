import React from "react";
import { BiPaperclip, BiUpload } from "react-icons/bi";

const CustomInput = () => {
  return (
    <div className="input-group shadow rounded-pill bg-light">
      {/* Left icon */}
      <span className="input-group-text bg-light border-0 ps-3">
        <BiPaperclip className="text-secondary" />
      </span>

      {/* Input field */}
      <input
        type="text"
        className="form-control border-0 bg-light"
        placeholder="Search for CV tips or templates (e.g., marketing, IT)"
        style={{ fontSize: "0.95rem", color: "#4d5a77" }}
      />

      {/* Right icon button */}
      <button className="btn bg-white border-0 rounded-end">
        <BiUpload className="text-primary" />
      </button>
    </div>
  );
};

export default CustomInput;
