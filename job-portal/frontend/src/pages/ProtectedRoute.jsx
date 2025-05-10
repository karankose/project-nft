import React from 'react'
import { Navigate ,useNavigate } from 'react-router-dom';
import { isLoggedIn } from './auth';
import routers from '../Routers';

export const ProtectedRoute = ({children}) => {
  return isLoggedIn() ? children : <Navigate to={routers.loginRouter} replace />
}






export default ProtectedRoute;