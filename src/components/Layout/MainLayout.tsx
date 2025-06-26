import { userAuthStore } from "@/store/auth.store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "../ui/loading-spinner";

export default function MainLayout() {
  const { checkAuth, isCheckingAuth } = userAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <main>
      <Outlet />
    </main>
  );
}
