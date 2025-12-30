import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Course } from "@/types/course";
import { LessonProgressLearning } from "@/types/learning";

import { BookOpen, CheckCircle, Clock } from "lucide-react";
import SideSection from "./SideSection";
import { memo } from "react";
import { m } from "framer-motion";

interface SideCardProps {
  course: Partial<Course>;
  lessonProgress: Partial<LessonProgressLearning>[];
  courseId: string;
  sectionId: string;
  courseName: string;
  currentLessonId: string;
}

const SideCard = memo<SideCardProps>(
  function SideCard({
    course,
    lessonProgress,
    courseId,
    sectionId,
    courseName,
    currentLessonId,
  }) {
    const progressPercentage = course.totalLessons
      ? (lessonProgress.length / course.totalLessons) * 100
      : 0;
    const remainingLessons = (course.totalLessons || 0) - lessonProgress.length;

    return (
      <div className="xl:col-span-1">
        <Card className="h-fit border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-lg font-bold">
                Course Content
              </CardTitle>
            </div>

            {/* Progress Stats */}
            <div className="space-y-3 mt-4">
              <div className="grid grid-cols-2 gap-2">
                <m.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-xs font-medium text-muted-foreground">
                      Completed
                    </span>
                  </div>
                  <p className="text-xl font-bold text-foreground">
                    {lessonProgress.length}
                  </p>
                </m.div>

                <m.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-xs font-medium text-muted-foreground">
                      Remaining
                    </span>
                  </div>
                  <p className="text-xl font-bold text-foreground">
                    {remainingLessons}
                  </p>
                </m.div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground font-medium">
                    Your Progress
                  </span>
                  <span className="text-foreground font-bold">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <div className="relative h-2.5 bg-secondary/30 rounded-full overflow-hidden">
                  <m.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <ScrollArea className="h-[60vh] xl:h-[70vh] course-content-scroll">
              <div className="p-6 pt-0">
                <Accordion
                  type="multiple"
                  defaultValue={sectionId ? [`section-${sectionId}`] : []}
                  className="w-full"
                >
                  {course.sections.map((section) => {
                    const sectionProgress = section.lessons.filter((lesson) =>
                      lessonProgress.some((lp) => lp.lessonId === lesson.id)
                    ).length;
                    const sectionPercentage = section.lessons.length
                      ? (sectionProgress / section.lessons.length) * 100
                      : 0;

                    return (
                      <AccordionItem
                        key={section.id}
                        value={`section-${section.id}`}
                        className="border-border relative"
                      >
                        {/* Gradient side indicator */}
                        <div
                          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary rounded-r transition-opacity duration-200"
                          style={{ opacity: sectionPercentage / 100 }}
                        />

                        <AccordionTrigger className="hover:no-underline py-3 pl-4 hover:bg-accent/50 rounded-lg transition-colors duration-200">
                          <div className="flex justify-between items-center w-full mr-4">
                            <span className="font-semibold text-foreground text-left text-sm">
                              {section.title}
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-medium text-muted-foreground px-2 py-0.5 rounded-md bg-secondary/50">
                                {sectionProgress}/{section.lessons.length}
                              </span>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-4">
                          <SideSection
                            section={section}
                            lessonProgress={lessonProgress}
                            courseId={courseId}
                            courseName={courseName}
                            currentLessonId={currentLessonId}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for optimal re-render prevention
    return (
      prevProps.course.id === nextProps.course.id &&
      prevProps.lessonProgress.length === nextProps.lessonProgress.length &&
      prevProps.sectionId === nextProps.sectionId &&
      prevProps.currentLessonId === nextProps.currentLessonId &&
      prevProps.courseId === nextProps.courseId &&
      prevProps.courseName === nextProps.courseName
    );
  }
);

export default SideCard;
