import { userAuthStore } from "@/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../ui/loading-spinner";
import { Ripple, TechOrbitDisplay } from "../ui/modern-animated-sign-in";
import { iconsArray } from "../shared/orbit-icons";

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
          <div className="grid lg:grid-cols-2 gap-4 sm:grid-cols-1">
            <span className="flex flex-col justify-center w-full max-lg:hidden">
              <Ripple mainCircleSize={100} className="bg-zinc-900 border" />
              <TechOrbitDisplay
                iconsArray={iconsArray}
                text="LearnHub"
                textClassName="bg-gradient-to-b from-primary to-secondary text-transparent bg-clip-text text-7xl font-semibold leading-none"
              />
            </span>
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
