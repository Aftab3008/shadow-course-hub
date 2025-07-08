import AuthLayout from "@/components/Layout/AuthLayout";
import ProtectedLayout from "@/components/Layout/ProtectedLayout";
import RootLayout from "@/components/Layout/RootLayout";
import Cart from "@/pages/root/Cart";
import CourseDetail from "@/pages/root/CourseDetail";
import Courses from "@/pages/root/Courses";
import EditCourse from "@/pages/root/EditCourse";
import Home from "@/pages/root/Home";
import Instructor from "@/pages/root/Instructor";
import MyLearning from "@/pages/root/MyLearning";
import VideoPlayer from "@/pages/root/VideoPlayer";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import NotFound from "@/pages/not-found/NotFound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { VerifyOtp } from "./pages/auth/VerifyOtp";
import { rootLoader } from "./services/rootLoader";
import MainLayout from "./components/Layout/MainLayout";
import EditProfile from "./pages/root/EditProfile";
import Profile from "./pages/root/Profile";
import PurchaseHistory from "./pages/root/PurchaseHistory";
import WishList from "./pages/root/WishList";
import AuthNotFound from "./pages/not-found/AuthNotFound";

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
          { path: "course/:id", element: <CourseDetail /> },
          { path: "cart", element: <Cart /> },
          {
            element: <ProtectedLayout />,
            children: [
              { path: "my-learning", element: <MyLearning /> },
              { path: "instructor", element: <Instructor /> },
              { path: "instructor/edit-course/:id", element: <EditCourse /> },
              { path: "learn/:courseId/:lectureId", element: <VideoPlayer /> },
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
            ],
          },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
