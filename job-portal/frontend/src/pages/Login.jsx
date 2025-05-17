import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Navbars} from '../componts/screens/Navbars';
import Footer from '../componts/screens/Footer';
import FormInputs from '../componts/reuseComponts/reuseFormComponent/FormInputs';
import CustomButton from '../componts/reuseComponts/reuseButton/CustomButton';
import { Images } from '../assets/image';
import routers from '../Routers';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/userSlice';
const Login = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    Email: '',
    Password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post(`${API_URL}/user/login`, {
        Email: formData.Email,
        Password: formData.Password
      });
  
      

      const result = res.data;
      console.log('Login result:', result); 
  
      if (!result.success) {
        throw new Error(result.message || 'Login failed...');
      }
  

      localStorage.setItem("token", result.data.token);
      dispatch(setCurrentUser(result.data.user));
  
      toast.success('Login successfully...');
      setFormData({ Email: '', Password: '' });
  
    
      if(result.data.user.Role === "jobseeker"){
        navigate("/dashboard/jobs");

      } else if(result.data.user.Role === "recruiter"){
        navigate("/recruiter-Dashboard")
      }
     
      

    } catch (error) {
      const responseData = error.response?.data;
  
      if (responseData?.data && Array.isArray(responseData.data)) {
        const errorMessages = responseData.data.map(err => err.msg).join('\n');
        alert(errorMessages);
      } else {
        toast.error(responseData?.message || error.message || 'Something went wrong!');
      }
    }
  };
  
  return (
    <>
      <Navbars />
      <div
        className='container-fuild'
        style={{
          backgroundImage: `url(${Images.FromBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='d-flex align-items-center justify-content-center min-vh-100'>
          <div className='border rounded shadow col-md-6 bg-white p-4'>
            <div className='text-start mb-3'>
              <h1>Welcome Back</h1>
              <p>Please enter your details to sign in.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className='row justify-content-center'>
                <FormInputs
                  label='Email Address'
                  placeholder='Enter your email'
                  type='email'
                  required={true}
                  wrapperClassName='col'
                  name='Email'
                  value={formData.Email}
                  onChange={handleChange}
                />
              </div>
              <div className='row justify-content-center'>
                <FormInputs
                  label='Password'
                  placeholder='Enter your password'
                  type='password'
                  required={true}
                  wrapperClassName='col'
                  name='Password'
                  value={formData.Password}
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
                <div className="col-md-6 text-md-end text-start">
                  <a className="text-decoration-none" href="#" style={{ color: '#53B4E4' }}>
                    Forgot Password?
                  </a>
                </div>
              </div>

              <div className='row justify-content-center align-items-center mt-3'>
                <CustomButton
                  wrapperClassName='col'
                  btnClassName='btn-primary w-100'
                  label={'Login'}
                  type="submit"
                />
              </div>

              <div className='d-flex align-items-center my-3'>
                <p className='text-gray' style={{ color: '#999' }}>Or continue with</p>
              </div>

              <div className='row justify-content-center align-items-center'>
                <CustomButton
                  wrapperClassName='col-md-4'
                  icon={<img src={Images.LogoGoogle} />}
                  btnClassName='btn-light w-100'
                />
                <CustomButton
                  btnClassName='btn-light w-100'
                  wrapperClassName='col-md-4'
                  icon={<img src={Images.LogoApple} />}
                />
                <CustomButton
                  btnClassName='btn-light w-100'
                  icon={<img src={Images.LogoFb} />}
                  wrapperClassName='col-md-4'
                />
              </div>

              <div className="d-flex align-items-center justify-content-center my-3">
                <p className="mb-0 me-2">Don’t have an account?</p>
                <Link to={routers.signupRouter} style={{ color: '#53B4E4', textDecoration: 'line', fontWeight: '500' }}>
                  SIGN UP HERE
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

export default Login;
