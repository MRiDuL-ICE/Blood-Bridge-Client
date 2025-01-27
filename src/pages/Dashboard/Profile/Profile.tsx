import React, { useState } from "react";
import { Pencil, Save, User } from "lucide-react";
import SectionTitle from "@/shared/SectionTitle/SectionTitle";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAxiosPublic from "@/hooks/useAxiosPublic";

interface UserData {
  name: string;
  email: string;
  photoURL: string;
  bloodGroup: string;
  district: string;
  upazila: string;
  role: string;
  status: string;
}

const Profile = () => {
  const { user }: any = useAuth();
  const [userData, setUserData] = useState<UserData>({} as UserData);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState<UserData>(userData);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  // @ts-ignore
  const { data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      setUserData(res.data);
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(userData);
  };

  const handleSave = async () => {
    setTempData((prevData) => ({ ...prevData }));
    const res = await axiosPublic.patch(`/users/${userData.email}`, tempData);
    if (res.data.modifiedCount > 0) {
      refetch();
      toast.success("Profile updated successfully!", { duration: 2000 });
    } else {
      toast.error("Failed to update profile!", { duration: 2000 });
    }

    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 lg:px-8">
      <SectionTitle heading={"Profile management"}></SectionTitle>
      <div className="md:w-7/12 mx-auto translate-y-10 overflow-x-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header with Avatar */}
          <div className="relative h-48 bg-gradient-to-r from-[#f05876] to-[#ee0534]">
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-white text-[#2C3E50] rounded-full shadow-md hover:bg-[#2C3E50]transition-all"
            >
              {isEditing ? (
                <>
                  <Save size={20} />
                  <span>Save Changes</span>
                </>
              ) : (
                <>
                  <Pencil size={20} />
                  <span>Edit Profile</span>
                </>
              )}
            </button>
            <div className="absolute -bottom-16 left-32 transform md:-translate-x-1/2 -translate-x-1/3">
              <div className="relative">
                {userData.photoURL ? (
                  <img
                    src={userData.photoURL}
                    alt={userData.name}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                    <User size={48} className="text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="pt-24 pb-8 md:px-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={isEditing ? tempData.name : userData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="mt-1 h-8 p-4 py-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2C3E50] focus:ring-[#2C3E50] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    disabled
                    className="mt-1 h-8 p-4 py-8 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 text-gray-500"
                  />{" "}
                </div>

                {/* Blood Group */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Blood Group
                  </label>
                  <input
                    type="text"
                    name="bloodGroup"
                    value={
                      isEditing ? tempData.bloodGroup : userData.bloodGroup
                    }
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="mt-1 h-8 p-4 py-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2C3E50] focus:ring-[#2C3E50] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* District */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={isEditing ? tempData.district : userData.district}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="mt-1 h-8 p-4 py-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2C3E50] focus:ring-[#2C3E50] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
              {/* Upazila */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upazila
                </label>
                <input
                  type="text"
                  name="upazila"
                  value={isEditing ? tempData.upazila : userData.upazila}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 h-8 p-4 py-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2C3E50] focus:ring-[#2C3E50] disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
