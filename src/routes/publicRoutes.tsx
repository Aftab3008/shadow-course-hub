import MainLayout from "@/components/layout/MainLayout";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import NotFound from "@/pages/not-found/NotFound";
import Home from "@/pages/root/home/Home";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { LazyRoute } from "./LazyRoute";

const Courses = lazy(() => import("@/pages/root/courses/Courses"));
const CourseDetail = lazy(
  () => import("@/pages/root/courses/courseId/CourseDetail")
);
const Cart = lazy(() => import("@/pages/root/cart/Cart"));
const MyLearning = lazy(
  () => import("@/pages/root/users/my-learning/MyLearning")
);
const Profile = lazy(() => import("@/pages/root/users/Profile"));
const EditProfile = lazy(() => import("@/pages/root/users/EditProfile"));
const PurchaseHistory = lazy(
  () => import("@/pages/root/users/PurchaseHistory")
);
const WishList = lazy(() => import("@/pages/root/users/WishList"));
const Success = lazy(() => import("@/pages/root/common/Success"));
const Cancel = lazy(() => import("@/pages/root/common/Cancel"));

export const publicRoutes: RouteObject = {
  path: "/",
  element: <MainLayout />,
  errorElement: <NotFound />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "courses",
      element: (
        <LazyRoute>
          <Courses />
        </LazyRoute>
      ),
    },
    {
      path: "course/:courseName/:courseId",
      element: (
        <LazyRoute>
          <CourseDetail />
        </LazyRoute>
      ),
    },
    {
      path: "cart",
      element: (
        <LazyRoute>
          <Cart />
        </LazyRoute>
      ),
    },
    {
      element: <ProtectedLayout />,
      children: [
        {
          path: "my-learning",
          element: (
            <LazyRoute>
              <MyLearning />
            </LazyRoute>
          ),
        },
        {
          path: "my-profile",
          element: (
            <LazyRoute>
              <Profile />
            </LazyRoute>
          ),
          children: [
            {
              index: true,
              element: (
                <LazyRoute>
                  <Profile />
                </LazyRoute>
              ),
            },
            {
              path: "edit",
              element: (
                <LazyRoute>
                  <EditProfile />
                </LazyRoute>
              ),
            },
          ],
        },
        {
          path: "purchase-history",
          element: (
            <LazyRoute>
              <PurchaseHistory />
            </LazyRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <LazyRoute>
              <WishList />
            </LazyRoute>
          ),
        },
        {
          path: "checkout/success",
          element: (
            <LazyRoute>
              <Success />
            </LazyRoute>
          ),
        },
        {
          path: "checkout/cancel",
          element: (
            <LazyRoute>
              <Cancel />
            </LazyRoute>
          ),
        },
      ],
    },
    { path: "*", element: <NotFound /> },
  ],
};
