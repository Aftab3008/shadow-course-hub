import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { userAuthStore } from "@/store/auth.store";

import RootLayout from "@/components/Layout/RootLayout";
import AuthLayout from "@/components/Layout/AuthLayout";
import ProtectedLayout from "@/components/Layout/ProtectedLayout";

import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import MyLearning from "@/pages/MyLearning";
import Instructor from "@/pages/Instructor";
import EditCourse from "@/pages/EditCourse";
import VideoPlayer from "@/pages/VideoPlayer";
import NotFound from "@/pages/not-found/NotFound";
import { rootLoader } from "./services/rootLoader";
import { VerifyOtp } from "./pages/auth/VerifyOtp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: rootLoader,
    children: [
      { index: true, element: <Home /> },
      { path: "courses", element: <Courses /> },
      { path: "course/:id", element: <CourseDetail /> },
      {
        element: <AuthLayout />,
        children: [
          { path: "signin", element: <SignIn /> },
          { path: "signup", element: <SignUp /> },
          { path: "/verify-email", element: <VerifyOtp /> },
        ],
      },
      {
        element: <ProtectedLayout />,
        children: [
          { path: "my-learning", element: <MyLearning /> },
          { path: "instructor", element: <Instructor /> },
          { path: "instructor/edit-course/:id", element: <EditCourse /> },
          { path: "learn/:courseId/:lectureId", element: <VideoPlayer /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
