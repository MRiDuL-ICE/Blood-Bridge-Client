import { Droplets, Eye, Edit, Trash2, Check, X } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import Welcome from "@/shared/Welcome/Welcome";
import useDonationRequest from "@/hooks/useDonationRequest";
import { Link } from "react-router-dom";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "sonner";

function DonorHome() {
  const { user }: any = useAuth();
  const [donations, refetch] = useDonationRequest();
  const axiosSecure = useAxiosSecure();

  const handleStatusChange = (id: any, newStatus: string) => {
    axiosSecure
      .patch(`/donation-requests-status/${id}`, { newStatus })
      // @ts-ignore
      .then((res) => {
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

  const recentDate = donations.sort(
    (a: any, b: any) =>
      new Date(a.donationDate).getTime() - new Date(b.donationDate).getTime()
  );

  const limitDonations = recentDate.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:w-11/12 mx-auto md:px-4 py-8">
        <Welcome
          name={user.displayName}
          subHeading1="a great donor"
          subHeading2="so kind"
          subHeading3="a hero"
        />

        {donations && (
          <>
            <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
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
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {limitDonations.map((donation: any) => (
                      <tr key={donation._id} className="hover:bg-gray-50">
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
                            <div className="flex gap-2 mt-2 mx-auto">
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center mt-6">
                <Link to={"/dashboard/my-donation-request"}>
                  <button className="px-6 py-2 bg-[#DC143C] text-white rounded-md hover:bg-[#b01031] transition-colors">
                    View My All Requests
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DonorHome;
