import { Link, useNavigate } from "react-router-dom";
import signinimg from "@/assets//signup.png";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";

const ibb_key = import.meta.env.VITE_ibb_key;
const ibb_api = `https://api.imgbb.com/1/upload?key=${ibb_key}`;

const Register = () => {
  const [districts, setDistricts] = useState<any[]>([]);
  const [upazilas, setUpazilas] = useState<any[]>([]);
  // @ts-ignore
  const [searchDistrict, setSearchDistrict] = useState("");
  // @ts-ignore
  const [searchUpazila, setSearchUpazila] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { createUser, logOut }: any = useAuth();
  const navigate = useNavigate();

  const handleTogglePassword = (e: any) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const validatePassword = (password: any) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const thumbnailFile = { image: e.target.photoURL.files[0] };
    const response = await axiosPublic.post(ibb_api, thumbnailFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const url = response.data?.data?.url;
    if (response.data?.success) {
      const form = new FormData(e.target);
      const data = Object.fromEntries(form.entries());
      const photoURL = url;
      const newData: any = {
        ...data,
        photoURL: photoURL,
        role: "donor",
        status: "active",
      };
      const email = form.get("email");
      const password = form.get("password");
      const displayName = form.get("name");
      const confirmPassword = form.get("confirmPassword");

      if (!validatePassword(password)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character!",
        });
        return;
      }
      if (password !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password and confirm password does not match!",
        });
        return;
      }
      createUser(email, password, displayName, photoURL)
        // @ts-ignore
        .then((res: any) => {
          // @ts-ignore
          logOut().then((res: any) => {});
        })
        .catch((err: any) => toast.error(err.message, { duration: 3000 }));
      // @ts-ignore
      const res = await axiosPublic.post("/users", newData);
      toast.success("Registration successful!", { duration: 2000 });
      navigate("/login");
    }
  };

  useEffect(() => {
    fetch("districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);
  useEffect(() => {
    fetch("upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data));
  }, []);

  const filteredDistricts = districts.filter((district) =>
    district.name.toLowerCase().includes(searchDistrict.toLowerCase())
  );

  const filteredUpazilas = upazilas.filter((upazila) =>
    upazila.name.toLowerCase().includes(searchUpazila.toLowerCase())
  );

  return (
    <div>
      <div className="font-[sans-serif] bg-white md:h-screen">
        <div className="grid md:grid-cols-2 items-center gap-8 h-full">
          <div className="max-md:order-1 p-4">
            <img
              src={signinimg}
              className="lg:max-w-[100%] w-full h-full aspect-square object-contain block mx-auto"
              alt="login-image"
            />
          </div>

          <div className="flex items-center md:p-2 p-6 bg-[#2C3E50] h-full lg:w-full lg:ml-auto">
            <form onSubmit={handleSubmit} className="w-10/12 mx-auto ">
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-[#DC143C]">
                  Create an account
                </h3>
              </div>
              <div className="grid md:grid-cols-2 items-center gap-10">
                <div>
                  <label className="text-white text-xs block mb-2">
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-[#DC143C] pl-2 pr-8 py-3 outline-none"
                      placeholder="Enter name"
                    />
                  </div>
                </div>
                <div className="">
                  <label className="text-white text-xs block mb-2">Email</label>
                  <div className="relative flex items-center">
                    <input
                      name="email"
                      type="text"
                      required
                      className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-[#DC143C] pl-2 pr-8 py-3 outline-none"
                      placeholder="Enter email"
                    />
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2  grid-cols-1 items-center gap-10 mt-8">
                <div>
                  <label className="text-white text-xs block mb-2">
                    Avatar
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="photoURL"
                      type="file"
                      required
                      accept="image/*"
                      className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-[#DC143C] pl-2 pr-8 py-3 outline-none"
                    />
                  </div>
                </div>
                <div className="">
                  <label className="text-white text-xs block mb-2">
                    Blood Group
                  </label>
                  <div className="relative flex items-center">
                    <select
                      name="bloodGroup"
                      required
                      className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-[#DC143C] pl-2 pr-8 py-3 outline-none text-white"
                    >
                      <option className="text-black" value="A+">
                        A+
                      </option>
                      <option className="text-black" value="A-">
                        A-
                      </option>
                      <option className="text-black" value="B+">
                        B+
                      </option>
                      <option className="text-black" value="B-">
                        B-
                      </option>
                      <option className="text-black" value="AB+">
                        AB+
                      </option>
                      <option className="text-black" value="AB-">
                        AB-
                      </option>
                      <option className="text-black" value="O+">
                        O+
                      </option>
                      <option className="text-black" value="O-">
                        O-
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid md:grid-cols-2 grid-cols-1 items-center gap-10">
                <div className="">
                  <label className="text-white text-xs block mb-2">
                    District
                  </label>
                  <div className="relative flex items-center">
                    <select
                      name="district"
                      required
                      className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-[#DC143C] pl-2 pr-8 py-3 outline-none text-white"
                    >
                      {filteredDistricts.map((district) => (
                        <option
                          key={district.id}
                          className="text-black"
                          value={district.name}
                        >
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="">
                  <label className="text-white text-xs block mb-2">
                    Upazila
                  </label>
                  <div className="relative flex items-center">
                    <select
                      name="upazila"
                      required
                      className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-[#DC143C] pl-2 pr-8 py-3 outline-none text-white"
                    >
                      {filteredUpazilas.map((upazila) => (
                        <option
                          key={upazila.id}
                          className="text-black"
                          value={upazila.name}
                        >
                          {upazila.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <label className="text-white text-xs block mb-2">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-[#DC143C] pl-2 pr-8 py-3 outline-none"
                    placeholder="Enter password"
                  />
                  {showPassword ? (
                    <button
                      onClick={handleTogglePassword}
                      className="text-white absolute right-2 text-lg"
                    >
                      <FaEyeSlash />
                    </button>
                  ) : (
                    <button
                      onClick={handleTogglePassword}
                      className="text-white absolute right-2 text-lg"
                    >
                      <FaEye />
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-8">
                <label className="text-white text-xs block mb-2">
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-[#DC143C] pl-2 pr-8 py-3 outline-none"
                    placeholder="Re-write your password"
                  />
                  {showPassword ? (
                    <button
                      onClick={handleTogglePassword}
                      className="text-white absolute right-2 text-lg"
                    >
                      <FaEyeSlash />
                    </button>
                  ) : (
                    <button
                      onClick={handleTogglePassword}
                      className="text-white absolute right-2 text-lg"
                    >
                      <FaEye />
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-max shadow-xl py-3 px-6 text-sm text-white font-semibold rounded  bg-[#DC143C] hover:bg-[#f14b6c] focus:outline-none"
                >
                  Register
                </button>
                <p className="text-sm text-white mt-8">
                  Already have an account?{" "}
                  <Link to={"/login"}>
                    <button className="text-[#DC143C] font-semibold hover:underline ml-1">
                      Login here
                    </button>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
