import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Course } from "@/types/course";
import { LessonProgressLearning } from "@/types/learning";

import { BookOpen } from "lucide-react";
import SideSection from "./SideSection";

export default function SideCard({
  course,
  lessonProgress,
}: {
  course: Partial<Course>;
  lessonProgress: Partial<LessonProgressLearning>[];
}) {
  return (
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
                {lessonProgress.length} of {course.totalLessons} lectures
                completed
              </span>
            </div>
            <Progress
              value={
                course.totalLessons
                  ? (lessonProgress.length / course.totalLessons) * 100
                  : 0
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
                {course.sections.map((section) => (
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
                            {section.lessons.length} lectures
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <SideSection
                        section={section}
                        lessonProgress={lessonProgress}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
