import { useState } from "react";
import {
  Search,
  Droplets,
  MapPin,
  Users,
  Mail,
  AlertCircle,
} from "lucide-react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

interface Donor {
  _id: string;
  name: string;
  bloodGroup: string;
  district: string;
  upazila: string;
  email: string;
  phone: string;
  lastDonation: string;
  status: string;
  photoURL: string;
}

const SearchDetails = () => {
  const [searchParams, setSearchParams] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });
  const [donors, setDonors] = useState<Donor[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const axiosPublic = useAxiosPublic();

  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/districts");
      return res.data;
    },
  });

  const { data: upazilas = [] } = useQuery({
    queryKey: ["upazilas"],
    queryFn: async () => {
      const res = await axiosPublic.get("/upazilas");
      return res.data;
    },
  });

  const handleSearch = async (e: any) => {
    e.preventDefault();
    setIsSearching(true);
    const encodedBloodGroup = encodeURIComponent(searchParams.bloodGroup);
    const res = await axiosPublic.get(
      `/donors?bloodGroup=${encodedBloodGroup}&district=${searchParams.district}&upazila=${searchParams.upazila}`
    );
    setDonors(res.data);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white py-16">
        <div className="absolute inset-0 bg-[#DC143C]/5"></div>
        <div
          className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#DC143C]/10 to-transparent"
          style={{
            clipPath: "polygon(100% 0, 100% 100%, 0 100%, 20% 0)",
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Droplets className="text-[#DC143C]" size={32} />
            <div className="h-8 w-px bg-[#DC143C]/20"></div>
            <span className="text-[#DC143C] font-medium">
              Find Blood Donors
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-[#DC143C] to-[#ff4d6d] text-transparent bg-clip-text">
            Search for Blood Donors
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Find blood donors in your area quickly and easily. Every drop counts
            in saving lives.
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Blood Group Selection */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Droplets size={18} className="mr-2 text-[#DC143C]" />
                  Blood Group
                </label>
                <select
                  value={searchParams.bloodGroup}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      bloodGroup: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#DC143C] focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select Blood Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* District Selection */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <MapPin size={18} className="mr-2 text-[#DC143C]" />
                  District
                </label>
                <select
                  value={searchParams.district}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      district: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#DC143C] focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select District</option>
                  {districts.map((district: any) => (
                    <option key={district.id} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upazila Selection */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <MapPin size={18} className="mr-2 text-[#DC143C]" />
                  Upazila
                </label>
                <select
                  value={searchParams.upazila}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      upazila: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#DC143C] focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select Upazila</option>
                  {upazilas.map((upazila: any) => (
                    <option key={upazila.id} value={upazila.name}>
                      {upazila.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={isSearching}
              className="w-full bg-[#DC143C] text-white py-4 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#ff4d6d] transition-colors duration-300 disabled:opacity-70"
            >
              {isSearching ? (
                <>Searching...</>
              ) : (
                <>
                  <Search size={20} />
                  Search Donors
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      {donors && (
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="flex items-center gap-2 mb-6">
            <Users className="text-[#DC143C]" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">
              Available Donors
            </h2>
          </div>

          {donors.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <AlertCircle className="mx-auto text-[#DC143C] mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Donors Found
              </h3>
              <p className="text-gray-600">
                We couldn't find any donors matching your criteria. Please try
                different search parameters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donors.map((donor) => (
                <div
                  key={donor._id}
                  className="bg-white rounded-md shadow-lg overflow-hidden"
                >
                  <div className="p-3 flex justify-between">
                    <img
                      className="h-32 rounded-full w-32"
                      src={donor.photoURL}
                      alt=""
                    />
                    {donor.status === "active" && (
                      <>
                        <p className="bg-green-500 text-white px-3 h-full rounded-full">
                          {donor.status}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {donor?.name}
                      </h3>
                      <span className="px-4 py-1 bg-[#DC143C]/10 text-[#DC143C] rounded-full font-medium">
                        {donor?.bloodGroup}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <MapPin size={18} className="mr-2 text-[#DC143C]" />
                        {donor?.upazila}, {donor?.district}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Mail size={18} className="mr-2 text-[#DC143C]" />
                        {donor?.email}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDetails;
