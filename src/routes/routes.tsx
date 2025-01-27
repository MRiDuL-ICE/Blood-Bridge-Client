import MainLayout from "@/layout/MainLayout";
import HomeLayout from "@/pages/Home/HomeLayout/HomeLayout";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "@/layout/DashboardLayout";
import Profile from "@/pages/Dashboard/Profile/Profile";
import DashboardHome from "@/pages/Dashboard/DashboardHome/DashboardHome";
import CreateDonationRequest from "@/pages/Dashboard/DonorDashboard/CreateDonationRequest/CreateDonationRequest";
import MyDonationRequest from "@/pages/Dashboard/DonorDashboard/MyDonationRequest/MyDonationRequest";
import DonationRequestDetails from "@/pages/Dashboard/DonorDashboard/DonationRequestDetails/DonationRequestDetails";
import EditDonationRequest from "@/pages/Dashboard/DonorDashboard/EditDonationRequest/EditDonationRequest";
import AdminRoute from "./AdminRoute";
import AllUsers from "@/pages/Dashboard/AdminDashboard/AllUsers/AllUsers";
import AllDonations from "@/pages/Dashboard/AdminDashboard/AllDonations/AllDonations";
import ContentManagement from "@/pages/Dashboard/ContentManagement/ContentManagement";
import AddBlog from "@/pages/Dashboard/AddBlog/AddBlog";
import AdminVolunteerRoute from "./AdminVolunteerRoute";
import AllDonationRequests from "@/pages/Home/AllDonationRequests/AllDonationRequests";
import Blogs from "@/pages/Home/Blogs/Blogs";
import BlogDetail from "@/pages/Home/Blogs/BlogsDetails";
import SearchDetails from "@/pages/Home/SearchDetails/SearchDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "",
        element: <HomeLayout></HomeLayout>,
      },
      {
        path: "/donation-request/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails></DonationRequestDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://blood-bridge-server-lime.vercel.app/donation-requests/${params.id}`
          ),
      },
      {
        path: "all-donation-requests",
        element: <AllDonationRequests></AllDonationRequests>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetail></BlogDetail>,
      },
      {
        path: "/search-donations",
        element: <SearchDetails></SearchDetails>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "profile/:email",
        element: <Profile></Profile>,
      },
      {
        path: "create-donation-request",
        element: <CreateDonationRequest></CreateDonationRequest>,
      },
      {
        path: "my-donation-request",
        element: <MyDonationRequest></MyDonationRequest>,
      },
      {
        path: "my-donation-request/:id",
        element: <EditDonationRequest></EditDonationRequest>,
        loader: ({ params }) =>
          fetch(
            `https://blood-bridge-server-lime.vercel.app/donation-requests/${params.id}`
          ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: (
          <AdminVolunteerRoute>
            <AllDonations></AllDonations>
          </AdminVolunteerRoute>
        ),
      },
      {
        path: "content-management",
        element: (
          <AdminVolunteerRoute>
            <ContentManagement></ContentManagement>
          </AdminVolunteerRoute>
        ),
      },
      {
        path: "content-management/add-blog",
        element: (
          <AdminVolunteerRoute>
            <AddBlog></AddBlog>
          </AdminVolunteerRoute>
        ),
      },
    ],
  },
]);

export default router;
