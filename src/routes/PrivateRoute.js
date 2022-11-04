import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';

const PrivateRoute = ({ chieldren }) => {
    const location = useLocation();
    const { user, loader } = useContext(AuthContext);

    if (loader) {
        return <h1>Loading...</h1>
    }
    if (user && user.uid) {
        return chieldren;
    }
    return <Navigate to={'/LogIn'} state={{ from: location }} replace></Navigate>
}

export default PrivateRoute;