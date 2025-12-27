import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  // Check if user is authenticated by looking for token in localStorage
  const isAuthenticated = localStorage.getItem("token"); 

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // If not authenticated, return null while redirecting
  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;