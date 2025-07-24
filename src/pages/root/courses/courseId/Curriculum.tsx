import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CurriculumSkeleton from "@/components/shared/skeletons/CurriculumSkeleton";
import { Section } from "@/types/course";
import Lessons from "./Lessons";
import { formatDuration } from "@/utils/utils";

export default function Curriculum({
  isLoading,
  sections,
  courseDuration,
}: {
  isLoading: boolean;
  sections: Partial<Section>[];
  courseDuration: number;
}) {
  if (isLoading) {
    return <CurriculumSkeleton />;
  }

  return (
    <main className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-6 bg-muted/50 rounded-lg">
        <h3 className="text-2xl font-bold text-foreground">Course Content</h3>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
            {sections.length} sections
          </span>
          <span className="px-3 py-1 bg-blue-100  text-blue-600 rounded-full font-medium">
            {sections.reduce(
              (acc, section) => acc + (section.lessons?.length || 0),
              0
            )}{" "}
            lectures
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-600  rounded-full font-medium">
            {formatDuration(courseDuration)}
          </span>
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-4"
        defaultValue=""
      >
        {sections.map((section, index) => (
          <AccordionItem
            key={`section-${index}`}
            value={`section-${index}`}
            className="border border-border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
          >
            <AccordionTrigger className="hover:no-underline px-6 py-4 hover:bg-muted/50 transition-colors duration-200">
              <div className="flex justify-between items-center w-full mr-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <span className="font-semibold text-foreground text-left">
                    {section.title}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="hidden sm:inline">
                    {section.lessons?.length || 0} lectures
                  </span>
                  <span className="px-2 py-1 bg-muted rounded text-xs">
                    {section.duration}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-6 pb-4">
                <div className="space-y-2 pt-2">
                  {section.lessons?.map((lecture, lectureIndex) => (
                    <Lessons
                      key={`lesson-${lectureIndex}`}
                      title={lecture.title}
                      duration={lecture.duration}
                      isPreview={lectureIndex === 0}
                    />
                  )) || (
                    <div className="text-center py-4 text-muted-foreground">
                      No lessons available
                    </div>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
