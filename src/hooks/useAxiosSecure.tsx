import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const axiosSecure = axios.create({
  baseURL: "https://blood-bridge-server-lime.vercel.app",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut }: any = useAuth();
  axiosSecure.interceptors.request.use(function (config: any) {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  }),
    function (error: any) {
      return Promise.reject(error);
    };

  axiosSecure.interceptors.response.use(function (response) {
    return response;
  }),
    async function (error: any) {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await logOut();
        localStorage.removeItem("access-token");
        Swal.fire({
          icon: "error",
          title: status,
          text: "Unauthorized access",
        });
        navigate("/login");
      }
      return Promise.reject(error);
    };

  return axiosSecure;
};

export default useAxiosSecure;
