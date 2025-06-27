
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, allowedRoles = [], userRole = "" }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length && !allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;