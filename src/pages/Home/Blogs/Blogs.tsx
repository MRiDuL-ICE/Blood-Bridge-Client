import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Search,
  BookOpen,
  Calendar,
  ChevronRight,
  Droplets,
} from "lucide-react";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const axiosPublic = useAxiosPublic();

  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs");
      return res.data;
    },
  });

  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(
    (blog: any) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[#DC143C]/5"></div>
        <div
          className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#DC143C]/10 to-transparent"
          style={{
            clipPath: "polygon(100% 0, 100% 100%, 0 100%, 20% 0)",
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <Droplets className="text-[#DC143C]" size={32} />
                <div className="h-8 w-px bg-[#DC143C]/20"></div>
                <span className="text-[#DC143C] font-medium">
                  Blood Donation Blog
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#DC143C] to-[#ff4d6d] text-transparent bg-clip-text">
                Insights & Stories
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Discover the impact of blood donation through our collection of
                inspiring stories and valuable insights
              </p>

              {/* Search Bar */}
              <div className="max-w-xl mx-auto md:mx-0">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DC143C] to-[#ff4d6d] rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                  <div className="relative">
                    <Search
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#DC143C] transition-colors"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-lg bg-white border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#DC143C]/20 shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block flex-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-[#DC143C]/5 rounded-full blur-3xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80"
                  alt="Blood Donation"
                  className="relative w-full h-80 object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog: any) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <Calendar size={16} />
                  <span className="text-sm">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                  {blog.title}
                </h2>
                <div
                  className="text-gray-600 mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: blog.content.substring(0, 150) + "...",
                  }}
                />
                <Link
                  to={`/blogs/${blog._id}`}
                  className="inline-flex items-center text-[#DC143C] hover:text-[#ff4d6d] font-medium"
                >
                  Read More
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No blogs found
            </h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
