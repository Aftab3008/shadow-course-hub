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

export function MyLearningCourseCard({
  enrollment,
}: {
  enrollment: Partial<Enrollment>;
}) {
  const progress = getProgressPercentage(
    enrollment.LessonProgress?.length || 0,
    enrollment.course?.totalLessons || 0
  );
  const { currentLessonId, currentSectionId } = enrollment;
  const isCompleted = progress === 100;
  const hasStarted = progress > 0;

  return (
    <Card className="group border-border/50 bg-gradient-to-br from-card to-card/80 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-80 flex-shrink-0 relative h-48 lg:h-auto">
            <Link
              to={`/learn/${formatTitle(enrollment.course.title)}/${
                enrollment.course.id
              }/1`}
            >
              <div className="w-full h-full lg:aspect-video relative overflow-hidden rounded-lg">
                <img
                  src={enrollment.course.thumbnail || "/placeholder.svg"}
                  alt={enrollment.course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="p-4 rounded-full bg-gray-800/40 backdrop-blur-sm">
                    <Play className="h-6 w-6 text-primary ml-1" />
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  {isCompleted ? (
                    <Badge className="bg-green-500/90 hover:bg-green-500 backdrop-blur-sm border-0 text-white">
                      <Award className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  ) : hasStarted ? (
                    <Badge className="bg-blue-500/90 hover:bg-blue-500 backdrop-blur-sm border-0 text-white">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      In Progress
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-500/90 hover:bg-gray-500 backdrop-blur-sm border-0 text-white">
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

          <div className="flex-1 p-6 space-y-4">
            <div className="space-y-2">
              <Link
                to={`/course/${formatTitle(enrollment.course.title)}/${
                  enrollment.course.id
                }`}
                className="block group/title"
              >
                <h3 className="text-lg font-semibold text-foreground group-hover/title:text-primary transition-colors line-clamp-2 leading-tight">
                  {enrollment.course.title}
                </h3>
              </Link>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{enrollment.course.instructor.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDuration(enrollment.course.duration)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{enrollment.course.totalLessons || 0} lessons</span>
                </div>
              </div>
            </div>

            {hasStarted && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">
                    Learning Progress
                  </span>
                  <span className="text-sm font-semibold text-foreground bg-primary/10 px-2 py-1 rounded-md">
                    {progress}% complete
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="capitalize font-medium">
                {enrollment.course.category.name}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {formatString(enrollment.course.level)}
              </Badge>
              {enrollment.course.language && (
                <Badge variant="outline">
                  {formatString(enrollment.course.language)}
                </Badge>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="space-y-1">
                {isCompleted ? (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-green-600">
                      ✓ Course completed successfully!
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Completed recently
                    </p>
                  </div>
                ) : hasStarted ? (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Last activity: A while ago
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      Continue with: Next lesson
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      Ready to start learning
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Begin your journey with this course
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {isCompleted ? (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/course/${enrollment.course.id}`}>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Review Course
                      </Link>
                    </Button>
                    {isCompleted && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Award className="h-4 w-4 mr-2" />
                        Get Certificate
                      </Button>
                    )}
                  </div>
                ) : (
                  <Button asChild className="px-6">
                    <Link
                      to={`/my-learning/${formatTitle(
                        enrollment.course.title
                      )}/${
                        enrollment.course.id
                      }/learn/${currentSectionId}/${currentLessonId}`}
                      className="flex items-center gap-2"
                    >
                      <Play className="h-4 w-4" />
                      {hasStarted ? "Continue Learning" : "Start Course"}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
