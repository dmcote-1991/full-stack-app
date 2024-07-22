import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    return <Outlet />;
  }
  return <Navigate to="/signin" state={{ from: location }} />;
};

export default PrivateRoute;
