import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Lesson } from "@/types/course";
import { formatDuration } from "@/utils/utils";
import { CheckCircle, Lock, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { memo, useCallback } from "react";
import { m } from "framer-motion";

interface SideSectionCardProps {
  lesson: Partial<Lesson>;
  sectionId: string;
  isCompleted: boolean;
  isCurrent: boolean;
  isAccessible?: boolean;
  courseId: string;
  courseName: string;
}

const SideSectionCard = memo<SideSectionCardProps>(function SideSectionCard({
  lesson,
  sectionId,
  isCompleted,
  isCurrent,
  isAccessible = true,
  courseId,
  courseName,
}) {
  const navigate = useNavigate();

  const handleLectureNavigation = useCallback(() => {
    if (isAccessible) {
      navigate(
        `/my-learning/${courseName}/${courseId}/learn/${sectionId}/${lesson.id}`
      );
    }
  }, [isAccessible, navigate, courseName, courseId, sectionId, lesson.id]);

  return (
    <m.div
      whileHover={isAccessible ? { y: -2 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        key={lesson.id}
        className={`lecture-card cursor-pointer transition-all duration-300 relative overflow-hidden group ${
          isCurrent
            ? "border-primary/50 bg-gradient-to-br from-primary/10 to-secondary/5 shadow-lg ring-2 ring-primary/30"
            : "border-border/50 hover:border-primary/30 hover:shadow-lg"
        } ${!isAccessible ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleLectureNavigation}
      >
        {/* Gradient overlay on hover */}
        {isAccessible && !isCurrent && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}

        {/* Current lesson animated gradient background */}
        {isCurrent && (
          <m.div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        <CardContent className="p-3 relative">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              {isCompleted ? (
                <m.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="p-1 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/10"
                >
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </m.div>
              ) : isCurrent ? (
                <m.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="p-1 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/20"
                >
                  <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                    <Play className="h-2 w-2 text-primary-foreground fill-current" />
                  </div>
                </m.div>
              ) : !isAccessible ? (
                <div className="p-1 rounded-lg bg-muted/20">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
              ) : (
                <div className="p-1 rounded-lg bg-muted/10 group-hover:bg-primary/10 transition-colors duration-200">
                  <div className="h-4 w-4 rounded-full border-2 border-muted-foreground group-hover:border-primary/50 transition-colors duration-200" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-semibold line-clamp-2 leading-snug transition-colors duration-200 ${
                  isCurrent
                    ? "text-primary"
                    : "text-foreground group-hover:text-primary/90"
                }`}
              >
                {lesson.title}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-medium text-muted-foreground px-2 py-0.5 rounded-md bg-secondary/30">
                  {formatDuration(lesson.duration)}
                </span>
                <Badge
                  variant="outline"
                  className="text-xs h-5 px-2 border-border/50 bg-background/50"
                >
                  Video
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </m.div>
  );
});

export default SideSectionCard;
