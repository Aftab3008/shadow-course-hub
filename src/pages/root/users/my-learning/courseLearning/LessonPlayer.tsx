import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VideoPlayer from "@/components/user/my-learning/video/VideoPlayer";
import { UserEnrollment } from "@/types/learning";
import { CheckCircle, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

export default function LessonPlayer() {
  const { enrollment } = useOutletContext<{ enrollment: UserEnrollment }>();
  const { lessonId, courseId, courseName } = useParams();
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Find current lesson from enrollment data
  const currentLesson = enrollment.course.sections
    .flatMap((s) => s.lessons)
    .find((l) => l.id === lessonId);

  // Get all lessons for navigation
  const allLessons = enrollment.course.sections.flatMap((s) => s.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const nextLesson = allLessons[currentIndex + 1];
  const prevLesson = allLessons[currentIndex - 1];

  // Check if lesson is completed
  const isCompleted = enrollment.lessonProgress.some(
    (lp) => lp.lessonId === lessonId && lp.isCompleted
  );

  // Fetch signed video URL only when lessonId changes
  useEffect(() => {
    const fetchVideoUrl = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with your API call to get time-limited signed URL
        // const response = await fetch(`/api/lessons/${lessonId}/video-url`);
        // const { url } = await response.json();
        // setVideoUrl(url);

        // For now, using the URL from lesson data
        setVideoUrl("/assets/output/master.m3u8");
      } catch (error) {
        console.error("Failed to fetch video URL:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (lessonId) {
      fetchVideoUrl();
    }
  }, [lessonId]);

  const navigateToLesson = (lesson: typeof currentLesson) => {
    if (!lesson) return;

    // Find section containing this lesson
    const section = enrollment.course.sections.find((s) =>
      s.lessons.some((l) => l.id === lesson.id)
    );

    if (section) {
      navigate(
        `/my-learning/${courseName}/${courseId}/learn/${section.title}/${section.id}/${lesson.id}`
      );
    }
  };

  const handleNext = () => nextLesson && navigateToLesson(nextLesson);
  const handlePrevious = () => prevLesson && navigateToLesson(prevLesson);

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
    <div className="space-y-6">
      {/* Video Player */}
      <Card className="overflow-hidden border-0 shadow-lg bg-black">
        <div className="video-player-container aspect-video bg-black rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-white">Loading video...</div>
            </div>
          ) : (
            <VideoPlayer
              src={videoUrl}
              title={currentLesson.title}
              // Add your video player props here
            />
          )}
        </div>
      </Card>

      {/* Lesson Info Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl sm:text-2xl font-bold leading-tight">
                {currentLesson.title}
              </CardTitle>
              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{currentLesson.duration}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Video
                </Badge>
                {isCompleted && (
                  <Badge variant="default" className="text-xs bg-green-500">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={!prevLesson}
                className="hidden sm:inline-flex"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button
                size="sm"
                onClick={handleNext}
                disabled={!nextLesson}
                className="min-w-[120px]"
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

      {/* Mobile Navigation */}
      <div className="flex sm:hidden space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={!prevLesson}
          className="flex-1"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>
        <Button
          size="sm"
          onClick={handleNext}
          disabled={!nextLesson}
          className="flex-1"
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
      </div>
    </div>
  );
}
