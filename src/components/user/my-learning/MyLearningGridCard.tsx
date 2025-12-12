import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Enrollment } from "@/types/course";
import {
  formatDuration,
  formatString,
  formatTitle,
  getProgressPercentage,
} from "@/utils/utils";
import { Award, BookOpen, Clock, Play, TrendingUp, User } from "lucide-react";
import { Link } from "react-router-dom";

export function MyLearningGridCard({
  enrollment,
}: {
  enrollment: Partial<Enrollment>;
}) {
  const progress = getProgressPercentage(
    enrollment.LessonProgress?.length || 0,
    enrollment.course?.totalLessons || 0
  );

  const isCompleted = progress === 100;
  const hasStarted = progress > 0;

  return (
    <Card className="group border-border/50 bg-gradient-to-br from-card to-card/80 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 overflow-hidden h-full">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="relative">
          <Link
            to={`/learn/${formatTitle(enrollment.course.title)}/${
              enrollment.course.id
            }`}
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={enrollment.course.thumbnail || "/placeholder.svg"}
                alt={enrollment.course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="p-3 rounded-full bg-white/90 backdrop-blur-sm">
                  <Play className="h-5 w-5 text-gray-900 ml-0.5" />
                </div>
              </div>

              <div className="absolute top-3 right-3">
                {isCompleted ? (
                  <Badge className="bg-green-500/90 hover:bg-green-500 backdrop-blur-sm border-0 text-white text-xs">
                    <Award className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                ) : hasStarted ? (
                  <Badge className="bg-blue-500/90 hover:bg-blue-500 backdrop-blur-sm border-0 text-white text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    In Progress
                  </Badge>
                ) : (
                  <Badge className="bg-gray-500/90 hover:bg-gray-500 backdrop-blur-sm border-0 text-white text-xs">
                    Not Started
                  </Badge>
                )}
              </div>

              {hasStarted && (
                <div className="absolute bottom-0 left-0 right-0">
                  <Progress
                    value={progress}
                    className="h-1 bg-white/20 rounded-none"
                  />
                </div>
              )}
            </div>
          </Link>
        </div>

        <div className="p-4 space-y-3 flex-1 flex flex-col">
          <div className="space-y-2">
            <Link
              to={`/course/${formatTitle(enrollment.course.title)}/${
                enrollment.course.id
              }`}
              className="block group/title"
            >
              <h3 className="text-sm font-semibold text-foreground group-hover/title:text-primary transition-colors line-clamp-2 leading-tight">
                {enrollment.course.title}
              </h3>
            </Link>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span className="truncate">
                  {enrollment.course.instructor.name}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{formatDuration(enrollment.course.duration)}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                <span>{enrollment.course.totalLessons || 0} lessons</span>
              </div>
            </div>
          </div>

          {hasStarted && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-muted-foreground">
                  Progress
                </span>
                <span className="text-xs font-semibold text-foreground bg-primary/10 px-2 py-0.5 rounded">
                  {progress}%
                </span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}

          <div className="flex flex-wrap gap-1">
            <Badge
              variant="secondary"
              className="capitalize font-medium text-xs py-0.5"
            >
              {enrollment.course.category.name}
            </Badge>
            <Badge variant="outline" className="capitalize text-xs py-0.5">
              {formatString(enrollment.course.level || "BEGINNER")}
            </Badge>
          </div>

          <div className="mt-auto pt-2">
            {isCompleted ? (
              <div className="space-y-2">
                <p className="text-xs font-medium text-green-600">
                  ✓ Completed!
                </p>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="text-xs h-8 flex-1"
                  >
                    <Link
                      to={`/course/${formatTitle(enrollment.course.title)}/${
                        enrollment.course.id
                      }`}
                    >
                      Review
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-xs h-8"
                  >
                    <Award className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ) : (
              <Button asChild className="w-full text-xs h-8">
                <Link
                  to={`/learn/${formatTitle(enrollment.course.title)}/${
                    enrollment.course.id
                  }`}
                  className="flex items-center gap-2"
                >
                  <Play className="h-3 w-3" />
                  {hasStarted ? "Continue" : "Start"}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
