import React from 'react'
import { ToastContainer } from 'react-toastify';
import { Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import Home from './pages/Home';

import SignUp from './pages/SignUp';
import Login from './pages/Login';
import routers from './Routers';
import AboutUs from './pages/AboutUs';
import PricingPlan from './pages/PricingPlan';
import Features from './pages/Features';
import ContactUs from './pages/ContactUs';

import JobPage from './pages/JobPage';
import CompanyPage from './pages/CompanyPage';
import JobDetails from './componts/screens/JobDetails';

import ProtectedRoute from './pages/ProtectedRoute';


import DashboardLayout from './componts/layout/DashboardLayout';
import ResumeBuilder from './componts/screens/ResumeBuilder';
import ResumePreview from './componts/screens/ResumePreview';
import RecruiterDashboard from './componts/recruiter/RecruiterDashboard';



const App = () => {
  return (    
    <>
    <Routes>
      <Route path={routers.homeRouter} element={<Home/>}  />
      <Route path={routers.loginRouter} element={<Login/>}/>
      <Route path={routers.signupRouter} element={<SignUp/>} />
      <Route path={routers.aboutRouter} element={<AboutUs/>} />
      <Route path={routers.pricingRouter} element={<PricingPlan/>} />
      <Route path={routers.featuresRouter} element={<Features/>} />
      <Route path={routers.contactRouter} element={<ContactUs/>} />
         
      <Route path={routers.DeshBoardRouter}
        element={<ProtectedRoute>
          <DashboardLayout/>
        </ProtectedRoute>}
      >
        <Route path={routers.resumeRouter} element={<ResumeBuilder/>} />
           <Route path={routers.jobRouter} element={<JobPage/>} />
      <Route path={routers.companyRouter} element={<CompanyPage/>} />
      <Route path={routers.jobDetails} element={<JobDetails/>}/>
      <Route path={routers.yourResumeRouter} element={<ResumePreview/>}/>
      </Route>


      <Route path={routers.recruiterRouter}
        element={<ProtectedRoute>
          <RecruiterDashboard/>
        </ProtectedRoute>}
      >
        
           <Route path={routers.jobRouter} element={<JobPage/>} />
      {/* <Route path={routers.jobDetails} element={<JobDetails/>}/> 
      
      work  panding
      */}
      <Route path={routers.companyRouter} element={<CompanyPage/>} />
         </Route>


    </Routes> 
    
    <ToastContainer position="top-right" autoClose={2000} />
   
    
    </>
    )
}
export default App;   