import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SideCard from "@/components/user/my-learning/video/SideCard";
import { UserEnrollment } from "@/types/learning";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { saveLastViewedLessonSync } from "@/services/progressService";
import { m } from "framer-motion";

export default function CourseLearningLayout() {
  const {
    enrollmentData: { enrollment },
  } = useOutletContext<{
    enrollmentData: { enrollment: UserEnrollment };
  }>();
  const navigate = useNavigate();

  const { courseId, courseName, lessonId, sectionId } = useParams<{
    courseId: string;
    courseName: string;
    lessonId: string;
    sectionId: string;
  }>();

  const progressDataRef = useRef({ courseId, sectionId, lessonId });

  useEffect(() => {
    progressDataRef.current = { courseId, sectionId, lessonId };
  }, [courseId, sectionId, lessonId]);

  useEffect(() => {
    return () => {
      const { courseId, sectionId, lessonId } = progressDataRef.current;
      if (courseId && sectionId && lessonId) {
        console.log("Saving last viewed lesson on unmount:", {
          courseId,
          sectionId,
          lessonId,
        });
        saveLastViewedLessonSync({ courseId, sectionId, lessonId });
      }
    };
  }, []);

  const handleBackClick = useCallback(() => {
    navigate("/my-learning");
  }, [navigate]);

  const courseProgress = useMemo(() => {
    const completedLessons = enrollment.lessonProgress?.length || 0;
    const totalLessons = enrollment.course.totalLessons || 0;
    return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  }, [enrollment.lessonProgress, enrollment.course.totalLessons]);

  return (
    <div className="min-h-screen bg-background w-full">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />

        <div className="relative mx-auto px-4 py-3 w-full">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackClick}
                className="hover:bg-primary/10 hover:scale-105 transition-all duration-200 shrink-0"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 shrink-0">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="font-semibold text-lg text-foreground truncate">
                  {enrollment.course.title}
                </h1>
              </div>
            </div>

            {/* Progress indicator - hidden on mobile */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Your Progress</p>
                <p className="text-sm font-semibold text-foreground">
                  {Math.round(courseProgress)}% Complete
                </p>
              </div>
              <div className="w-24 h-2 bg-secondary/30 rounded-full overflow-hidden">
                <m.div
                  initial={{ width: 0 }}
                  animate={{ width: `${courseProgress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                />
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
              courseId={courseId!}
              sectionId={sectionId!}
              courseName={courseName!}
              currentLessonId={lessonId!}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
