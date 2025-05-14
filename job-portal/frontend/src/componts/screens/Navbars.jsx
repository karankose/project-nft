import React from 'react'
import { Images } from '../../assets/image'; 
import { Link } from 'react-router-dom';
import routers from '../../Routers';

export const Navbars = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-2">
        <div className="container-fluid">
          
         
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src={Images.Logo2} alt="Job Portal Logo" className="img-fluid" style={{ height: '50px' }} />
          </a>

          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

         
          <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            
          
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={routers.featuresRouter} className="nav-link" href="#">Features</Link>
              </li>
              <li className="nav-item">
                <Link to={routers.pricingRouter} className="nav-link" >Pricing Plans</Link>
              </li>
              <li className="nav-item">
                <Link to={routers.contactRouter} className="nav-link" >Contact Us</Link>
              </li>
            </ul>

           
            <form className="d-flex">
              <Link to={routers.signupRouter} className="btn btn-outline-primary me-2" type="button">Sign Up</Link>
              <Link to={routers.loginRouter} className="btn btn-primary" type="button">Login</Link>
            </form>

          </div>
        </div>
      </nav>
    </>
  )
}

