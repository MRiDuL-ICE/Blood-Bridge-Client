import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Droplets, MapPin, Calendar, Clock, Building2 } from "lucide-react";

const Featured = () => {
  const axiosPublic = useAxiosPublic();
  const { data: donations = [] } = useQuery({
    queryKey: ["donation-requests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/featured-requests");
      return res.data;
    },
  });

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Droplets className="h-12 w-12 text-[#DC143C]" />
            <h2 className="text-4xl font-bold text-[#2C3E50]">
              Urgent: Lives Depend on You
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every drop counts. Your donation can save someone's life today.
            Respond to these urgent blood donation requests and be a hero.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation: any) => (
            <div
              key={donation._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              {/* Status Badge */}
              <div className="relative">
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      donation.donationStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : donation.donationStatus === "inprogress"
                        ? "bg-blue-100 text-blue-800"
                        : donation.donationStatus === "done"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {donation.donationStatus.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Blood Group */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <Droplets className="h-8 w-8 text-[#DC143C]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Blood Group</p>
                      <p className="text-2xl font-bold text-[#DC143C]">
                        {donation.bloodGroup}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#DC143C] mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold text-[#2C3E50]">
                        {donation.recipientDistrict},{" "}
                        {donation.recipientUpazila}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-[#DC143C] mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Hospital</p>
                      <p className="font-semibold text-[#2C3E50]">
                        {donation.hospitalName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-[#DC143C] mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold text-[#2C3E50]">
                        {donation.donationDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[#DC143C] mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Time</p>
                      <p className="font-semibold text-[#2C3E50]">
                        {donation.donationTime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Donate Button */}
                {donation.donationStatus === "pending" && (
                  <Link
                    to={`/donation-request/${donation._id}`}
                    className="mt-6 w-full block text-center px-6 py-3 bg-[#DC143C] text-white rounded-lg hover:bg-[#b01031] transition-colors font-semibold"
                  >
                    Donate Now
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
