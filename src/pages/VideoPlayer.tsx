
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import VideoPlayerComponent from "@/components/Video/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Play, CheckCircle, Lock, Menu, X } from "lucide-react";

const VideoPlayer = () => {
  const { courseId, lectureId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);

  // Get initial time from URL params
  const initialTime = parseInt(searchParams.get('t') || '0');

  // Mock course data
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
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            completed: true
          },
          { 
            id: 2, 
            title: "Setting up Development Environment", 
            duration: "20:45", 
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            completed: true
          },
          { 
            id: 3, 
            title: "Your First React Component", 
            duration: "18:20", 
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            completed: false,
            current: parseInt(lectureId) === 3
          },
          { 
            id: 4, 
            title: "Understanding JSX", 
            duration: "22:15", 
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            completed: false
          }
        ]
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
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            completed: false
          },
          { 
            id: 6, 
            title: "Props and PropTypes", 
            duration: "28:45", 
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            completed: false
          }
        ]
      }
    ]
  };

  // Find current lecture
  const currentLecture = course.curriculum
    .flatMap(section => section.lectures)
    .find(lecture => lecture.id === parseInt(lectureId || '1'));

  const allLectures = course.curriculum.flatMap(section => section.lectures);
  const currentIndex = allLectures.findIndex(lecture => lecture.id === parseInt(lectureId || '1'));
  const nextLecture = allLectures[currentIndex + 1];
  const prevLecture = allLectures[currentIndex - 1];

  const handleTimeUpdate = (time: number, duration: number) => {
    setCurrentTime(time);
    // Update URL with current time (like YouTube)
    const timeInSeconds = Math.floor(time);
    setSearchParams({ t: timeInSeconds.toString() });
  };

  const navigateToLecture = (newLectureId: number) => {
    navigate(`/learn/${courseId}/${newLectureId}`);
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

  if (!currentLecture) {
    return <div>Lecture not found</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(`/course/${courseId}`)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-semibold text-foreground truncate max-w-md">{course.title}</h1>
              <p className="text-sm text-muted-foreground">
                Lecture {currentIndex + 1} of {allLectures.length}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Progress: {course.progress}%</span>
              <Progress value={course.progress} className="w-32" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSidebar(!showSidebar)}
              className="md:hidden"
            >
              {showSidebar ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-5xl">
              <VideoPlayerComponent
                src={currentLecture.videoUrl}
                onTimeUpdate={handleTimeUpdate}
                initialTime={initialTime}
              />
            </div>
          </div>

          {/* Video Controls */}
          <div className="border-t border-border bg-background p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">
                  {currentLecture.title}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Duration: {currentLecture.duration}</span>
                  <Badge variant="outline">{currentLecture.type}</Badge>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={!prevLecture}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!nextLecture}
                >
                  {nextLecture ? 'Next Lecture' : 'Course Complete'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content Sidebar */}
        <div className={`${showSidebar ? 'w-full md:w-96' : 'w-0'} ${showSidebar ? 'block' : 'hidden'} md:block border-l border-border bg-muted transition-all duration-300 overflow-hidden`}>
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground mb-2">Course Content</h3>
            <div className="text-sm text-muted-foreground">
              {allLectures.filter(l => l.completed).length} of {allLectures.length} lectures completed
            </div>
            <Progress 
              value={(allLectures.filter(l => l.completed).length / allLectures.length) * 100} 
              className="mt-2" 
            />
          </div>

          <ScrollArea className="flex-1 h-[calc(100vh-12rem)]">
            <div className="p-4">
              <Accordion type="multiple" defaultValue={["section-1", "section-2"]} className="w-full">
                {course.curriculum.map((section) => (
                  <AccordionItem key={section.id} value={`section-${section.id}`} className="border-border">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex justify-between items-center w-full mr-4">
                        <span className="font-medium text-foreground text-left">{section.title}</span>
                        <span className="text-sm text-muted-foreground">
                          {section.lectures.filter(l => l.completed).length}/{section.lectures.length}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-1 pt-2">
                        {section.lectures.map((lecture) => {
                          const isCurrent = lecture.id === parseInt(lectureId || '1');
                          const isAccessible = lecture.completed || isCurrent || 
                            (currentIndex >= allLectures.findIndex(l => l.id === lecture.id));

                          return (
                            <Card 
                              key={lecture.id} 
                              className={`cursor-pointer transition-all duration-200 ${
                                isCurrent 
                                  ? 'border-primary bg-primary/10' 
                                  : 'border-border hover:bg-accent'
                              } ${!isAccessible ? 'opacity-50' : ''}`}
                              onClick={() => isAccessible && navigateToLecture(lecture.id)}
                            >
                              <CardContent className="p-3">
                                <div className="flex items-center space-x-3">
                                  <div className="flex-shrink-0">
                                    {lecture.completed ? (
                                      <CheckCircle className="h-5 w-5 text-green-500" />
                                    ) : isCurrent ? (
                                      <Play className="h-5 w-5 text-primary" />
                                    ) : !isAccessible ? (
                                      <Lock className="h-5 w-5 text-muted-foreground" />
                                    ) : (
                                      <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                                    )}
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium truncate ${
                                      isCurrent ? 'text-primary' : 'text-foreground'
                                    }`}>
                                      {lecture.title}
                                    </p>
                                    <div className="flex items-center justify-between mt-1">
                                      <span className="text-xs text-muted-foreground">
                                        {lecture.duration}
                                      </span>
                                      {lecture.type === 'video' && (
                                        <Badge variant="outline" className="text-xs">
                                          Video
                                        </Badge>
                                      )}
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
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
