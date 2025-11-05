import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PublicRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Navigate to="/consulta" /> : <Outlet />;
};

export default PublicRoute;