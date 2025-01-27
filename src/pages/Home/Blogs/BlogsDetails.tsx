import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: blog } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/blogs/${id}`);
      return res.data;
    },
  });

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#DC143C]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div
        className="w-full h-[40vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${blog.thumbnail})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white max-w-4xl text-center px-4">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          to="/blogs"
          className="inline-flex items-center text-[#DC143C] hover:text-[#ff4d6d] mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Blogs
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-2 text-gray-600 mb-6">
            <Calendar size={20} />
            <span>{new Date().toLocaleDateString()}</span>
          </div>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
