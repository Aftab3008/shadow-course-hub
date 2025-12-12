import AuthLayout from "@/components/layout/AuthLayout";
import EnrollmentGuard from "@/components/layout/EnrollmentGuard";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import RootLayout from "@/components/layout/RootLayout";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import NotFound from "@/pages/not-found/NotFound";
import Cart from "@/pages/root/cart/Cart";
import CourseDetail from "@/pages/root/courses/courseId/CourseDetail";
import Courses from "@/pages/root/courses/Courses";
import Home from "@/pages/root/home/Home";
import EditCourse from "@/pages/root/instructor/edit-course/EditCourse";
import CourseContent from "@/pages/root/users/my-learning/courseLearning/CourseContent";
import MyLearning from "@/pages/root/users/my-learning/MyLearning";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateCourse from "./components/instructor/dashboard/CreateCourse";
import AdminLayout from "./components/layout/AdminLayout";
import InstructorLayout from "./components/layout/InstructorLayout";
import MainLayout from "./components/layout/MainLayout";
import { VerifyOtp } from "./pages/auth/VerifyOtp";
import AdminNotFound from "./pages/not-found/AdminNotFound";
import AuthNotFound from "./pages/not-found/AuthNotFound";
import AdminDashboard from "./pages/root/admin/AdminDashboard";
import Cancel from "./pages/root/common/Cancel";
import Success from "./pages/root/common/Success";
import InstructorDashboard from "./pages/root/instructor/InstructorDashboard";
import EditProfile from "./pages/root/users/EditProfile";
import Profile from "./pages/root/users/Profile";
import PurchaseHistory from "./pages/root/users/PurchaseHistory";
import WishList from "./pages/root/users/WishList";
import { rootLoader } from "./services/rootLoader";
import CourseLearningLayout from "./components/layout/CourseLearningLayout";
import LessonPlayer from "./pages/root/users/my-learning/courseLearning/LessonPlayer";

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
          { path: "course/:courseName/:courseId", element: <CourseDetail /> },
          { path: "cart", element: <Cart /> },
          {
            element: <ProtectedLayout />,
            children: [
              { path: "my-learning", element: <MyLearning /> },
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
            ],
          },
          { path: "*", element: <NotFound /> },
        ],
      },
      {
        element: <AdminLayout />,
        path: "/admin",
        errorElement: <AdminNotFound />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "*", element: <AdminNotFound /> },
        ],
      },
      {
        element: <InstructorLayout />,
        path: "/instructor",
        errorElement: <NotFound />,
        children: [
          { path: "dashboard", element: <InstructorDashboard /> },
          { path: "create-course", element: <CreateCourse /> },
          { path: "edit-course/:courseId", element: <EditCourse /> },
          { path: "*", element: <NotFound /> },
        ],
      },
      {
        element: <ProtectedLayout />,
        errorElement: <NotFound />,
        children: [
          {
            element: <EnrollmentGuard />,
            children: [
              // {
              //   path: "/my-learning/:courseName/:courseId/learn/:sectionName/:sectionId/:lessonId",
              //   element: <CourseContent />,
              // },
              {
                path: "/my-learning/:courseName/:courseId/learn",
                element: <CourseLearningLayout />,
                children: [
                  {
                    path: ":sectionName/:sectionId/:lessonId",
                    element: <LessonPlayer />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
