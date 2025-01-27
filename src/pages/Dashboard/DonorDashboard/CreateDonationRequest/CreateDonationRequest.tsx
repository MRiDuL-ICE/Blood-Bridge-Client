import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { Droplet, MapPin, Calendar, Clock, MessageSquare } from "lucide-react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { toast } from "sonner";
import SectionTitle from "@/shared/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const CreateDonationRequest = () => {
  const { user }: any = useAuth();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  // @ts-ignore
  const [searchDistrict, setSearchDistrict] = useState("");
  // @ts-ignore
  const [searchUpazila, setSearchUpazila] = useState("");
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: active } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch("/districts.json");
        const data = await response.json();
        setDistricts(data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistricts();
  }, []);

  useEffect(() => {
    const fetchUpazilas = async () => {
      try {
        const response = await fetch("/upazilas.json");
        const data = await response.json();
        setUpazilas(data);
      } catch (error) {
        console.error("Error fetching upazilas:", error);
      }
    };

    fetchUpazilas();
  }, []);

  const filteredDistricts = districts.filter((district: any) =>
    district.name.toLowerCase().includes(searchDistrict.toLowerCase())
  );

  const filteredUpazilas = upazilas.filter((upazila: any) =>
    upazila.name.toLowerCase().includes(searchUpazila.toLowerCase())
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const newData = { ...data, donationStatus: "pending" };
    const res = await axiosPublic.post("/donation-requests", newData);
    if (res.data.insertedId) {
      toast.success("Donation request submitted successfully!", {
        duration: 2000,
      });
      e.target.reset();
      data;
    } else {
      toast.error("Failed to submit donation request!", { duration: 2000 });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <SectionTitle heading="Create Donation Request"></SectionTitle>
      </div>
      {active?.status === "active" ? (
        <>
          <div className="md:w-7/12 mx-auto">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="bg-[#DC143C] py-4 px-8">
                <h2 className="text-2xl font-bold text-white">
                  Create Blood Donation Request
                </h2>
                <p className="text-red-100 mt-1">
                  Fill in the details to submit your blood donation request
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Requester Information */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Requester Name
                    </label>
                    <input
                      type="text"
                      name="requesterName"
                      value={user?.displayName}
                      readOnly
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Requester Email
                    </label>
                    <input
                      type="email"
                      name="requesterEmail"
                      value={user?.email}
                      readOnly
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-600"
                    />
                  </div>
                </div>

                {/* Recipient Information */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      name="recipientName"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#DC143C] focus:border-[#DC143C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Blood Group
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Droplet className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        name="bloodGroup"
                        required
                        className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#DC143C] focus:border-[#DC143C]"
                      >
                        <option value="">Select Blood Group</option>
                        {bloodGroups.map((group) => (
                          <option key={group} value={group}>
                            {group}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      District
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        name="recipientDistrict"
                        required
                        className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#DC143C] focus:border-[#DC143C]"
                      >
                        <option value="">Select District</option>
                        {filteredDistricts.map((district: any) => (
                          <option key={district.id} value={district.name}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Upazila
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        name="recipientUpazila"
                        required
                        disabled={!districts}
                        className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#DC143C] focus:border-[#DC143C]"
                      >
                        <option value="">Select Upazila</option>
                        {filteredUpazilas.map((upazila: any) => (
                          <option key={upazila.id} value={upazila.name}>
                            {upazila.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Hospital Information */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Hospital Name
                    </label>
                    <input
                      type="text"
                      name="hospitalName"
                      required
                      placeholder="e.g., Dhaka Medical College Hospital"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#DC143C] focus:border-[#DC143C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Address
                    </label>
                    <input
                      type="text"
                      name="fullAddress"
                      required
                      placeholder="e.g., Zahir Raihan Rd, Dhaka"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#DC143C] focus:border-[#DC143C]"
                    />
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Donation Date
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        name="donationDate"
                        required
                        className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#DC143C] focus:border-[#DC143C]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Donation Time
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="time"
                        name="donationTime"
                        required
                        className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#DC143C] focus:border-[#DC143C]"
                      />
                    </div>
                  </div>
                </div>

                {/* Request Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Request Message
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute top-3 left-3">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      name="requestMessage"
                      required
                      rows={4}
                      placeholder="Please describe why you need blood donation..."
                      className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#DC143C] focus:border-[#DC143C]"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#DC143C] text-white px-3 md:px-6 py-3 rounded-md hover:bg-[#b01031] transition-colors duration-200 flex items-center gap-2"
                  >
                    <Droplet className="h-5 w-5" />
                    Create Donation Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-red-600/40 rounded-md p-24 flex justify-center items-center">
            <h2 className="text-black text-3xl">You're blocked user!</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateDonationRequest;
