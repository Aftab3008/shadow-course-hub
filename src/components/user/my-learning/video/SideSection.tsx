import { Section } from "@/types/course";
import { LessonProgressLearning } from "@/types/learning";
import SideSectionCard from "./SideSectionCard";
import { useParams } from "react-router-dom";

export default function SideSection({
  section,
  lessonProgress,
}: {
  section: Partial<Section>;
  lessonProgress: Partial<LessonProgressLearning>[];
}) {
  const { lessonId } = useParams<{ lessonId: string }>();
  return (
    <div className="space-y-2 pt-2">
      {section.lessons.map((lesson) => (
        <SideSectionCard
          lesson={lesson}
          key={lesson.id}
          isCompleted={
            !!lessonProgress.find(
              (lp) => lp.lessonId === lesson.id && lp.isCompleted
            )
          }
          isCurrent={lesson.id === lessonId}
          // isAccessible={isAccessible}
        />
      ))}
    </div>
  );
}
