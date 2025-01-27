import SectionTitle from "@/shared/SectionTitle/SectionTitle";
import { useState } from "react";
import {
  Filter,
  Search,
  Droplets,
  Check,
  X,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAdmin from "@/hooks/useAdmin";

const ITEMS_PER_PAGE = 5;
const STATUS_OPTIONS = ["all", "pending", "inprogress", "done", "canceled"];

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();
  // @ts-ignore
  const [isAdmin, isAdminLoading] = useAdmin();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: donations = [], refetch } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests`);
      return res.data;
    },
  });

  // Filter donations based on status and search term
  const filteredDonations = donations.filter((donation: any) => {
    const matchesStatus =
      statusFilter === "all" || donation.donationStatus === statusFilter;
    const matchesSearch =
      donation.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.recipientDistrict
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      donation.recipientUpazila
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      donation.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (id: any, newStatus: string) => {
    axiosSecure
      .patch(`/donation-requests-status/${id}`, { newStatus })
      .then(() => {
        refetch();
        toast.success(`Your request has been changed to ${newStatus}`, {
          duration: 2000,
        });
      })
      .catch((err) => {
        toast.error(err.message, { duration: 2000 });
      });
  };

  const handleDelete = (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donation-requests/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredDonations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDonations = filteredDonations.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-4">
        <SectionTitle heading={"Donation Requests"}></SectionTitle>
      </div>
      <div className="md:w-11/12 mx-auto md:px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-8">
            <Droplets className="text-[#DC143C]" size={32} />
            <h1 className="md:text-3xl font-bold text-[#DC143C]">
              My Donation Requests
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
                placeholder="Search by recipient, hospital, or district..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-[#DC143C]"
              />
            </div>
          </div>

          <p className="mb-4 text-sm md:hidden">
            Scroll on the table from left to right
          </p>

          {/* Table */}
          <div className="bg-white rounded-lg p-6 mt-8">
            <div className="flex items-center gap-3 mb-8">
              <Droplets className="text-[#DC143C]" size={32} />
              <h2 className="md:text-3xl font-bold text-[#DC143C]">
                Recent Donation Requests
              </h2>
            </div>
            <p className="mb-4 text-sm md:hidden">
              Scroll on the table from left to right
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-lg">
                <thead className="bg-[#DC143C] text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Recipient</th>
                    <th className="px-6 py-3 text-left">Location</th>
                    <th className="px-6 py-3 text-left">Date & Time</th>
                    <th className="px-6 py-3 text-left">Blood Group</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Donor</th>
                    {isAdmin && (
                      <>
                        <th className="px-6 py-3 text-left">Actions</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedDonations.map((donation: any) => (
                    <tr key={donation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">
                        {donation.recipientName}
                      </td>
                      <td className="px-6 py-4">
                        {donation.recipientDistrict},{" "}
                        {donation.recipientUpazila}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span>{donation.donationDate}</span>
                          <span className="text-sm text-gray-500">
                            {donation.donationTime}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-red-50 text-[#DC143C] rounded-full font-medium">
                          {donation.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            donation.donationStatus === "done"
                              ? "bg-[#2ECC71] text-white"
                              : donation.donationStatus === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : donation.donationStatus === "inprogress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {donation.donationStatus}
                        </span>
                        {donation.donationStatus === "inprogress" && (
                          <div className="flex gap-2 mt-2 justify-center">
                            <button
                              onClick={() =>
                                handleStatusChange(donation._id, "done")
                              }
                              className="p-1 bg-green-100 text-green-600 rounded"
                            >
                              <Check size={20} />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(donation._id, "canceled")
                              }
                              className="p-1 bg-red-100 text-red-600 rounded"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {donation.donationStatus === "inprogress" &&
                          donation && (
                            <div className="text-sm">
                              <p className="font-medium">
                                {donation.requesterName}
                              </p>
                              <p className="text-gray-500">
                                {donation.requesterEmail}
                              </p>
                            </div>
                          )}
                      </td>
                      {isAdmin && (
                        <>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <Link to={`/donation-request/${donation._id}`}>
                                <button
                                  className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                                  title="View Details"
                                >
                                  <Eye size={18} />
                                </button>
                              </Link>
                              <Link
                                to={`/dashboard/my-donation-request/${donation._id}`}
                              >
                                <button
                                  className="p-2 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200"
                                  title="Edit"
                                >
                                  <Edit size={18} />
                                </button>
                              </Link>
                              <button
                                onClick={() => handleDelete(donation._id)}
                                className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                                title="Delete"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6 overflow-y-auto">
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

export default AllDonations;
