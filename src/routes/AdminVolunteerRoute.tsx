import useAuth from "@/hooks/useAuth";
import Lottie from "lottie-react";
import { Navigate, useLocation } from "react-router-dom";
import spin from "@/assets/lottie/spin.json";
import useAdminOrVolunteer from "@/hooks/useAdminOrVolunteer";

const AdminVolunteerRoute = ({ children }: any) => {
  const { user, loading }: any = useAuth();
  const [isAdminOrVolunteer, isAdminOrVolunteerLoading] = useAdminOrVolunteer();
  const location = useLocation();
  if (loading || isAdminOrVolunteerLoading) {
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
  if (user && isAdminOrVolunteer) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default AdminVolunteerRoute;
