import { Section } from "@/types/course";
import { LessonProgressLearning } from "@/types/learning";
import SideSectionCard from "./SideSectionCard";
import { memo, useMemo } from "react";

interface SideSectionProps {
  section: Partial<Section>;
  lessonProgress: Partial<LessonProgressLearning>[];
  courseId: string;
  courseName: string;
  currentLessonId: string;
}

const SideSection = memo<SideSectionProps>(function SideSection({
  section,
  lessonProgress,
  courseId,
  courseName,
  currentLessonId,
}) {
  const completionMap = useMemo(() => {
    const map = new Map<string, boolean>();
    lessonProgress.forEach((lp) => {
      if (lp.lessonId && lp.isCompleted) {
        map.set(lp.lessonId, true);
      }
    });
    return map;
  }, [lessonProgress]);

  return (
    <div className="space-y-2 pt-2">
      {section.lessons.map((lesson) => (
        <SideSectionCard
          lesson={lesson}
          sectionId={section.id}
          key={lesson.id}
          isCompleted={completionMap.get(lesson.id) || false}
          isCurrent={lesson.id === currentLessonId}
          courseId={courseId}
          courseName={courseName}
        />
      ))}
    </div>
  );
});

export default SideSection;
