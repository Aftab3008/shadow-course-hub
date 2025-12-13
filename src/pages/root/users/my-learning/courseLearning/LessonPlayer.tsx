import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VideoPlayer from "@/components/user/my-learning/video/VideoPlayer";
import { UserEnrollment } from "@/types/learning";
import { formatDuration } from "@/utils/utils";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Play,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function LessonPlayer() {
  const { enrollment } = useOutletContext<{ enrollment: UserEnrollment }>();
  const { lessonId, courseId, courseName } = useParams();
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const allLessons = useMemo(
    () => enrollment.course.sections.flatMap((s) => s.lessons),
    [enrollment.course.sections]
  );

  const currentLesson = useMemo(
    () => allLessons.find((l) => l.id === lessonId),
    [allLessons, lessonId]
  );

  const currentIndex = useMemo(
    () => allLessons.findIndex((l) => l.id === lessonId),
    [allLessons, lessonId]
  );

  const nextLesson = useMemo(
    () => (currentIndex >= 0 ? allLessons[currentIndex + 1] : undefined),
    [allLessons, currentIndex]
  );

  const prevLesson = useMemo(
    () => (currentIndex > 0 ? allLessons[currentIndex - 1] : undefined),
    [allLessons, currentIndex]
  );

  const isCompleted = useMemo(
    () =>
      enrollment.lessonProgress.some(
        (lp) => lp.lessonId === lessonId && lp.isCompleted
      ),
    [enrollment.lessonProgress, lessonId]
  );

  // Fetch signed video URL only when lessonId changes
  useEffect(() => {
    const fetchVideoUrl = async () => {
      setIsLoading(true);
      try {
        // Simulate API call for signed URL
        await new Promise((resolve) => setTimeout(resolve, 100));
        setVideoUrl(currentLesson?.videoUrl || "/assets/input.mp4");
      } catch (error) {
        console.error("Failed to fetch video URL:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (lessonId && currentLesson) {
      fetchVideoUrl();
    }
  }, [lessonId, currentLesson?.id, currentLesson?.videoUrl]);

  const navigateToLesson = useCallback(
    (lesson: typeof currentLesson) => {
      if (!lesson) return;

      // Find section containing this lesson
      const section = enrollment.course.sections.find((s) =>
        s.lessons.some((l) => l.id === lesson.id)
      );

      if (section) {
        navigate(
          `/my-learning/${courseName}/${courseId}/learn/${section.id}/${lesson.id}`
        );
      }
    },
    [enrollment.course.sections, navigate, courseName, courseId]
  );

  const handleNext = useCallback(
    () => nextLesson && navigateToLesson(nextLesson),
    [nextLesson, navigateToLesson]
  );

  const handlePrevious = useCallback(
    () => prevLesson && navigateToLesson(prevLesson),
    [prevLesson, navigateToLesson]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (!currentLesson) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Lesson not found</h2>
          <p className="text-muted-foreground">
            The requested lesson could not be found.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Video Player */}
      <motion.div variants={itemVariants}>
        <Card className="relative overflow-hidden border-border/50 shadow-2xl bg-gradient-to-br from-purple-500/5 to-indigo-500/5 group">
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div className="relative video-player-container aspect-video bg-black rounded-lg overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 animate-pulse">
                    <Play className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-white font-medium">Loading video...</div>
                </div>
              </div>
            ) : (
              <VideoPlayer
                key={lessonId}
                src={videoUrl}
                title={currentLesson.title}
              />
            )}
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-border/50 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-lg pointer-events-none" />

          <CardHeader className="pb-4 relative">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-xl sm:text-2xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                  {currentLesson.title}
                </CardTitle>
                <div className="flex items-center flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-secondary/50">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">
                      {formatDuration(currentLesson.duration)}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs px-2.5 py-1">
                    Video
                  </Badge>
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <Badge className="text-xs px-2.5 py-1 bg-gradient-to-r from-green-500 to-emerald-500 border-0">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={!prevLesson}
                  className="hidden sm:inline-flex hover:scale-105 transition-transform duration-200"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button
                  size="sm"
                  onClick={handleNext}
                  disabled={!nextLesson}
                  className="min-w-[120px] bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:scale-105 transition-transform duration-200"
                >
                  {nextLesson ? (
                    <>
                      Next Lesson
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </>
                  ) : (
                    "Course Complete"
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Mobile Navigation */}
      <motion.div variants={itemVariants} className="flex sm:hidden space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={!prevLesson}
          className="flex-1 hover:scale-105 transition-transform duration-200"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>
        <Button
          size="sm"
          onClick={handleNext}
          disabled={!nextLesson}
          className="flex-1 bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:scale-105 transition-transform duration-200"
        >
          {nextLesson ? (
            <>
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </>
          ) : (
            "Complete"
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}
