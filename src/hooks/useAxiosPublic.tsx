import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://blood-bridge-server-lime.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
