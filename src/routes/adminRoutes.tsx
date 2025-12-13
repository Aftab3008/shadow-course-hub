import AdminLayout from "@/components/layout/AdminLayout";
import AdminNotFound from "@/pages/not-found/AdminNotFound";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { LazyRoute } from "./LazyRoute";

const AdminDashboard = lazy(() => import("@/pages/root/admin/AdminDashboard"));

export const adminRoutes: RouteObject = {
  element: <AdminLayout />,
  path: "/admin",
  errorElement: <AdminNotFound />,
  children: [
    {
      index: true,
      element: (
        <LazyRoute>
          <AdminDashboard />
        </LazyRoute>
      ),
    },
    {
      path: "dashboard",
      element: (
        <LazyRoute>
          <AdminDashboard />
        </LazyRoute>
      ),
    },
    { path: "*", element: <AdminNotFound /> },
  ],
};
