import { useLoaderData } from "react-router-dom";
import {
  User,
  Droplets,
  MapPin,
  Building2,
  Calendar,
  Clock,
  MessageSquare,
  Save,
  ArrowLeft,
} from "lucide-react";
import SectionTitle from "@/shared/SectionTitle/SectionTitle";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "sonner";

const EditDonationRequest = () => {
  const data = useLoaderData();
  const axiosSecure = useAxiosSecure();

  const handleEdit = (e: any, id: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    axiosSecure
      .patch(`/donation-requests/${id}`, data)
      .then(() => {
        toast.success("Donation request updated successfully!", {
          duration: 2000,
        });
      })
      .catch((error) => {
        toast.error(error.message, { duration: 2000 });
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-4">
        <SectionTitle heading="Donation Request"></SectionTitle>
      </div>
      {/* Main Content */}
      <div className="md:w-7/12 mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#DC143C] text-white py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => window.history.back()}
                  className="p-2 hover:bg-[#b01031] rounded-full transition-colors"
                >
                  <ArrowLeft size={24} />
                </button>
                <h1 className="text-2xl font-bold">Edit Donation Request</h1>
              </div>
            </div>
          </div>

          <form onSubmit={(e) => handleEdit(e, data._id)} className="p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Recipient Name */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <User size={18} className="mr-2 text-[#DC143C]" />
                  Recipient Name
                </label>
                <input
                  type="text"
                  name="recipientName"
                  defaultValue={data.recipientName}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#DC143C] focus:border-transparent transition-all"
                />
              </div>

              {/* Blood Group */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Droplets size={18} className="mr-2 text-[#DC143C]" />
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  defaultValue={data.bloodGroup}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#DC143C] focus:border-transparent transition-all"
                >
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* District */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <MapPin size={18} className="mr-2 text-[#DC143C]" />
                  District
                </label>
                <input
                  type="text"
                  name="recipientDistrict"
                  defaultValue={data.recipientDistrict}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#DC143C] focus:border-transparent transition-all"
                />
              </div>

              {/* Upazila */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <MapPin size={18} className="mr-2 text-[#DC143C]" />
                  Upazila
                </label>
                <input
                  type="text"
                  name="recipientUpazila"
                  defaultValue={data.recipientUpazila}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#DC143C] focus:border-transparent transition-all"
                />
              </div>

              {/* Hospital Name */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Building2 size={18} className="mr-2 text-[#DC143C]" />
                  Hospital Name
                </label>
                <input
                  type="text"
                  name="hospitalName"
                  defaultValue={data.hospitalName}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#DC143C] focus:border-transparent transition-all"
                />
              </div>

              {/* Donation Date */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Calendar size={18} className="mr-2 text-[#DC143C]" />
                  Donation Date
                </label>
                <input
                  type="date"
                  name="donationDate"
                  defaultValue={data.donationDate}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#DC143C] focus:border-transparent transition-all"
                />
              </div>

              {/* Donation Time */}
              <div className="space-y-2 sm:col-span-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Clock size={18} className="mr-2 text-[#DC143C]" />
                  Donation Time
                </label>
                <input
                  type="time"
                  name="donationTime"
                  defaultValue={data.donationTime}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#DC143C] focus:border-transparent transition-all"
                />
              </div>

              {/* Full Address */}
              <div className="space-y-2 sm:col-span-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <MapPin size={18} className="mr-2 text-[#DC143C]" />
                  Full Address
                </label>
                <textarea
                  name="fullAddress"
                  rows={3}
                  defaultValue={data.fullAddress}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#DC143C] focus:border-transparent transition-all"
                />
              </div>

              {/* Request Message */}
              <div className="space-y-2 sm:col-span-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <MessageSquare size={18} className="mr-2 text-[#DC143C]" />
                  Request Message
                </label>
                <textarea
                  name="requestMessage"
                  rows={4}
                  defaultValue={data.requestMessage}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#DC143C] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="flex items-center px-6 py-3 bg-[#DC143C] text-white rounded-lg hover:bg-[#b01031] focus:outline-none focus:ring-2 focus:ring-[#DC143C] focus:ring-offset-2 transition-colors"
              >
                <Save size={18} className="mr-2" />
                Update Donation Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDonationRequest;
