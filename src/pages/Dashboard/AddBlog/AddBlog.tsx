import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { FileText, Upload } from "lucide-react";
import SectionTitle from "@/shared/SectionTitle/SectionTitle";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "sonner";

// type Inputs = {
//   title: string;
//   thumbnail: any;
// };

const ibb_key = import.meta.env.VITE_ibb_key;
const ibb_api = `https://api.imgbb.com/1/upload?key=${ibb_key}`;

const AddBlog = () => {
  const axiosPublic = useAxiosPublic();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  // @ts-ignore
  const [previewUrl, setPreviewUrl]: any = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const thumbnailFile = { image: data.thumbnail[0] };
    const res = await axiosPublic.post(ibb_api, thumbnailFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const thumbnail = res.data?.data?.url;
    if (res.data?.success) {
      const blogContent: any = {
        title: data.title,
        thumbnail: thumbnail,
        content: content,
        status: "draft",
      };
      const res = await axiosSecure.post("/blogs", blogContent);
      if (res.data.insertedId) {
        toast.success("Blog created successfully!");
        reset();
        setContent("");
        setIsLoading(false);
      } else {
        toast.error("Error in blog creating!");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 md:p-6">
      <SectionTitle heading="Add Blog" />

      <div className="md:w-9/12 mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <FileText className="h-8 w-8 text-[#DC143C]" />
          <h1 className="md:text-3xl font-bold text-[#2C3E50]">
            Create New Blog
          </h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md md:p-16 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Blog Title
              </label>
              <input
                id="title"
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC143C]"
                placeholder="Enter blog title"
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Thumbnail Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  {previewUrl ? (
                    <div className="mb-4">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="mx-auto h-32 w-auto"
                      />
                    </div>
                  ) : (
                    <Upload
                      className="mx-auto h-12 w-12 text-gray-400"
                      strokeWidth={1}
                    />
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="thumbnail"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-[#DC143C] hover:text-[#b01031] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#DC143C]"
                    >
                      <span>Upload a file</span>
                      <input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        {...register("thumbnail", {
                          required: "Thumbnail is required",
                        })}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Blog Content
              </label>
              <JoditEditor
                ref={editor}
                value={content}
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                // @ts-ignore
                onChange={(newContent) => {}}
                config={{
                  readonly: false,
                  placeholder: "Start writing your blog content...",
                  height: 500,
                }}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-[#DC143C] text-white rounded-lg hover:bg-[#b01031] transition-colors"
              >
                {isLoading ? (
                  <>
                    Creating
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18px"
                      fill="#fff"
                      className="ml-2 inline animate-spin"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.03 2.757a1 1 0 0 1 1.213-.727l4 1a1 1 0 0 1 .59 1.525l-2 3a1 1 0 0 1-1.665-1.11l.755-1.132a7.003 7.003 0 0 0-2.735 11.77 1 1 0 0 1-1.376 1.453A8.978 8.978 0 0 1 3 12a9 9 0 0 1 4.874-8l-.117-.03a1 1 0 0 1-.727-1.213zm10.092 3.017a1 1 0 0 1 1.414.038A8.973 8.973 0 0 1 21 12a9 9 0 0 1-5.068 8.098 1 1 0 0 1-.707 1.864l-3.5-1a1 1 0 0 1-.557-1.517l2-3a1 1 0 0 1 1.664 1.11l-.755 1.132a7.003 7.003 0 0 0 3.006-11.5 1 1 0 0 1 .039-1.413z"
                        clip-rule="evenodd"
                        data-original="#000000"
                      />
                    </svg>
                  </>
                ) : (
                  "Create Blog"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
