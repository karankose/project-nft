  import React from "react";
  import { Images } from "../../assets/image";
  import routers from "../../Routers";
  import { Link } from "react-router-dom";

  const Topbar = () => {
    return (
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white">
        <button
          className="btn btn-outline-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarToggle"
          aria-controls="sidebarToggle"
        >       
          ☰
        </button>

        <div className="d-flex align-items-center ms-auto me-3 d-none d-md-flex">
          <ul className="nav">
            <li className="nav-item"><Link className="nav-link text-muted" to={routers.jobRouter} >Jobs</Link></li>
            <li className="nav-item"><Link className="nav-link text-muted" to={routers.companyRouter} >Companies</Link></li>
            
            <li className="nav-item"><Link className="nav-link text-muted" to={routers.featuresRouter}>Features</Link></li>
            <li className="nav-item"><Link className="nav-link text-muted" to={routers.pricingRouter}  >Pricing</Link></li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          <img src={Images.UserImg} alt="User" width="32" className="rounded-circle me-2" />        
          <span>Angel Lipshutz</span>
        </div>
      </div>
    );
  };

  export default Topbar;
