import AuthLayout from "@/components/layout/AuthLayout";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import RootLayout from "@/components/layout/RootLayout";
import Cart from "@/pages/root/cart/Cart";
import CourseDetail from "@/pages/root/courses/courseId/CourseDetail";
import Courses from "@/pages/root/courses/Courses";
import EditCourse from "@/pages/root/instructor/edit-course/EditCourse";
import Home from "@/pages/root/home/Home";
import MyLearning from "@/pages/root/users/MyLearning";
import VideoPlayer from "@/pages/root/VideoPlayer";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import NotFound from "@/pages/not-found/NotFound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { VerifyOtp } from "./pages/auth/VerifyOtp";
import { rootLoader } from "./services/rootLoader";
import MainLayout from "./components/layout/MainLayout";
import EditProfile from "./pages/root/users/EditProfile";
import Profile from "./pages/root/users/Profile";
import PurchaseHistory from "./pages/root/users/PurchaseHistory";
import WishList from "./pages/root/users/WishList";
import AuthNotFound from "./pages/not-found/AuthNotFound";
import Success from "./pages/root/common/Success";
import Cancel from "./pages/root/common/Cancel";
import AdminDashboard from "./pages/root/admin/AdminDashboard";
import InstructorDashboard from "./pages/root/instructor/InstructorDashboard";
import InstructorLayout from "./components/layout/InstructorLayout";
import CreateCourse from "./components/instructor/dashboard/CreateCourse";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    loader: rootLoader,
    shouldRevalidate: ({ currentUrl, nextUrl }) => {
      return false;
    },
    children: [
      {
        path: "/auth",
        element: <AuthLayout />,
        errorElement: <AuthNotFound />,
        children: [
          { path: "signin", element: <SignIn /> },
          { path: "signup", element: <SignUp /> },
          { path: "verify-email", element: <VerifyOtp /> },
          { path: "*", element: <AuthNotFound /> },
        ],
      },
      {
        path: "/",
        element: <MainLayout />,
        errorElement: <NotFound />,
        children: [
          { index: true, element: <Home /> },
          { path: "courses", element: <Courses /> },
          { path: "course/:courseId", element: <CourseDetail /> },
          { path: "cart", element: <Cart /> },
          {
            element: <ProtectedLayout />,
            children: [
              { path: "my-learning", element: <MyLearning /> },
              {
                path: "instructor",
                element: <InstructorLayout />,
                children: [
                  { path: "dashboard", element: <InstructorDashboard /> },
                  { path: "create-course", element: <CreateCourse /> },
                  { path: "edit-course/:courseId", element: <EditCourse /> },
                ],
              },
              {
                path: "my-profile",
                element: <Profile />,
                children: [
                  { index: true, element: <Profile /> },
                  { path: "edit", element: <EditProfile /> },
                ],
              },
              { path: "purchase-history", element: <PurchaseHistory /> },
              { path: "wishlist", element: <WishList /> },
              { path: "checkout/success", element: <Success /> },
              { path: "checkout/cancel", element: <Cancel /> },
              { path: "admin/dashboard", element: <AdminDashboard /> },
            ],
          },
          { path: "*", element: <NotFound /> },
        ],
      },
      {
        element: <ProtectedLayout />,
        errorElement: <NotFound />,
        children: [
          { path: "learn/:courseId/:lectureId", element: <VideoPlayer /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
