import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  PlusCircle,
  FileText,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import useAdmin from "@/hooks/useAdmin";
import SectionTitle from "@/shared/SectionTitle/SectionTitle";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const ITEMS_PER_PAGE = 6;

const ContentManagement = () => {
  // @ts-ignore
  const { user }: any = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  // @ts-ignore
  const [isAdmin, isAdminLoading] = useAdmin();
  const axiosPublic = useAxiosPublic();

  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs");
      return res.data;
    },
  });

  // Filter blogs based on status and search term
  const filteredBlogs = blogs.filter((blog: any) => {
    const matchesStatus =
      statusFilter === "all" || blog.status === statusFilter;
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    axiosSecure
      .patch(`/blogs/${id}`, { newStatus })
      .then(() => {
        refetch();
        toast.success(`Blogs status has been changed to ${newStatus}`);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleDelete = async (id: string) => {
    axiosSecure
      .delete(`/blogs/${id}`)
      .then(() => {
        refetch();
        toast.success("Blog has been deleted successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-50 md:p-6">
      <div>
        <SectionTitle heading="Blogs"></SectionTitle>
      </div>
      <div className="md:max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex md:justify-between items-center mb-8 flex-col md:flex-row gap-6 my-6">
          <div className="flex items-center gap-3 ">
            <FileText className="h-8 w-8 text-[#DC143C]" />
            <h1 className="md:text-3xl font-bold text-[#2C3E50]">
              Content Management
            </h1>
          </div>
          <Link
            to="/dashboard/content-management/add-blog"
            className="flex items-center gap-2 px-4 py-2 bg-[#DC143C] text-white rounded-lg hover:bg-[#b01031] transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            Add Blog
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="text-[#DC143C]" size={20} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#DC143C]"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
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
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-[#DC143C]"
              />
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedBlogs.map((blog: any) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-[#2C3E50] line-clamp-2">
                    {blog.title}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      blog.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {blog.status}
                  </span>
                </div>
                <div
                  className="prose prose-sm max-w-none mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Link to={`/blog/${blog._id}`}>
                      <button
                        className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                    </Link>
                    <Link
                      to={`/dashboard/content-management/edit-blog/${blog._id}`}
                    >
                      <button
                        className="p-2 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                    </Link>
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() =>
                        handleStatusChange(
                          blog._id,
                          blog.status === "draft" ? "published" : "draft"
                        )
                      }
                      className={`p-2 rounded flex items-center gap-1 ${
                        blog.status === "draft"
                          ? "bg-green-100 text-green-600 hover:bg-green-200"
                          : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                      }`}
                    >
                      {isAdmin && (
                        <>
                          {blog.status === "draft" ? (
                            <>
                              <CheckCircle2 size={18} />
                              <span className="text-sm">Publish</span>
                            </>
                          ) : (
                            <>
                              <XCircle size={18} />
                              <span className="text-sm">Unpublish</span>
                            </>
                          )}
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
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
  );
};

export default ContentManagement;
