import { userAuthStore } from "@/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../ui/loading-spinner";

export default function ProtectedLayout() {
  const { isAuthenticated, isCheckingAuth } = userAuthStore();

  if (!isCheckingAuth && !isAuthenticated) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <main>
      <Outlet />
    </main>
  );
}
