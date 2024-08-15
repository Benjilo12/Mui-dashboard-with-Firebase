import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/Context/AuthProvider"; // Adjust the import based on your file structure

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { userLoggedIn } = useAuth();

  return userLoggedIn ? <Element {...rest} /> : <Navigate to="/dashboard" />;
};

export default ProtectedRoute;
