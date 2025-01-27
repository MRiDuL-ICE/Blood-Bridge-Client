import { useState } from "react";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MdLogin } from "react-icons/md";
import useAuth from "@/hooks/useAuth";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { toast } from "sonner";
type Checked = DropdownMenuCheckboxItemProps["checked"];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut, setUser }: any = useAuth();
  // @ts-ignore
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  // @ts-ignore
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  // @ts-ignore
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = (e: any) => {
    e.preventDefault();
    logOut().then((res: any) => {
      setUser(null);
      toast.success("Logout successful!", { duration: 2000 });
      return res;
    });
  };

  const links = (
    <>
      <Link
        className="hover:text-[#DC143C] text-white block font-semibold text-base border-b py-3 px-3"
        to={"/"}
      >
        Home
      </Link>
      <Link
        className="hover:text-[#DC143C] text-white block font-semibold text-base border-b py-3 px-3"
        to={"/all-donation-requests"}
      >
        Blood Donation Requests
      </Link>
      <Link
        className="hover:text-[#DC143C] text-white block font-semibold text-base border-b py-3 px-3"
        to={"/blogs"}
      >
        Blog
      </Link>
      <Link
        className="hover:text-[#DC143C] text-white block font-semibold text-base border-b py-3 px-3"
        to={"/"}
      >
        Contact Us
      </Link>
    </>
  );

  return (
    <div className="fixed w-full z-50">
      <header className="flex shadow-[0px_4px_10px_rgba(0,0,0,0.1)] sm:px-10 px-6 py-3 bg-[#2C3E50] text-white font-[sans-serif] min-h-[70px] ">
        <div className="flex md:w-10/12 mx-auto">
          <div className="flex flex-wrap items-center justify-between relative lg:gap-y-4 gap-y-4 gap-x-4 w-full">
            <div className="flex items-center">
              <button onClick={handleClick} id="toggleOpen">
                <svg
                  className="w-10 h-10"
                  fill="#ffff"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <a href="javascript:void(0)" className="ml-4">
                <img src={logo} alt="logo" className="w-36  max-sm:hidden" />
                <img
                  src={logo}
                  alt="logo"
                  className="w-28 hidden max-sm:block"
                />
              </a>
            </div>

            <div className="bg-white flex items-center border max-md:order-1 border-transparent focus-within:border-[#DC143C] focus-within:bg-transparent px-4 rounded-sm h-10 min-w-[40%] lg:w-2/4 max-md:w-full transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                className="fill-gray-500 mr-4 w-4 h-4"
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
              <input
                type="email"
                placeholder="Search..."
                className="w-full outline-none bg-transparent text-sm"
              />
            </div>

            <div className="flex items-center space-x-4 max-md:ml-auto justify-center">
              <button
                type="button"
                className="border-none hidden outline-none md:flex items-center justify-center rounded-full p-2 hover:bg-[#DC143C] transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 cursor-pointer fill-white"
                  viewBox="0 0 511 511.999"
                >
                  <path
                    d="M498.7 222.695c-.016-.011-.028-.027-.04-.039L289.805 13.81C280.902 4.902 269.066 0 256.477 0c-12.59 0-24.426 4.902-33.332 13.809L14.398 222.55c-.07.07-.144.144-.21.215-18.282 18.386-18.25 48.218.09 66.558 8.378 8.383 19.44 13.235 31.273 13.746.484.047.969.07 1.457.07h8.32v153.696c0 30.418 24.75 55.164 55.168 55.164h81.711c8.285 0 15-6.719 15-15V376.5c0-13.879 11.293-25.168 25.172-25.168h48.195c13.88 0 25.168 11.29 25.168 25.168V497c0 8.281 6.715 15 15 15h81.711c30.422 0 55.168-24.746 55.168-55.164V303.14h7.719c12.586 0 24.422-4.903 33.332-13.813 18.36-18.367 18.367-48.254.027-66.633zm-21.243 45.422a17.03 17.03 0 0 1-12.117 5.024h-22.72c-8.285 0-15 6.714-15 15v168.695c0 13.875-11.289 25.164-25.168 25.164h-66.71V376.5c0-30.418-24.747-55.168-55.169-55.168H232.38c-30.422 0-55.172 24.75-55.172 55.168V482h-66.71c-13.876 0-25.169-11.29-25.169-25.164V288.14c0-8.286-6.715-15-15-15H48a13.9 13.9 0 0 0-.703-.032c-4.469-.078-8.66-1.851-11.8-4.996-6.68-6.68-6.68-17.55 0-24.234.003 0 .003-.004.007-.008l.012-.012L244.363 35.02A17.003 17.003 0 0 1 256.477 30c4.574 0 8.875 1.781 12.113 5.02l208.8 208.796.098.094c6.645 6.692 6.633 17.54-.031 24.207zm0 0"
                    data-original="#000000"
                  />
                </svg>
              </button>
              <div className="flex items-center">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <img
                        className="h-12 w-12 rounded-full cursor-pointer"
                        src={user?.photoURL}
                        alt=""
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 my-2 z-50">
                      <DropdownMenuLabel>{user?.displayName}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link to={"/dashboard"}>
                        <Button className="w-10/12 mx-auto flex bg-[#2C3E50]">
                          Dahsboard
                        </Button>
                      </Link>
                      <Button
                        onClick={handleLogout}
                        className="bg-red-600 w-10/12 mx-auto flex my-2"
                      >
                        Logout
                      </Button>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex gap-4 items-center justify-center">
                    <Link to={"/register"}>
                      <button
                        type="button"
                        className="border-none hidden outline-none md:flex items-center justify-center rounded-full p-2 hover:bg-[#DC143C] transition-all"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 cursor-pointer fill-white"
                          viewBox="0 0 512 512"
                        >
                          <path
                            d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z"
                            data-original="#000000"
                          />
                        </svg>
                      </button>
                    </Link>
                    <Link to={"/login"}>
                      <Button
                        className="text-[#2C3E50] w-24 flex font-bold hover:border-[#DC143C] hover:bg-transparent transform transition-all duration-300 hover:text-white"
                        variant="outline"
                      >
                        <MdLogin /> Login
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } before:fixed before:bg-white before:opacity-40 before:inset-0 before:z-50`}
          >
            <button
              onClick={handleClick}
              id="toggleClose"
              className="fixed top-2 right-4 z-[100] rounded-full bg-[#2C3E50] w-9 h-9 flex items-center justify-center border"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 fill-white"
                viewBox="0 0 320.591 320.591"
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
            </button>

            <ul
              className={`block space-x-4 space-y-3 fixed bg-[#2C3E50] w-1/2 min-w-[300px] top-0 left-0 p-4 h-full shadow-md overflow-auto z-50 transition-transform duration-300 ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <li className="pb-4 px-3">
                <a href="javascript:void(0)">
                  <img src={logo} alt="logo" className="w-36" />
                </a>
              </li>
              {links}
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
