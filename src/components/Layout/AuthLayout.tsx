import { userAuthStore } from "@/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../ui/loading-spinner";

const AuthLayout = () => {
  const { isAuthenticated, isCheckingAuth } = userAuthStore();

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  if (!isCheckingAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8 md:py-0">
        <div className="w-full">
          <div className="grid md:grid-cols-2 gap-4 sm:grid-cols-1">
            <img
              src="/assets/default.jpg"
              alt="Auth Illustration"
              className="hidden md:block w-full h-full object-cover rounded-lg shadow-lg"
            />
            <div className="flex flex-col items-center justify-center p-6">
              <div className="max-w-md w-full">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
