import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChevronDown,
  ChevronRight,
  Edit,
  GripVertical,
  Loader2,
  PlayCircle,
  Trash2,
} from "lucide-react";

import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { Lesson } from "@/types/course";
import Lessons from "./lessons/Lessons";
import { useParams } from "react-router-dom";
import { useDeleteSection } from "@/hooks/Instructor";
import UpdateSectionDes from "./UpdateSectionDes";

export default function SectionCard({
  id,
  title,
  description,
  order,
  index,
  lessons,
}: {
  id: string;
  title: string;
  description: string;
  order: number;
  index: number;
  lessons: Lesson[];
}) {
  const {
    setNodeRef,
    listeners,
    isDragging,
    attributes,
    transform,
    transition,
  } = useSortable({
    id,
    data: {
      type: "section",
      order,
    },
  });
  const { courseId } = useParams();
  const { mutateAsync: deleteSection, isPending } = useDeleteSection(courseId);
  const [open, setOpen] = useState(false);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Card
      key={id}
      className={`border-border bg-card/50 backdrop-blur-sm transition-all duration-200 hover:shadow-lg ${
        isDragging ? "shadow-xl ring-2 ring-primary/20 scale-105" : ""
      }`}
      ref={setNodeRef}
      style={style}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div
              className="cursor-move p-1 rounded hover:bg-muted/50 transition-colors"
              {...listeners}
              {...attributes}
            >
              <GripVertical className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </div>

            <Collapsible open={open} onOpenChange={setOpen}>
              <CollapsibleTrigger className="flex items-center space-x-2 hover:text-primary transition-colors p-1 rounded hover:bg-muted/50">
                {open ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
            </Collapsible>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="text-xs font-medium">
                  Chapter {index}
                </Badge>
                <h3 className="font-semibold text-foreground truncate">
                  {title}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {description}
              </p>

              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <PlayCircle className="h-3 w-3" />
                  <span>
                    {lessons.length}{" "}
                    {lessons.length === 1 ? "lesson" : "lessons"}
                  </span>
                </div>
                {lessons.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {lessons.reduce((total, lesson) => {
                      const duration =
                        typeof lesson.duration === "number"
                          ? lesson.duration
                          : parseInt(lesson.duration || "0", 10);
                      return total + duration;
                    }, 0)}
                    min
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <UpdateSectionDes
              title={title}
              description={description}
              isPending={isPending}
              sectionId={id}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => deleteSection(id)}
              className="text-destructive hover:text-red-500 transition-colors"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <Collapsible open={open}>
        <CollapsibleContent>
          <CardContent className="pt-0 px-6 pb-6">
            <div className="border-t border-border pt-4">
              <Lessons lessons={lessons} sectionId={id} />
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
