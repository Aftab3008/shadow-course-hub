// Example: Updated Video Page Component with Enrollment Protection
// This shows how to integrate the security features into your existing video page

import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEnrollmentCheck } from "@/hooks/Enrollment";
import {
  getVideoStreamUrl,
  fetchEnrolledCourseContent,
} from "@/services/courses.services";
import { progressService } from "@/services/progressService";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Example: Secure Video Page Implementation
 *
 * This component demonstrates how to:
 * 1. Verify enrollment (already handled by EnrollmentGuard)
 * 2. Fetch secure video streaming URL
 * 3. Track video progress
 * 4. Handle URL expiration
 * 5. Show locked lessons for non-preview content
 */

export default function SecureVideoExample() {
  const { courseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);

  // State
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [urlExpiry, setUrlExpiry] = useState<number>(0);
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);
  const [courseData, setCourseData] = useState<any>(null);
  const [currentLesson, setCurrentLesson] = useState<any>(null);

  // Enrollment is already verified by EnrollmentGuard wrapper
  // But we can still access enrollment data if needed
  const { data: enrollmentData } = useEnrollmentCheck(courseId || "");

  // Load course content (only accessible to enrolled users)
  useEffect(() => {
    if (!courseId) return;

    fetchEnrolledCourseContent(courseId)
      .then((response) => {
        setCourseData(response.data);

        // Find current lesson
        const lesson = response.data?.sections
          .flatMap((s: any) => s.lessons)
          .find((l: any) => l.id === lessonId);

        setCurrentLesson(lesson);
      })
      .catch((error) => {
        console.error("Failed to load course content:", error);
        toast({
          title: "Error",
          description: "Failed to load course content",
          variant: "destructive",
        });
      });
  }, [courseId, lessonId, toast]);

  // Load secure video URL
  useEffect(() => {
    if (!courseId || !lessonId) return;

    async function loadSecureVideo() {
      setIsLoadingVideo(true);
      try {
        // Get time-limited signed URL from backend
        const { videoUrl, expiresAt, expiresIn } = await getVideoStreamUrl(
          courseId,
          lessonId
        );

        setVideoUrl(videoUrl);
        setUrlExpiry(expiresAt);

        // Schedule URL refresh 5 minutes before expiration
        const refreshTime = Math.max(expiresIn * 1000 - 300000, 60000);
        setTimeout(() => {
          console.log("Refreshing video URL...");
          loadSecureVideo();
        }, refreshTime);

        setIsLoadingVideo(false);
      } catch (error: any) {
        console.error("Failed to load video:", error);
        setIsLoadingVideo(false);

        if (error.status === 403) {
          toast({
            title: "Access Denied",
            description: "You don't have permission to view this video",
            variant: "destructive",
          });
          navigate(`/course/${courseId}`);
        } else {
          toast({
            title: "Video Loading Error",
            description: "Unable to load video. Please try again.",
            variant: "destructive",
          });
        }
      }
    }

    loadSecureVideo();
  }, [courseId, lessonId, navigate, toast]);

  // Load saved progress on mount
  useEffect(() => {
    if (!courseId || !lessonId || !videoRef.current) return;

    progressService.getProgress(courseId, lessonId).then((savedTime) => {
      if (videoRef.current && savedTime > 5) {
        // Only restore if more than 5 seconds watched
        videoRef.current.currentTime = savedTime;

        toast({
          title: "Welcome back!",
          description: `Resuming from ${Math.floor(savedTime / 60)}:${String(
            Math.floor(savedTime % 60)
          ).padStart(2, "0")}`,
        });
      }
    });
  }, [courseId, lessonId, videoUrl, toast]);

  // Auto-save progress every 5 seconds
  useEffect(() => {
    if (!courseId || !lessonId || !videoRef.current) return;

    const interval = setInterval(() => {
      if (videoRef.current && !videoRef.current.paused) {
        const currentTime = videoRef.current.currentTime;
        const duration = videoRef.current.duration;

        progressService.saveProgress(
          courseId,
          lessonId,
          currentTime,
          duration,
          false // Not completed yet
        );
      }
    }, 5000); // Save every 5 seconds

    return () => clearInterval(interval);
  }, [courseId, lessonId, videoUrl]);

  // Handle video completion
  const handleVideoEnd = () => {
    if (!courseId || !lessonId || !videoRef.current) return;

    const duration = videoRef.current.duration;

    // Mark as complete
    progressService.saveProgress(
      courseId,
      lessonId,
      duration,
      duration,
      true // Completed
    );

    progressService.markLessonComplete(courseId, lessonId);

    toast({
      title: "Lesson Complete! 🎉",
      description: "Great job! Ready for the next lesson?",
    });

    // Auto-advance to next lesson (optional)
    // navigateToNextLesson();
  };

  // Handle video errors
  const handleVideoError = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    console.error("Video playback error:", e);

    toast({
      title: "Playback Error",
      description: "There was an issue playing the video. Refreshing...",
      variant: "destructive",
    });

    // Try to reload the video URL
    if (courseId && lessonId) {
      getVideoStreamUrl(courseId, lessonId)
        .then(({ videoUrl }) => setVideoUrl(videoUrl))
        .catch((err) => console.error("Failed to refresh video:", err));
    }
  };

  // Render loading state
  if (isLoadingVideo) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading video...</p>
        </div>
      </div>
    );
  }

  // Render error state (shouldn't happen if EnrollmentGuard works)
  if (!videoUrl) {
    return (
      <div className="container mx-auto flex h-screen items-center justify-center px-4">
        <div className="max-w-md text-center">
          <AlertCircle className="mx-auto mb-4 h-16 w-16 text-destructive" />
          <h2 className="mb-2 text-2xl font-bold">Video Unavailable</h2>
          <p className="mb-6 text-muted-foreground">
            We couldn't load the video. Please try again or contact support.
          </p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Video Player */}
      <div className="aspect-video w-full bg-black">
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          controlsList="nodownload" // Prevent downloads
          onEnded={handleVideoEnd}
          onError={handleVideoError}
          className="h-full w-full"
          autoPlay
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Lesson Info */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold">
            {currentLesson?.title || "Loading..."}
          </h1>
          <p className="text-muted-foreground">
            {currentLesson?.description || ""}
          </p>
        </div>

        {/* Course Curriculum */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Course Content</h2>

          {courseData?.sections.map((section: any) => (
            <div key={section.id} className="mb-4">
              <h3 className="mb-2 font-medium">{section.title}</h3>

              <div className="space-y-2">
                {section.lessons.map((lesson: any, index: number) => {
                  const isCurrentLesson = lesson.id === lessonId;
                  const isPreview = lesson.isPreview || index === 0;
                  const isLocked = !enrollmentData?.enrolled && !isPreview;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        if (!isLocked) {
                          navigate(
                            `/learn/${courseId}/${section.id}/${lesson.id}`
                          );
                        }
                      }}
                      disabled={isLocked}
                      className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors ${
                        isCurrentLesson
                          ? "bg-primary text-primary-foreground"
                          : isLocked
                          ? "cursor-not-allowed opacity-50"
                          : "hover:bg-muted"
                      }`}
                    >
                      {isLocked && <Lock className="h-4 w-4" />}
                      <div className="flex-1">
                        <p className="font-medium">{lesson.title}</p>
                        <p className="text-sm opacity-80">
                          {Math.floor(lesson.duration / 60)}:
                          {String(lesson.duration % 60).padStart(2, "0")}
                        </p>
                      </div>
                      {isPreview && (
                        <span className="rounded bg-green-500 px-2 py-1 text-xs text-white">
                          Preview
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * KEY SECURITY FEATURES IN THIS EXAMPLE:
 *
 * 1. ✅ Enrollment Verification
 *    - EnrollmentGuard wrapper checks enrollment before rendering
 *    - Component only renders for enrolled users
 *
 * 2. ✅ Secure Video URLs
 *    - Fetches time-limited signed URLs from backend
 *    - Auto-refreshes before expiration
 *    - URLs can't be shared or reused after expiry
 *
 * 3. ✅ Progress Tracking
 *    - Auto-saves every 5 seconds to server
 *    - Falls back to localStorage if server fails
 *    - Marks lesson complete when finished
 *
 * 4. ✅ Access Control UI
 *    - Shows locked icon for restricted lessons
 *    - Displays preview badge for free lessons
 *    - Prevents navigation to locked content
 *
 * 5. ✅ Error Handling
 *    - Graceful handling of video load errors
 *    - User-friendly error messages
 *    - Automatic retry mechanisms
 *
 * 6. ✅ Download Prevention
 *    - controlsList="nodownload" prevents browser download
 *    - Signed URLs make direct downloads useless (expire quickly)
 *    - Right-click protection can be added via CSS/JS
 *
 * USAGE:
 * This is just an example. Adapt the concepts to your existing Video component
 * by integrating:
 * - getVideoStreamUrl() for secure video loading
 * - progressService for progress tracking
 * - Enrollment checks for access control UI
 */
