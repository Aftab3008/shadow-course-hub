import { userAuthStore } from "@/store/auth.store";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingSpinner from "../ui/loading-spinner";

export default function ProtectedLayout() {
  const { isAuthenticated, isCheckingAuth } = userAuthStore();
  const location = useLocation();

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
