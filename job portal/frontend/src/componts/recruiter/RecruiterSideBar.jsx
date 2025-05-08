

import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import routers from "../../Routers"; // Adjust this to your route config
import "../../css/global.css";
import { Images } from "../../assets/image";





const RecruiterSideBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const drawerItems = [
    { label: "Jobs", path: routers.jobRouter },
    { label: "Companies", path: routers.companyRouter },
    { label: "jobseeker", path: routers.resumeRouter },
    { label: "Your Resumes", path: routers.yourResumeRouter },
  ];

  const getCurrentRouteLabel = () => {
    const current = drawerItems.find((item) => item.path === location.pathname);
    // return current?.label || <img  src={Images.Logo1}  alt="" />;
    return current?.label || <h1>Recruiter</h1> 
  };

  return (
    <div className="d-flex flex-column " style={{ minHeight: "100vh" }}>
      <nav className="navbar navbar-dark bg-primary navbar-styles">
        <button
          className="btn btn-outline-light ms-3"
          onClick={() => setDrawerOpen((prev) => !prev)}
        >
          ☰
        </button>
        <span className="navbar-brand mb-0 h1 me-5">{getCurrentRouteLabel()}</span>
      </nav>
      <div className="d-flex flex-grow-1">
        {drawerOpen && (
          <div
            className="bg-dark text-white p-3 sidebar-styles"
            style={{ width: "240px", minHeight: "100%" }}
          >
            <ul className="nav flex-column">
              {drawerItems.map((item) => (
                <li key={item.path} className="nav-item">
                  <Link
                    to={item.path}
                    className={`nav-link text-white ${
                      location.pathname === item.path ? "active fw-bold" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

<div style={{position : "relative", width: drawerOpen ? "calc(100vw - 255px)":"100vw",left: drawerOpen ? "240px":"0"}}><Outlet /></div>
        
      </div>
    </div>
  );
};

export default RecruiterSideBar;
