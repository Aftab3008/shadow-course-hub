import SectionManagerSkeleton from "@/components/shared/skeletons/SectionManagerSkeleton";
import { useUpdateOrderMutation } from "@/hooks/Instructor";
import { Section } from "@/types/course";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useParams } from "react-router-dom";
import SectionCard from "./SectionCard";

interface SectionManagerProps {
  sections: Section[];
  isLoading?: boolean;
}

export default function SectionsManager({
  sections,
  isLoading,
}: SectionManagerProps) {
  const { courseId } = useParams();
  const {
    mutate: updateSectionOrder,
    error,
    isError,
  } = useUpdateOrderMutation(courseId);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const a = sections.find((section) => section.id === active.id);
    const b = sections.find((section) => section.id === over.id);
    if (!a || !b) {
      return;
    }
    const result = updateSectionOrder({
      section1: a,
      section2: b,
    });
  };

  if (isLoading) {
    return <SectionManagerSkeleton />;
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="space-y-4">
        <SortableContext
          items={sections}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              index={index + 1}
              id={section.id}
              title={section.title}
              description={section.description}
              order={section.order}
              lessons={section.lessons}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
