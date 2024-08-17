import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/Context/AuthProvider";

const ProtectedRoute = ({ element: Component }) => {
  const { userLoggedIn } = useAuth();

  if (!userLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Component />;
};

export default ProtectedRoute;
