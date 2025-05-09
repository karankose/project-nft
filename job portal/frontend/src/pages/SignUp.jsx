import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Navbars} from '../componts/screens/Navbars';
import Footer from '../componts/screens/Footer';
import FormInputs from '../componts/reuseComponts/reuseFormComponent/FormInputs';
import CustomButton from '../componts/reuseComponts/reuseButton/CustomButton';
import { Images } from '../assets/image';
import routers from '../Routers';
import { Link } from 'react-router-dom';
import { toast} from 'react-toastify';

export const SignUp = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    ConfirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.Password !== formData.ConfirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    try {
      const res = await axios.post(`${API_URL}/user/signUp`, {
        FirstName: formData.FirstName,   
        LastName: formData.LastName,
        Email: formData.Email,
        Password: formData.Password,
      });
  
      const result = res.data;
  
      if (!result.success) {
        throw new Error(result.message || 'Registration failed');
      }
  
      toast.success('User registered successfully!');
      setFormData({
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '',
        ConfirmPassword: ''
      });
      navigate(routers.loginRouter);
    } catch (err) {
      const responseData = err.response?.data;
  
      
      if (responseData?.data && Array.isArray(responseData.data)) {
       
        const errorMessages = responseData.data.map(error => error.msg).join('\n');
        alert(errorMessages);
      } else {
      
        toast.error(responseData?.message || err.message || 'Something went wrong!');
      }
    }
  };
  

  return (
    <>
      <Navbars />
      <div
        className="container-fuild"
        style={{
          backgroundImage: `url(${Images.FromBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="d-flex align-items-center justify-content-center min-vh-100">
          <div className="border rounded shadow col-md-6 bg-white p-4">
            <div className="text-start mb-3">
              <h1>Welcome Back</h1>
              <p>Please enter your details to sign in.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row justify-content-center">
                <FormInputs
                  label="First Name"
                  placeholder="Enter first name"
                  type="text"
                  required={true}
                  wrapperClassName="col-md-6"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                />
                <FormInputs
                  label="Last Name"
                  placeholder="Enter last name"
                  type="text"
                  required={true}
                  wrapperClassName="col-md-6"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                />
              </div>

              <div className="row justify-content-center">
                <FormInputs
                  label="Email Address"
                  placeholder="Enter your email"
                  type="email"
                  required={true}
                  wrapperClassName="col"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                />
              </div>

              <div className="row justify-content-center">
                <FormInputs
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  required={true}
                  wrapperClassName="col"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                />
              </div>

              <div className="row justify-content-center">
                <FormInputs
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  type="password"
                  required={true}
                  wrapperClassName="col"
                  name="ConfirmPassword"
                  value={formData.ConfirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="row justify-content-between align-items-center mt-3">
                <div className="col-md-6">
                  <FormInputs
                    type="checkbox"
                    label="Keep me logged in"
                    name="keepLoggedIn"
                  />
                </div>
              </div>

              <div className="row justify-content-center align-items-center">
                <CustomButton
                  type="submit"
                  wrapperClassName="col"
                  btnClassName="btn-primary w-100"
                  label="Sign Up"
                />
              </div>

              <div className="d-flex align-items-center my-3">
                <p className="text-gray" style={{ color: '#999' }}>Or continue with</p>
              </div>

              <div className="row justify-content-center align-items-center">
                <CustomButton
                  wrapperClassName="col-md-4"
                  icon={<img src={Images.LogoGoogle} alt="Google" />}
                  btnClassName="btn-light w-100"
                />
                <CustomButton
                  btnClassName="btn-light w-100"
                  wrapperClassName="col-md-4"
                  icon={<img src={Images.LogoApple} alt="Apple" />}
                />
                <CustomButton
                  btnClassName="btn-light w-100"
                  icon={<img src={Images.LogoFb} alt="Facebook" />}
                  wrapperClassName="col-md-4"
                />
              </div>

              <div className="d-flex align-items-center justify-content-center my-3">
                <p className="mb-0 me-2">Already have an account?</p>
                <Link
                  to={routers.loginRouter}
                  style={{ color: '#53B4E4', textDecoration: 'underline', fontWeight: '500' }}
                >
                  LOGIN HERE
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
