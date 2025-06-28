import { userAuthStore } from "@/store/auth.store";
import { Link, Navigate, Outlet } from "react-router-dom";
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
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">
                L
              </span>
            </div>
            <span className="font-bold text-2xl text-foreground">LearnHub</span>
          </Link>
        </div> */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
