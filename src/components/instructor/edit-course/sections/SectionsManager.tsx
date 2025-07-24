import SectionManagerSkeleton from "@/components/shared/skeletons/SectionManagerSkeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUpdateOrderMutation } from "@/hooks/Instructor";
import { Section } from "@/types/course";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { BookOpen, GripVertical, TriangleAlert } from "lucide-react";
import { useParams } from "react-router-dom";
import AddSection from "./AddSection";
import SectionCard from "./SectionCard";

interface SectionsManagerProps {
  sections: Section[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export default function SectionsManager({
  sections,
  isLoading,
  isError,
  refetch,
}: SectionsManagerProps) {
  const { courseId } = useParams<{ courseId: string }>();
  const { mutate: updateSectionOrder } = useUpdateOrderMutation(courseId!);

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

  if (!sections || sections.length === 0) {
    return (
      <Card className="w-full shadow-xl border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm">
        <CardHeader className="space-y-4 pb-8 px-4 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
                  Course Curriculum
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-1 text-sm sm:text-base">
                  No sections created yet. Add your first section to get
                  started.
                </CardDescription>
              </div>
            </div>
            <AddSection courseId={courseId} refetch={refetch} />
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-8">
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="p-4 rounded-full bg-muted/50">
              <BookOpen className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                No sections yet
              </h3>
              <p className="text-muted-foreground max-w-md">
                Start building your course by adding sections. Each section can
                contain multiple lessons.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-xl border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm">
      <CardHeader className="space-y-4 pb-8 px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 shrink-0">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
                Course Curriculum
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-1 text-sm sm:text-base">
                Organize your course content into sections and lessons. Drag to
                reorder.
              </CardDescription>
            </div>
          </div>
          <AddSection courseId={courseId} refetch={refetch} />
        </div>
      </CardHeader>

      <CardContent className="px-4 sm:px-6 pb-8">
        {isError && (
          <Alert variant="destructive">
            <TriangleAlert className="h-4 w-4" />
            <AlertDescription>
              Failed to load sections. Please try again.
            </AlertDescription>
          </Alert>
        )}

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
              <GripVertical className="h-4 w-4" />
              <span>Drag sections to reorder them</span>
            </div>

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
      </CardContent>
    </Card>
  );
}
