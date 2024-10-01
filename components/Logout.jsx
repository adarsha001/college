import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminContext } from '../context/AdminContext';

const Logout = () => {
  const { removeToken } = useAdminContext();

  useEffect(() => {
    removeToken(); // Logout user by clearing token
  }, [removeToken]);

  return <Navigate to="/" />;
};

export default Logout;
