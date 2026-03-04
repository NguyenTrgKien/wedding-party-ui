import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/dashboard/login" />;

  return children;
};

export default PrivateRoute;
