import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  // Destructure user from the authentication context
  const { user } = useAuth();

  const location = useLocation();

  // If a user is authenticated, render the child routes (Outlet)
  if (user) {
    return <Outlet />;
  }
  // If the user is not authenticated, redirect to the sign-in page
  // Pass the current location in state to allow redirection back after signing in
  return <Navigate to="/signin" state={{ from: location }} />;
};

export default PrivateRoute;
