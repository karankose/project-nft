import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../screens/Sidebar";
import FooterUser from "./FooterUser";

const DashboardLayout = () => {
  return (
    <>

      <div
        className=""
      >
          <div className="">
            <Sidebar />
          </div>
          {/* <div className="col-md-10">
            <Outlet />
          </div> */}
        </div>

    </>
  );
};

export default DashboardLayout;
