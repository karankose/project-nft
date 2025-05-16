
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// 🔵 Pages
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';
import PricingPlan from './pages/PricingPlan';
import Features from './pages/Features';
import ContactUs from './pages/ContactUs';

// 🔵 User & Recruiter Components
import JobPage from './pages/JobPage';
import CompanyPage from './pages/CompanyPage';
import JobDetails from './componts/screens/JobDetails';
import ResumeBuilder from './componts/screens/ResumeBuilder';
import ResumePreview from './componts/screens/ResumePreview';
import ProtectedRoute from './pages/ProtectedRoute';
import RecruiterLayout from './componts/recruiter/RecruiterLayout';
import RecruiterDashboard from './componts/recruiter/RecruiterDashboard';
import UserCardList from './componts/recruiter/UserCardList';
import { Layout } from './componts/Layout';

// 🔵 Admin Section
import AdminLogin from './componts/AdminSection/AdminLogin';
import AdminDashboard from './componts/AdminSection/AdminDashboard';
import AdminProtectedRoute from './componts/AdminSection/AdminProtectedRoute';
import AdminLayout from './componts/AdminSection/AdminLayout';

// 🔵 Route Definitions
import routers from './Routers';
import Section1 from './componts/screens/Section1';
import UserTable from './componts/AdminSection/UserTable';
import RecruiterTable from './componts/AdminSection/RecruiterTable';
import InquiryTable from './componts/AdminSection/InquiryTable';
import JobCRUD from './componts/AdminSection/JobList';
import PricingPlans from './componts/screens/PricingPlans';
import Subscription from './componts/AdminSection/Subscription';
import JobList from './componts/AdminSection/JobList';

const App = () => {
  return (
    <>
      <Routes>

        <Route path={routers.homeRouter} element={<Home />} />
        <Route path={routers.loginRouter} element={<Login />} />
        <Route path={routers.signupRouter} element={<SignUp />} />
        <Route path={routers.aboutRouter} element={<AboutUs />} />
        <Route path={routers.pricingRouter} element={<PricingPlan />} />
        <Route path={routers.featuresRouter} element={<Features />} />
        <Route path={routers.contactRouter} element={<ContactUs />} />

        {/* ====================== User Protected Routes ====================== */}
        <Route
          path={routers.UserDeshBoardRouter}
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path={routers.resumeRouter} element={<ResumeBuilder />} />
          <Route path={routers.jobRouter} element={<JobPage />} />
          <Route path={routers.companyRouter} element={<CompanyPage />} />
          <Route path={routers.jobDetails} element={<JobDetails />} />
          <Route path={routers.yourResumeRouter} element={<ResumePreview />} />
        </Route>

        {/* ====================== Recruiter Protected Routes ====================== */}
        <Route
          path={routers.recruiterRouter}
          element={
            <ProtectedRoute>
              <RecruiterLayout />
            </ProtectedRoute>
          }
        >
          <Route path={routers.jobSeekarRouter} element={<UserCardList />} />
          {/* Add more recruiter nested routes here if needed */}
        </Route>

        {/* ====================== Admin Routes ====================== */}

        {/* 🔓 Admin Login Route (not protected) */}
        <Route path={routers.adminLoginRouter} element={<AdminLogin />} />

        {/* 🔐 Admin Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path={routers.adminGetInfoRouter} element={<Section1 />} />
          <Route path={routers.adminGetUserDataRouter} element={<UserTable />} />
          <Route path={routers.adminGetRecruiterRouter} element={<RecruiterTable />} />
          <Route path={routers.inquiryTableRouter} element={<InquiryTable />} />
          <Route path={routers.jobcurdRouter} element={<JobList />} />
          <Route path={routers.plansRouter} element={<Subscription/>}/>
        </Route>

      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default App;
