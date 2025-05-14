import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInputs from '../reuseComponts/reuseFormComponent/FormInputs';
import CustomButton from '../reuseComponts/reuseButton/CustomButton';
import { Images } from '../../assets/image';

import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCurrentAdmin } from '../../redux/adminSlice';

const AdminLogin = () => {
  const VITE_ADMIN_URL = import.meta.env.VITE_ADMIN_URL;
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
      const res = await axios.post(`${VITE_ADMIN_URL}/login`, formData);
      const result = res.data;

      if (!result.success) {
        throw new Error(result.message || 'Login failed...');
      }

      localStorage.setItem("token", result.data.token);
      dispatch(setCurrentAdmin(result.data.admin));
      toast.success("Welcome Admin!");

      setFormData({ Email: '', Password: '' });
      navigate("/admin-dashboard/info");
    } catch (error) {
      const errData = error.response?.data;
      toast.error(errData?.message || error.message || 'Something went wrong!');
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: `url(${Images.FromBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="bg-white bg-opacity-75 p-4 rounded shadow" style={{ width: '100%', maxWidth: '400px' }}>
          <h3 className="text-center mb-4">Admin Login</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <FormInputs
                label="Email"
                name="Email"
                type="email"
                value={formData.Email}
                onChange={handleChange}
                required
                placeholder="admin@example.com"
                wrapperClassName="w-100"
              />
            </div>

            <div className="mb-3">
              <FormInputs
                label="Password"
                name="Password"
                type="password"
                value={formData.Password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                wrapperClassName="w-100"
              />
            </div>

            <div className="d-grid">
              <CustomButton
                type="submit"
                label="Login"
                btnClassName="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
