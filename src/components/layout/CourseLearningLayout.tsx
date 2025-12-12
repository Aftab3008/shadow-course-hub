import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SideCard from "@/components/user/my-learning/video/SideCard";
import { UserEnrollment } from "@/types/learning";
import { ArrowLeft } from "lucide-react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";

export default function CourseLearningLayout() {
  const {
    enrollmentData: { enrollment },
  } = useOutletContext<{
    enrollmentData: { enrollment: UserEnrollment };
  }>();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background w-full">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto px-4 py-3 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/my-learning")}
                className="hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="min-w-0 flex-1">
                <h1 className="font-semibold text-lg text-foreground truncate">
                  {enrollment.course.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3">
            <Outlet context={{ enrollment }} />
          </div>

          <div className="xl:col-span-1">
            <SideCard
              course={enrollment.course}
              lessonProgress={enrollment.lessonProgress}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
