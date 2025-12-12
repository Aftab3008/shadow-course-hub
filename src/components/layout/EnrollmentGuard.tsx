import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useEnrollmentCheck } from "@/hooks/Enrollment";
import { AlertCircle, Lock, ShoppingCart } from "lucide-react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

/**
 * EnrollmentGuard - Protects video/learning routes by verifying user enrollment
 * This component should wrap any route that requires course enrollment
 */
export default function EnrollmentGuard() {
  console.log("EnrollmentGuard rendered");
  const { courseId } = useParams<{ courseId: string }>();
  console.log("courseId:", courseId);
  const navigate = useNavigate();

  const {
    data: enrollmentData,
    isLoading,
    isError,
    error,
  } = useEnrollmentCheck(courseId);

  //   useEffect(() => {
  //     // If we have enrollment data and user is not enrolled, show toast
  //     if (enrollmentData && !enrollmentData.enrolled && courseId) {
  //       toast({
  //         title: "Access Denied",
  //         description: "You need to purchase this course to access its content.",
  //         variant: "destructive",
  //       });
  //     }
  //   }, [enrollmentData, courseId, toast]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Error state (API error, not enrollment failure)
  if (isError && error) {
    return (
      <div className="container mx-auto flex h-screen items-center justify-center px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Verification Error</AlertTitle>
          <AlertDescription>
            Unable to verify your enrollment. Please try again later.
          </AlertDescription>
          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={() => navigate("/")}
          >
            Return Home
          </Button>
        </Alert>
      </div>
    );
  }

  // Not enrolled - show access denied
  if (enrollmentData && !enrollmentData.isEnrolled) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-destructive/10 p-6">
              <Lock className="h-16 w-16 text-destructive" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-bold">Access Restricted</h1>
          <p className="mb-6 text-muted-foreground">
            You need to purchase this course to access its content. Enroll now
            to start learning!
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              onClick={() => navigate(`/course/${courseId}`)}
              size="lg"
              className="gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              View Course Details
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/courses")}
              size="lg"
            >
              Browse Courses
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Already purchased?{" "}
            <button
              onClick={() => window.location.reload()}
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              Refresh page
            </button>
          </p>
        </div>
      </div>
    );
  }

  return <Outlet context={{ enrollmentData }} />;
}
