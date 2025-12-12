import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Lock,
  Play,
} from "lucide-react";
import VideoPlayer from "./VideoPlayer";

interface VideoComponentProps {
  title: string;
  videoUrl: string;
  duration: string;
  isCompleted: boolean;
  type: string;
  lectureId: string;
  courseId: string;
  curriculum: {
    id: number;
    title: string;
    lectures: {
      id: number;
      title: string;
      duration: string;
      videoUrl: string;
      completed: boolean;
    }[];
  }[];
  allLectures: {
    id: number;
    title: string;
    duration: string;
    completed: boolean;
  }[];
  handlePrevious: () => void;
  handleNext: () => void;
  prevLecture?: boolean;
  nextLecture?: boolean;
  navigateToLecture: (lectureId: number) => void;
}

export default function VideoComponent({
  title,
  videoUrl,
  duration,
  isCompleted,
  curriculum,
  lectureId,
  courseId,
  type,
  prevLecture,
  nextLecture,
  allLectures,
  handlePrevious,
  handleNext,
  navigateToLecture,
}: VideoComponentProps) {
  return (
    <div className="w-full mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-6">
          <Card className="overflow-hidden border-0 shadow-lg bg-black">
            <div className="video-player-container aspect-video bg-black rounded-lg overflow-hidden">
              <VideoPlayer
                src={videoUrl}
                title={title}
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
                    {title}
                  </CardTitle>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{duration}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {type}
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

        <div className="xl:col-span-1">
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
                    {curriculum.map((section) => (
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
                                lecture.id === parseInt(lectureId || "1");
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
        </div>
      </div>
    </div>
  );
}
