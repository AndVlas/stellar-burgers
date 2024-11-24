import React from 'react';
import { useSelector } from '../../services/store';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { isAuthCheckedSelector } from '../../services/slices/userSlice';

type ProtectedRouteProps = {
  isUnauthUser?: boolean;
  children: React.ReactNode;
};

export const ProtectedRoute = ({
  children,
  isUnauthUser
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const location = useLocation();

  if (!isUnauthUser && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (isUnauthUser && isAuthChecked) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
