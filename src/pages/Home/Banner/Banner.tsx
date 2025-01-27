import { useNavigate } from "react-router-dom";
import banner from "@/assets/banner.jpg";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#ffff] to-[#2C3E50]/50 py-24 h-screen flex items-center">
      <div
        className="absolute inset-0 w-full h-full bg-fixed"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="w-full h-screen mx-auto backdrop-blur-sm bg-black bg-opacity-75 px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#DC143C] mb-8">
            Every <span className="text-white">Drop</span> Counts
            <span className="block text-2xl sm:text-3xl md:text-4xl mt-4 font-normal">
              Be a <span className="text-white">Hero</span>, Save{" "}
              <span className="text-white">Lives</span>
            </span>
          </h1>

          <p className="mt-4 text-xl text-white max-w-2xl mx-auto mb-12">
            Join our community of life-savers. Your donation can make the
            difference between life and death for someone in need.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 bg-[#DC143C] text-white rounded-full font-semibold text-lg hover:bg-[#b01031] transition-colors duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              Join as a Donor
            </button>
            <button
              onClick={() => navigate("/search-donations")}
              className="px-8 py-4 bg-white text-[#2C3E50] rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              Search Donors
            </button>
          </div>
        </div>
      </div>

      {/* Blood drop decorative elements */}
      <div className="absolute top-12 left-8 w-4 h-4 rounded-full bg-white/20"></div>
      <div className="absolute bottom-16 right-12 w-6 h-6 rounded-full bg-white/20"></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-white/20"></div>
    </div>
  );
};

export default Banner;
