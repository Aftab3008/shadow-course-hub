import InstructorLayout from "@/components/layout/InstructorLayout";
import NotFound from "@/pages/not-found/NotFound";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { LazyRoute } from "./LazyRoute";

const InstructorDashboard = lazy(
  () => import("@/pages/root/instructor/InstructorDashboard")
);
const CreateCourse = lazy(
  () => import("@/components/instructor/dashboard/CreateCourse")
);
const EditCourse = lazy(
  () => import("@/pages/root/instructor/edit-course/EditCourse")
);

export const instructorRoutes: RouteObject = {
  element: <InstructorLayout />,
  path: "/instructor",
  errorElement: <NotFound />,
  children: [
    {
      path: "dashboard",
      element: (
        <LazyRoute>
          <InstructorDashboard />
        </LazyRoute>
      ),
    },
    {
      path: "create-course",
      element: (
        <LazyRoute>
          <CreateCourse />
        </LazyRoute>
      ),
    },
    {
      path: "edit-course/:courseId",
      element: (
        <LazyRoute>
          <EditCourse />
        </LazyRoute>
      ),
    },
    { path: "*", element: <NotFound /> },
  ],
};
