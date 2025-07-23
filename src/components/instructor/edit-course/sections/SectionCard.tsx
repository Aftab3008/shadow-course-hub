import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChevronDown,
  ChevronRight,
  Edit,
  GripVertical,
  Loader2,
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
      className="border-border bg-card"
      ref={setNodeRef}
      style={style}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div className="cursor-move" {...listeners} {...attributes}>
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>

            <Collapsible open={open} onOpenChange={setOpen}>
              <CollapsibleTrigger className="flex items-center space-x-2 hover:text-primary">
                {open ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
            </Collapsible>

            <div className="flex-1">
              <h3 className="font-semibold text-foreground">
                Chapter {index}: {title}
              </h3>
              <p className="text-sm text-muted-foreground">{description}</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-muted-foreground">
                  {lessons.length > 1
                    ? `${lessons.length} lessons`
                    : `${lessons.length} lesson`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
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
              className="text-destructive hover:text-red-500"
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
          <CardContent className="pt-0">
            <div className="space-y-3">
              <Lessons lessons={lessons} sectionId={id} />
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
