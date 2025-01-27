import useAuth from "@/hooks/useAuth";
import AdminHome from "../AdminDashboard/AdminHome/AdminHome";
import DonorHome from "../DonorDashboard/DonorHome/DonorHome";
import { useEffect, useState } from "react";
import spin from "@/assets/lottie/spin.json";
import Lottie from "lottie-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const [loginUser, setLoginUser]: any = useState(null);
  const { user }: any = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get(`/users/${user.email}`).then((res) => {
      setLoginUser(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <p className="text-center flex h-screen w-screen mx-auto justify-center items-center ">
        <Lottie
          className="w-20 h-20 flex justify-center items-center mx-auto -translate-x-40 -translate-y-16"
          size={50}
          animationData={spin}
        ></Lottie>
      </p>
    );
  }

  return (
    <div>
      {(loginUser.role === "admin" || loginUser.role === "volunteer") && (
        <AdminHome></AdminHome>
      )}
      {loginUser.role === "donor" && <DonorHome></DonorHome>}
      {/* {loginUser.role === "volunteer" && <VolunteerHome></VolunteerHome>} */}
    </div>
  );
};

export default DashboardHome;
