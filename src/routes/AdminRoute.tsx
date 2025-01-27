import useAdmin from "@/hooks/useAdmin";
import useAuth from "@/hooks/useAuth";
import Lottie from "lottie-react";
import { Navigate, useLocation } from "react-router-dom";
import spin from "@/assets/lottie/spin.json";

const AdminRoute = ({ children }: any) => {
  const { user, loading }: any = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  if (loading || isAdminLoading) {
    return (
      <p className="text-center flex h-screen w-screen mx-auto justify-center items-center ">
        <Lottie
          className="w-20 h-20 flex justify-center items-center mx-auto "
          size={50}
          animationData={spin}
        ></Lottie>
      </p>
    );
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
