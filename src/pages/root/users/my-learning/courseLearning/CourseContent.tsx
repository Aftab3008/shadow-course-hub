import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import SideCard from "@/components/user/my-learning/video/SideCard";
import VideoPlayer from "@/components/user/my-learning/video/VideoPlayer";
import { progressService } from "@/services/progressService";
import { UserEnrollment } from "@/types/learning";
import {
  ArrowLeft,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

const masterUrl = "/assets/output/master.m3u8";

const CourseContent = () => {
  const {
    enrollmentData: { enrollment },
  } = useOutletContext<{
    enrollmentData?: { enrollment: UserEnrollment };
  }>();

  console.log("enrollmentData in Video page:", enrollment);
  const { courseId, sectionId } = useParams();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const currentTimeRef = useRef(0);
  const course = {
    id: courseId,
    title: "Complete React Development Bootcamp 2024",
    totalLectures: 156,
    duration: "42h 30m",
    progress: 45,
    curriculum: [
      {
        id: 1,
        title: "Introduction to React",
        duration: "2h 30m",
        lectures: [
          {
            id: 1,
            title: "What is React?",
            duration: "15:30",
            type: "video",
            videoUrl:
              "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
            completed: true,
          },
          {
            id: 2,
            title: "Setting up Development Environment",
            duration: "20:45",
            type: "video",
            videoUrl:
              "https://ik.imagekit.io/fniz1wfsz/courses/688233a72a2de0f3974619c1/sections/68823ecd0deb9850b22ec4ab/lessons/1753458153539-test_ZL3DPy0mnl.mp4/ik-master.m3u8?tr=sr-240_360_480_720_1080",
            completed: true,
          },
          {
            id: 3,
            title: "Your First React Component",
            duration: "18:20",
            type: "video",
            videoUrl: masterUrl,
            completed: false,
            current: parseInt(sectionId) === 3,
          },
          {
            id: 4,
            title: "Understanding JSX",
            duration: "22:15",
            type: "video",
            videoUrl:
              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            completed: false,
          },
        ],
      },
      {
        id: 2,
        title: "React Components and Props",
        duration: "3h 15m",
        lectures: [
          {
            id: 5,
            title: "Functional vs Class Components",
            duration: "25:30",
            type: "video",
            videoUrl:
              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            completed: false,
          },
          {
            id: 6,
            title: "Props and PropTypes",
            duration: "28:45",
            type: "video",
            videoUrl:
              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            completed: false,
          },
        ],
      },
    ],
  };

  const currentLecture = course.curriculum
    .flatMap((section) => section.lectures)
    .find((lecture) => lecture.id === parseInt(sectionId || "1"));

  const allLectures = course.curriculum.flatMap((section) => section.lectures);
  const currentIndex = allLectures.findIndex(
    (lecture) => lecture.id === parseInt(sectionId || "1")
  );
  const nextLecture = allLectures[currentIndex + 1];
  const prevLecture = allLectures[currentIndex - 1];

  useEffect(() => {
    const loadProgress = async () => {
      if (courseId && sectionId) {
        const savedTime = await progressService.getProgress(
          courseId,
          sectionId
        );
        setInitialTime(savedTime);
      }
    };
    loadProgress();
  }, [courseId, sectionId]);

  const handleTimeUpdate = (time: number, duration: number) => {
    setCurrentTime(time);
    currentTimeRef.current = time;
  };

  const handleVideoEnded = () => {
    if (nextLecture) {
      navigateToLecture(nextLecture.id);
    }
  };

  const saveProgressAndNavigate = async (path: string) => {
    if (courseId && sectionId && currentTimeRef.current > 0) {
      await progressService.saveProgress(
        courseId,
        sectionId,
        currentTimeRef.current
      );
    }
    navigate(path);
  };

  const navigateToLecture = async (newLectureId: number) => {
    if (courseId && sectionId && currentTimeRef.current > 0) {
      await progressService.saveProgress(
        courseId,
        sectionId,
        currentTimeRef.current
      );
    }
    navigate(`/learn/${courseId}/${sectionId}`);
  };

  const handleNext = () => {
    if (nextLecture) {
      navigateToLecture(nextLecture.id);
    }
  };

  const handlePrevious = () => {
    if (prevLecture) {
      navigateToLecture(prevLecture.id);
    }
  };

  const handleBackButton = () => {
    saveProgressAndNavigate(`/course/${courseId}`);
  };

  if (!currentLecture) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Lecture not found</h2>
            <p className="text-muted-foreground mb-4">
              The requested lecture could not be found.
            </p>
            <Button onClick={handleBackButton}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background w-full">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto px-4 py-3 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                // onClick={handleBackButton}
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
                {/* <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>
                    Lecture {currentIndex + 1} of {allLectures.length}
                  </span>
                  <span>•</span>
                  <span>{formatDuration(enrollment.course.duration)}</span>
                </div> */}
              </div>
            </div>

            {/* <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium">
                    Progress: {course.progress}%
                  </div>
                  <Progress
                    value={course.progress}
                    className="w-32 h-2 progress-bar"
                  />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </header>

      <div className="w-full mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 space-y-6">
            <Card className="overflow-hidden border-0 shadow-lg bg-black">
              <div className="video-player-container aspect-video bg-black rounded-lg overflow-hidden">
                <VideoPlayer
                  src={currentLecture.videoUrl}
                  title={currentLecture.title}
                  // onTimeUpdate={handleTimeUpdate}
                  // onEnded={handleVideoEnded}
                  // initialTime={initialTime}
                  // autoPlay={true}
                />
              </div>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-xl sm:text-2xl font-bold leading-tight">
                      {currentLecture.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{currentLecture.duration}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {currentLecture.type}
                      </Badge>
                      {currentLecture.completed && (
                        <Badge
                          variant="default"
                          className="text-xs bg-green-500"
                        >
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
                      disabled={!prevLecture}
                      className="hidden sm:inline-flex"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleNext}
                      disabled={!nextLecture}
                      className="min-w-[120px]"
                    >
                      {nextLecture ? (
                        <>
                          Next Lecture
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

            <div className="flex sm:hidden space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={!prevLecture}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button
                size="sm"
                onClick={handleNext}
                disabled={!nextLecture}
                className="flex-1"
              >
                {nextLecture ? (
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

          {/* <div className="xl:col-span-1">
            <Card className="h-fit">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">Course Content</CardTitle>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>
                      {allLectures.filter((l) => l.completed).length} of{" "}
                      {allLectures.length} lectures completed
                    </span>
                  </div>
                  <Progress
                    value={
                      (allLectures.filter((l) => l.completed).length /
                        allLectures.length) *
                      100
                    }
                    className="h-2 progress-bar"
                  />
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <ScrollArea className="h-[60vh] xl:h-[70vh] course-content-scroll">
                  <div className="p-6 pt-0">
                    <Accordion
                      type="multiple"
                      defaultValue={["section-1", "section-2"]}
                      className="w-full"
                    >
                      {course.curriculum.map((section) => (
                        <AccordionItem
                          key={section.id}
                          value={`section-${section.id}`}
                          className="border-border"
                        >
                          <AccordionTrigger className="hover:no-underline py-3">
                            <div className="flex justify-between items-center w-full mr-4">
                              <span className="font-medium text-foreground text-left text-sm">
                                {section.title}
                              </span>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-muted-foreground">
                                  {
                                    section.lectures.filter((l) => l.completed)
                                      .length
                                  }
                                  /{section.lectures.length}
                                </span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 pt-2">
                              {section.lectures.map((lecture) => {
                                const isCurrent =
                                  lecture.id === parseInt(sectionId);
                                const isAccessible =
                                  lecture.completed ||
                                  isCurrent ||
                                  currentIndex >=
                                    allLectures.findIndex(
                                      (l) => l.id === lecture.id
                                    );

                                return (
                                  <Card
                                    key={lecture.id}
                                    className={`lecture-card cursor-pointer transition-all duration-200 hover:shadow-md ${
                                      isCurrent
                                        ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                                        : "border-border hover:bg-accent/50 hover:border-accent"
                                    } ${
                                      !isAccessible
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      isAccessible &&
                                      navigateToLecture(lecture.id)
                                    }
                                  >
                                    <CardContent className="p-3">
                                      <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 mt-0.5">
                                          {lecture.completed ? (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                          ) : isCurrent ? (
                                            <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                                              <Play className="h-2 w-2 text-primary-foreground fill-current" />
                                            </div>
                                          ) : !isAccessible ? (
                                            <Lock className="h-4 w-4 text-muted-foreground" />
                                          ) : (
                                            <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                                          )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                          <p
                                            className={`text-sm font-medium line-clamp-2 leading-snug ${
                                              isCurrent
                                                ? "text-primary"
                                                : "text-foreground"
                                            }`}
                                          >
                                            {lecture.title}
                                          </p>
                                          <div className="flex items-center justify-between mt-2">
                                            <span className="text-xs text-muted-foreground">
                                              {lecture.duration}
                                            </span>
                                            <Badge
                                              variant="outline"
                                              className="text-xs h-5 px-2"
                                            >
                                              Video
                                            </Badge>
                                          </div>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                );
                              })}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div> */}

          <SideCard
            course={enrollment.course}
            lessonProgress={enrollment.lessonProgress}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
