import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  ShoppingCart,
  GitPullRequestArrow,
  FilePlus2,
  UserPen,
} from "lucide-react";
import logo from "@/assets/logo.png";
import useAuth from "@/hooks/useAuth";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import Lottie from "lottie-react";
import spin from "@/assets/lottie/spin.json";
import { BiDonateBlood } from "react-icons/bi";
import { LuTableOfContents } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const SHEET_SIDES = ["left"] as const;
// @ts-ignore
type SheetSide = (typeof SHEET_SIDES)[number];

const DashboardLayout = () => {
  const { user, loading }: any = useAuth();
  const location = useLocation();
  const [loginUser, setLoginUser]: any = useState(null);
  const [buffer, setBuffer] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/users/${user.email}`).then((res) => {
      setLoginUser(res.data);
      setBuffer(false);
    });
  }, []);

  if (buffer) {
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

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (loading)
    return (
      <p className="text-center flex h-screen w-screen mx-auto justify-center items-center ">
        <Lottie
          className="w-20 h-20 flex justify-center items-center mx-auto"
          size={50}
          animationData={spin}
        ></Lottie>
      </p>
    );

  return (
    <div>
      <div className="flex md:flex-row flex-col">
        <div className="h-screen hidden md:block  bg-[#2C3E50] md:w-72 text-white fixed">
          <div className="md:p-6 p-2">
            <div className="md:my-4">
              <img className="md:w-44 w-32" src={logo} alt="" />
            </div>

            <div className="flex flex-col md:space-y-2">
              {/* for donor role */}
              {loginUser.role === "donor" && (
                <>
                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                      isActive("/dashboard")
                        ? "text-[#DC143C] scale-110 translate-x-1"
                        : ""
                    }`}
                  >
                    <Home size={20} />
                    <span>Donor Home</span>
                  </Link>

                  <Link
                    to="/dashboard/my-donation-request"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                      isActive("/dashboard/my-donation-request")
                        ? "text-[#DC143C] scale-110 translate-x-1"
                        : ""
                    }`}
                  >
                    <BiDonateBlood size={20} />
                    <span>My Donation Requests</span>
                  </Link>

                  <Link
                    to="/dashboard/create-donation-request"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                      isActive("/dashboard/create-donation-request")
                        ? "text-[#DC143C] scale-110 translate-x-1"
                        : ""
                    }`}
                  >
                    <FilePlus2 size={20} />
                    <span>Create Request</span>
                  </Link>
                </>
              )}

              {/* for admin role */}
              {loginUser.role === "admin" && (
                <>
                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                      isActive("/dashboard")
                        ? "text-[#DC143C] scale-110 translate-x-1"
                        : ""
                    }`}
                  >
                    <Home size={20} />
                    <span>Admin Home</span>
                  </Link>

                  <Link
                    to="/dashboard/all-users"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                      isActive("/dashboard/all-users")
                        ? "text-[#DC143C] scale-110 translate-x-1"
                        : ""
                    }`}
                  >
                    <Users size={20} />
                    <span>All Users</span>
                  </Link>

                  <Link
                    to="/dashboard/all-blood-donation-request"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                      isActive("/dashboard/all-blood-donation-request")
                        ? "text-[#DC143C] scale-110 translate-x-1"
                        : ""
                    }`}
                  >
                    <GitPullRequestArrow size={20} />
                    <span>All Donation Request</span>
                  </Link>
                  <Link
                    to="/dashboard/content-management"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                      isActive("/dashboard/content-management")
                        ? "text-[#DC143C] scale-110 translate-x-1"
                        : ""
                    }`}
                  >
                    <LuTableOfContents size={20} />
                    <span>Manage Contents</span>
                  </Link>
                </>
              )}

              {/* for volunteer role */}
              {loginUser.role === "volunteer" && (
                <>
                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                      isActive("/dashboard")
                        ? "text-[#DC143C] scale-110 translate-x-1"
                        : ""
                    }`}
                  >
                    <Home size={20} />
                    <span>Volunteer Home</span>
                  </Link>

                  <Link
                    to="/dashboard/all-blood-donation-request"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                      isActive("/dashboard/all-blood-donation-request")
                        ? "text-[#DC143C] scale-110 translate-x-1"
                        : ""
                    }`}
                  >
                    <Users size={20} />
                    <span>All Donation Request</span>
                  </Link>

                  <Link
                    to="/dashboard/content-management"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                      isActive("/dashboard/content-management")
                        ? "text-[#DC143C] scale-110 translate-x-1"
                        : ""
                    }`}
                  >
                    <ShoppingCart size={20} />
                    <span>Content Management</span>
                  </Link>
                </>
              )}
              <Link
                to={`/dashboard/profile/${user?.email}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                  location.pathname.includes(
                    `/dashboard/profile/${user?.email}`
                  )
                    ? "text-[#DC143C] scale-110 translate-x-1"
                    : ""
                }`}
              >
                <UserPen size={20} />
                <span>Profile</span>
              </Link>

              <div>
                <hr />
              </div>
              <Link
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1"
                to="/"
              >
                <FaArrowAltCircleLeft size={20} />
                Back to home
              </Link>
            </div>
          </div>
        </div>

        <div className=" gap-2 md:hidden block">
          {SHEET_SIDES.map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button className="bg-[#DC143C] h-12 rounded-r-sm rounded-md">
                  <span className="flex items-center gap-2 py-6">
                    <FaArrowAltCircleRight />
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-[#2C3E50] w-11/12" side={side}>
                <SheetHeader>
                  <SheetDescription>
                    <div className="md:my-4">
                      <img className="md:w-44 w-32" src={logo} alt="" />
                    </div>
                    <div className="flex flex-col md:space-y-2 text-white">
                      {/* for donor role */}
                      {loginUser.role === "donor" && (
                        <>
                          <Link
                            to="/dashboard"
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                              isActive("/dashboard")
                                ? "text-[#DC143C] scale-110 translate-x-1"
                                : ""
                            }`}
                          >
                            <Home size={20} />
                            <span>Donor Home</span>
                          </Link>

                          <Link
                            to="/dashboard/my-donation-request"
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                              isActive("/dashboard/my-donation-request")
                                ? "text-[#DC143C] scale-110 translate-x-1"
                                : ""
                            }`}
                          >
                            <BiDonateBlood size={20} />
                            <span>My Donation Requests</span>
                          </Link>

                          <Link
                            to="/dashboard/create-donation-request"
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                              isActive("/dashboard/create-donation-request")
                                ? "text-[#DC143C] scale-110 translate-x-1"
                                : ""
                            }`}
                          >
                            <FilePlus2 size={20} />
                            <span>Create Request</span>
                          </Link>
                        </>
                      )}

                      {/* for admin role */}
                      {loginUser.role === "admin" && (
                        <>
                          <Link
                            to="/dashboard"
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                              isActive("/dashboard")
                                ? "text-[#DC143C] scale-110 translate-x-1"
                                : ""
                            }`}
                          >
                            <Home size={20} />
                            <span>Admin Home</span>
                          </Link>

                          <Link
                            to="/dashboard/all-users"
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                              isActive("/dashboard/all-users")
                                ? "text-[#DC143C] scale-110 translate-x-1"
                                : ""
                            }`}
                          >
                            <Users size={20} />
                            <span>All Users</span>
                          </Link>

                          <Link
                            to="/dashboard/all-blood-donation-request"
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                              isActive("/dashboard/all-blood-donation-request")
                                ? "text-[#DC143C] scale-110 translate-x-1"
                                : ""
                            }`}
                          >
                            <GitPullRequestArrow size={20} />
                            <span>All Donation Request</span>
                          </Link>
                          <Link
                            to="/dashboard/content-management"
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                              isActive("/dashboard/content-management")
                                ? "text-[#DC143C] scale-110 translate-x-1"
                                : ""
                            }`}
                          >
                            <LuTableOfContents size={20} />
                            <span>Manage Contents</span>
                          </Link>
                        </>
                      )}

                      {/* for volunteer role */}
                      {loginUser.role === "volunteer" && (
                        <>
                          <Link
                            to="/dashboard"
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                              isActive("/dashboard")
                                ? "text-[#DC143C] scale-110 translate-x-1"
                                : ""
                            }`}
                          >
                            <Home size={20} />
                            <span>Volunteer Home</span>
                          </Link>

                          <Link
                            to="/dashboard/all-blood-donation-request"
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                              isActive("/dashboard/all-blood-donation-request")
                                ? "text-[#DC143C] scale-110 translate-x-1"
                                : ""
                            }`}
                          >
                            <Users size={20} />
                            <span>All Donation Request</span>
                          </Link>

                          <Link
                            to="/dashboard/content-management"
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                              isActive("/dashboard/content-management")
                                ? "text-[#DC143C] scale-110 translate-x-1"
                                : ""
                            }`}
                          >
                            <ShoppingCart size={20} />
                            <span>Content Management</span>
                          </Link>
                        </>
                      )}
                      <Link
                        to={`/dashboard/profile/${user?.email}`}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1 ${
                          location.pathname.includes(
                            `/dashboard/profile/${user?.email}`
                          )
                            ? "text-[#DC143C] scale-110 translate-x-1"
                            : ""
                        }`}
                      >
                        <UserPen size={20} />
                        <span>Profile</span>
                      </Link>

                      <div>
                        <hr />
                      </div>
                      <Link
                        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm hover:bg-[#34495E] hover:translate-x-1"
                        to="/"
                      >
                        <FaArrowAltCircleLeft size={20} />
                        Back to home
                      </Link>
                    </div>
                  </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button>Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </div>

        <div className="md:ml-72 flex-1 p-8 h-screen md:mt-14">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
