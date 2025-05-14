import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminProtectedRoute = ({ children }) => {
  const { currentAdmin } = useSelector((state) => state.admin);

  if (!currentAdmin || Object.keys(currentAdmin).length === 0) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
