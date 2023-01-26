import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ redirectPath = '/login', children }) => {
    const { auth } = useAuth();
    if (auth?.user) {
        return children ? children : <Outlet />;
    }
    return <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
