import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
    const { user, ready } = useAuth();

    if (!ready) return <div>Loading...</div>;

    if (!user) return <Navigate to="/login" />;

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return <div>403 Forbidden: Not enough rights.</div>;
    }

    return children;
};

export default PrivateRoute;