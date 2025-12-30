import { userAuthStore } from "@/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../ui/loading-spinner";
import { Ripple, TechOrbitDisplay } from "../ui/modern-animated-sign-in";
import { iconsArray } from "../shared/orbit-icons";
import { m } from "framer-motion";
import { GraduationCap, TrendingUp, Users } from "lucide-react";

const AuthLayout = () => {
  const { isAuthenticated, isCheckingAuth } = userAuthStore();

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  if (!isCheckingAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

        {/* Floating orbs */}
        <m.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        />
        <m.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
      </div>

      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8 md:py-0 relative z-10">
        <div className="w-full">
          <div className="grid lg:grid-cols-2 gap-4 sm:grid-cols-1">
            <m.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center w-full max-lg:hidden"
            >
              <Ripple mainCircleSize={100} className="bg-zinc-900 border" />
              <TechOrbitDisplay
                iconsArray={iconsArray}
                text="LearnHub"
                textClassName="bg-gradient-to-b from-primary to-secondary text-transparent bg-clip-text text-7xl font-semibold leading-none"
              />
            </m.span>
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
