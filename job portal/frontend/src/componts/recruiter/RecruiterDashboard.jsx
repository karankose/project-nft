import React from "react";
import { Outlet } from "react-router-dom";
import RecruiterSideBar from "./RecruiterSideBar";


const RecruiterDashboard = () => {
  return (
    <>

      <div
        className=""
      >
          <div className="">
            <RecruiterSideBar />
          </div>
          {/* <div className="col-md-10">
            <Outlet />
          </div> */}
        </div>

    </>
  );
};

export default RecruiterDashboard;
