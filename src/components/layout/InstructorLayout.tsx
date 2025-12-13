import { Navigate, Outlet } from "react-router-dom";
import InstructorNavbar from "@/components/instructor/InstructorNavbar";
import { userAuthStore } from "@/store/auth.store";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";

/**
 * InstructorLayout - Protects instructor routes by verifying user has instructor role
 * Only users with isInstructor = true can access instructor dashboard and features
 */
export default function InstructorLayout() {
  const { user, isAuthenticated, isCheckingAuth } = userAuthStore();

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Check if user has instructor privileges
  if (!user?.isInstructor) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You don't have instructor privileges. This area is only accessible
            to approved instructors.
          </AlertDescription>
          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
            <Button
              variant="default"
              className="w-full"
              onClick={() => (window.location.href = "/")}
            >
              Home
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  // User is authenticated and has instructor role
  return (
    <div className="bg-background text-foreground min-h-screen">
      <InstructorNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
