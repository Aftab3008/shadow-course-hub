import AuthLayout from "@/components/layout/AuthLayout";
import AuthNotFound from "@/pages/not-found/AuthNotFound";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { LazyRoute } from "./LazyRoute";

const SignIn = lazy(() => import("@/pages/auth/SignIn"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));
const VerifyOtp = lazy(() =>
  import("@/pages/auth/VerifyOtp").then((m) => ({ default: m.VerifyOtp }))
);

export const authRoutes: RouteObject = {
  path: "/auth",
  element: <AuthLayout />,
  errorElement: <AuthNotFound />,
  children: [
    {
      path: "signin",
      element: (
        <LazyRoute>
          <SignIn />
        </LazyRoute>
      ),
    },
    {
      path: "signup",
      element: (
        <LazyRoute>
          <SignUp />
        </LazyRoute>
      ),
    },
    {
      path: "verify-email",
      element: (
        <LazyRoute>
          <VerifyOtp />
        </LazyRoute>
      ),
    },
    { path: "*", element: <AuthNotFound /> },
  ],
};
