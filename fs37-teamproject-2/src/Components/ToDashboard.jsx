import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function ToDashboard({ children }) {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default ToDashboard;
