import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  Droplets,
  Calendar,
  Clock,
  MapPin,
  Building2,
  MessageSquare,
  Heart,
  X,
  User,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
const DonationRequestDetails = () => {
  const data = useLoaderData();
  const { user }: any = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDonate = async () => {
    try {
      await axiosSecure.patch(`/donation-requests-status/${data._id}`, {
        newStatus: "inprogress",
        donorName: user.displayName,
        donorEmail: user.email,
      });
      toast.success("Thank you for your donation!");
      setIsModalOpen(false);
      navigate("/all-donation-requests");
    } catch (error) {
      toast.error("Failed to process donation");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      {/* Content */}
      <div className="md:w-7/12 mx-auto px-4 py-44 md:py-32 rounded-md">
        <div className="bg-[#DC143C] text-white px-4 rounded-t-md py-8">
          <div className="w-full mx-auto rounded-md">
            <button
              onClick={() => navigate(-1)}
              className="text-white text-4xl font-extrabold"
            >
              <IoMdArrowRoundBack />
            </button>
            <div className="flex items-center gap-3  rounded-md">
              <Droplets className="h-8 w-8" />
              <h1 className="text-3xl font-bold">Donation Request Details</h1>
            </div>
            <p className="text-lg opacity-90">
              Review the donation request details and help save a life
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Status Badge */}
          <div className="flex justify-end mb-6">
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                data.donationStatus === "done"
                  ? "bg-green-100 text-green-800"
                  : data.donationStatus === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : data.donationStatus === "inprogress"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {data.donationStatus}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Recipient Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">
                  Recipient Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <User className="h-5 w-5 text-[#DC143C]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Recipient Name</p>
                      <p className="font-semibold text-lg">
                        {data.recipientName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <Droplets className="h-5 w-5 text-[#DC143C]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Blood Group</p>
                      <p className="font-semibold text-lg">{data.bloodGroup}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-[#DC143C]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold">
                        {data.recipientDistrict}, {data.recipientUpazila}
                      </p>
                      <p className="text-gray-600 mt-1">{data.fullAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <Building2 className="h-5 w-5 text-[#DC143C]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Hospital</p>
                      <p className="font-semibold">{data.hospitalName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Schedule & Additional Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">
                  Donation Schedule
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-[#DC143C]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold">{data.donationDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <Clock className="h-5 w-5 text-[#DC143C]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Time</p>
                      <p className="font-semibold">{data.donationTime}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-[#DC143C]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Message</p>
                      <p className="text-gray-700">{data.requestMessage}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Requester Information */}
              <div>
                <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">
                  Requester Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <User className="h-5 w-5 text-[#DC143C]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Requester Name</p>
                      <p className="font-semibold">{data.requesterName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <Mail className="h-5 w-5 text-[#DC143C]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Requester Email</p>
                      <p className="font-semibold">{data.requesterEmail}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donor Information (if exists) */}
              {data.donorName && (
                <div>
                  <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">
                    Donor Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-50 rounded-lg">
                        <User className="h-5 w-5 text-[#DC143C]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Donor Name</p>
                        <p className="font-semibold">{data.donorName}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-50 rounded-lg">
                        <Mail className="h-5 w-5 text-[#DC143C]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Donor Email</p>
                        <p className="font-semibold">{data.donorEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Donate Button */}
          {data.donationStatus === "pending" && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3 bg-[#DC143C] text-white rounded-lg flex items-center gap-2 hover:bg-[#b01031] transition-colors"
              >
                <Heart className="h-5 w-5" />
                Donate Now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Donation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#2C3E50]">
                Confirm Donation
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Donor Name
                </label>
                <input
                  type="text"
                  value={user.displayName}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Donor Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDonate}
                className="px-4 py-2 bg-[#DC143C] text-white rounded-lg hover:bg-[#b01031] transition-colors"
              >
                Confirm Donation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;
