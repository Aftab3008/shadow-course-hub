import { useUpdateLessonOrderMutation } from "@/hooks/Instructor";
import { Lesson } from "@/types/course";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AddLesson from "./AddLesson";
import LessonCard from "./LessonCard";
import { useParams } from "react-router-dom";

export default function Lessons({
  lessons,
  sectionId,
}: {
  lessons: Lesson[];
  sectionId: string;
}) {
  const { courseId } = useParams();

  const {
    mutate: UpadateLessonsOrder,
    error,
    isError,
  } = useUpdateLessonOrderMutation(courseId, sectionId);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const lesson1 = lessons.find((lesson) => lesson.id === active.id);
    const lesson2 = lessons.find((lesson) => lesson.id === over.id);
    if (!lesson1 || !lesson2) {
      return;
    }
    UpadateLessonsOrder({ lesson1, lesson2 });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={lessons} strategy={verticalListSortingStrategy}>
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} sectionId={sectionId} />
        ))}
      </SortableContext>
      <AddLesson sectionId={sectionId} />
    </DndContext>
  );
}
