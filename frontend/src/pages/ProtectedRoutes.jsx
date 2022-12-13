import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import AuthPage from './AuthPage';

const ProtectedRoutes = () => {
  const user = useSelector((state) => state.generalStore.user);

  if (!user) {
    return <AuthPage />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
