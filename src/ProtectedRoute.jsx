import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("_token");
  return token ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
