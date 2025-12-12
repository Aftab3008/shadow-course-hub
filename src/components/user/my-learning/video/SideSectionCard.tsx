import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Lesson } from "@/types/course";
import { formatDuration } from "@/utils/utils";
import { CheckCircle, Lock, Play } from "lucide-react";

export default function SideSectionCard({
  lesson,
  isCompleted,
  isCurrent,
  isAccessible = true,
  navigateToLecture,
}: {
  lesson: Partial<Lesson>;
  isCompleted: boolean;
  isCurrent: boolean;
  isAccessible?: boolean;
  navigateToLecture?: (id: number) => void;
}) {
  return (
    <Card
      key={lesson.id}
      className={`lecture-card cursor-pointer transition-all duration-200 hover:shadow-md ${
        isCurrent
          ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
          : "border-border hover:bg-accent/50 hover:border-accent"
      } ${!isAccessible ? "opacity-50 cursor-not-allowed" : ""}`}
      //   onClick={() => isAccessible && navigateToLecture(lesson.id)}
    >
      <CardContent className="p-3">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            {isCompleted ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : isCurrent ? (
              <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                <Play className="h-2 w-2 text-primary-foreground fill-current" />
              </div>
            ) : !isAccessible ? (
              <Lock className="h-4 w-4 text-muted-foreground" />
            ) : (
              <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-medium line-clamp-2 leading-snug ${
                isCurrent ? "text-primary" : "text-foreground"
              }`}
            >
              {lesson.title}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">
                {formatDuration(lesson.duration)}
              </span>
              {/* <Badge variant="outline" className="text-xs h-5 px-2">
                Video
              </Badge> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
