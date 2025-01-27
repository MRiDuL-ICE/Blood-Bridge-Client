import { useState } from "react";
import useUsers from "@/hooks/useUsers";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import SectionTitle from "@/shared/SectionTitle/SectionTitle";
import { RiUserSharedLine } from "react-icons/ri";
import {
  Users,
  Filter,
  Search,
  Shield,
  UserCheck,
  UserX,
  UserCog,
} from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";

const ITEMS_PER_PAGE = 5;
const STATUS_OPTIONS = ["all", "active", "blocked"];

const AllUsers = () => {
  const [users, refetch] = useUsers();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  console.log(users);

  // Filter users based on status and search term
  const filteredUsers = users.filter((user: any) => {
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleStatusChange = async (email: string, newStatus: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/status/${email}`, { newStatus })
          .then(() => {
            refetch();
            toast.success(`User status has been changed to ${newStatus}`);
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }
    });
  };

  const handleRoleChange = async (email: string, newRole: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/role/${email}`, { newRole })
          .then(() => {
            refetch();
            toast.success(`User status has been changed to ${newRole}`);
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-4">
        <SectionTitle heading="All Users" />
      </div>
      <div className="md:w-11/12 mx-auto md:px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-8">
            <Users className="text-[#DC143C]" size={32} />
            <h1 className="md:text-3xl font-bold text-[#DC143C]">
              User Management
            </h1>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="text-[#DC143C]" size={20} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#DC143C]"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-[#DC143C]"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-lg">
              <thead className="bg-[#DC143C] text-white">
                <tr>
                  <th className="px-6 py-3 text-left">User</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Role</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedUsers.map((user: any) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.photoURL}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : user.role === "volunteer"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {user.status === "active" ? (
                          <button
                            onClick={() =>
                              handleStatusChange(user.email, "blocked")
                            }
                            className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                            title="Block User"
                          >
                            <UserX size={18} />
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleStatusChange(user.email, "active")
                            }
                            className="p-2 bg-green-100 text-green-600 rounded hover:bg-green-200"
                            title="Unblock User"
                          >
                            <UserCheck size={18} />
                          </button>
                        )}
                        {user.role !== "volunteer" && user.role !== "admin" && (
                          <button
                            onClick={() =>
                              handleRoleChange(user.email, "volunteer")
                            }
                            className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                            title="Make Volunteer"
                          >
                            <UserCog size={18} />
                          </button>
                        )}
                        {user.role !== "admin" && (
                          <button
                            onClick={() =>
                              handleRoleChange(user.email, "admin")
                            }
                            className="p-2 bg-purple-100 text-purple-600 rounded hover:bg-purple-200"
                            title="Make Admin"
                          >
                            <Shield size={18} />
                          </button>
                        )}
                        {user.role !== "donor" && user.role !== "admin" && (
                          <button
                            onClick={() =>
                              handleRoleChange(user.email, "donor")
                            }
                            className="p-2 bg-purple-100 text-green-600 rounded hover:bg-purple-200"
                            title="Make Admin"
                          >
                            <RiUserSharedLine size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md border border-[#DC143C] text-[#DC143C] disabled:opacity-50"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === i + 1
                      ? "bg-[#DC143C] text-white"
                      : "border border-[#DC143C] text-[#DC143C]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-md border border-[#DC143C] text-[#DC143C] disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
