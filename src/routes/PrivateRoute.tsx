import useAuth from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const { user, loading }: any = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <p className="text-center h-screen w-screen mx-auto justify-center items-center mt-80">
        <span className="loading loading-bars loading-lg"></span>
      </p>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
