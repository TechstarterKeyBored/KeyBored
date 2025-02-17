import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isLoggedIn } = useContext(AuthContext); 

  return isLoggedIn ? (
    <Element {...rest} /> 
  ) : (
    <Navigate to="/login" /> 
  );
};

export default PrivateRoute;
