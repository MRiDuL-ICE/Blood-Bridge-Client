import { useForm } from "react-hook-form";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  User,
  Droplets,
  AlertCircle,
} from "lucide-react";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
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
            <span className="text-[#DC143C] font-medium">Get in Touch</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-[#DC143C] to-[#ff4d6d] text-transparent bg-clip-text">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Have questions about blood donation? Need support? We're here to
            help. Reach out to us anytime.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#DC143C]/10 rounded-lg">
                    <Phone className="text-[#DC143C]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600">+880 13 03579271</p>
                    <p className="text-gray-600">+880 17 50861021</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#DC143C]/10 rounded-lg">
                    <Mail className="text-[#DC143C]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">abdulwahab22400@gmail.com</p>
                    <p className="text-gray-600">abdulbari2480@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#DC143C]/10 rounded-lg">
                    <MapPin className="text-[#DC143C]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Location</h3>
                    <p className="text-gray-600">Bagmara, Rajshahi</p>
                    <p className="text-gray-600">Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#DC143C]/10 rounded-lg">
                    <Clock className="text-[#DC143C]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
                    <p className="text-gray-600">Saturday: 10am - 4pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DC143C] to-[#ff4d6d] rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-1000"></div>
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Your Name
                      </label>
                      <div className="relative">
                        <User
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type="text"
                          id="name"
                          {...register("name", {
                            required: "Name is required",
                            minLength: {
                              value: 2,
                              message: "Name must be at least 2 characters",
                            },
                          })}
                          className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                            errors.name ? "border-red-500" : "border-gray-200"
                          } focus:outline-none focus:ring-2 focus:ring-[#DC143C]/20`}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.name && (
                        <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                          <AlertCircle size={16} />
                          <span>{errors.name.message}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DC143C] to-[#ff4d6d] rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-1000"></div>
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type="email"
                          id="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                            errors.email ? "border-red-500" : "border-gray-200"
                          } focus:outline-none focus:ring-2 focus:ring-[#DC143C]/20`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && (
                        <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                          <AlertCircle size={16} />
                          <span>{errors.email.message}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DC143C] to-[#ff4d6d] rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-1000"></div>
                  <div className="relative">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject
                    </label>
                    <div className="relative">
                      <MessageSquare
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        id="subject"
                        {...register("subject", {
                          required: "Subject is required",
                          minLength: {
                            value: 3,
                            message: "Subject must be at least 3 characters",
                          },
                        })}
                        className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                          errors.subject ? "border-red-500" : "border-gray-200"
                        } focus:outline-none focus:ring-2 focus:ring-[#DC143C]/20`}
                        placeholder="How can we help?"
                      />
                    </div>
                    {errors.subject && (
                      <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        <span>{errors.subject.message}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DC143C] to-[#ff4d6d] rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-1000"></div>
                  <div className="relative">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      {...register("message", {
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message: "Message must be at least 10 characters",
                        },
                      })}
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.message ? "border-red-500" : "border-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-[#DC143C]/20`}
                      placeholder="Your message here..."
                    ></textarea>
                    {errors.message && (
                      <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        <span>{errors.message.message}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#DC143C] text-white py-4 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#ff4d6d] transition-colors duration-300"
                >
                  Send Message
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
