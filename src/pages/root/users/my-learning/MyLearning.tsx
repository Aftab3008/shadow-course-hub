import {
  MyLearningCardsSkeleton,
  MyLearningGridSkeleton,
} from "@/components/shared/skeletons/MyLearningSkeletons";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Card, CardContent } from "@/components/ui/card";
import MyLearningError from "@/components/user/my-learning/MyLearningError";
import MyLearningSection from "@/components/user/my-learning/MyLearningSection";
import { useMyLearning } from "@/hooks/User";
import { Enrollment } from "@/types/course";
import { BookOpen, Grid3X3, List, PlayCircle, Trophy } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const MyLearning = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const { data: myLearningData, isLoading, error } = useMyLearning();

  if (error) {
    return <MyLearningError message={error.message} />;
  }

  const enrollments: Partial<Enrollment>[] = myLearningData?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="container mx-auto px-4 py-12 relative">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                My Learning Journey
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Continue your learning adventure and track your progress
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-border/50 bg-gradient-to-br from-card to-card/80 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Total Courses
                  </p>
                  <span className="text-3xl font-bold text-foreground">
                    {isLoading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      enrollments.length
                    )}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {enrollments.length > 0
                      ? "Keep learning!"
                      : "Start your journey"}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-500/10">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-card to-card/80 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Completed
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {/* {completedCourses} */}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {/* {completedCourses > 0
                      ? `${Math.round(
                          (completedCourses / totalCourses) * 100
                        )}% completion rate`
                      : "Complete your first course"} */}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-500/10">
                  <Trophy className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Your Courses
              </h2>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  disabled={isLoading}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  disabled={isLoading}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {isLoading ? (
            viewMode === "grid" ? (
              <MyLearningGridSkeleton count={8} />
            ) : (
              <MyLearningCardsSkeleton count={3} />
            )
          ) : enrollments.length > 0 ? (
            <MyLearningSection enrollments={enrollments} viewMode={viewMode} />
          ) : (
            <Card className="border-border/50">
              <CardContent className="p-12 text-center">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Start your learning journey
                  </h3>
                  <p className="text-muted-foreground">
                    Discover amazing courses and start building new skills
                    today.
                  </p>
                  <Button asChild>
                    <Link
                      to="/courses"
                      className="inline-flex items-center gap-2"
                    >
                      <PlayCircle className="h-4 w-4" />
                      Browse Courses
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* {totalCourses > 0 && (
          <Card className="border-border/50 mt-8">
            <CardHeader>
              <h3 className="text-lg font-semibold text-foreground">
                Quick Actions
              </h3>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  asChild
                  className="justify-start h-auto py-3"
                >
                  <Link to="/courses" className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Browse Courses</p>
                      <p className="text-xs text-muted-foreground">
                        Find new courses
                      </p>
                    </div>
                  </Link>
                </Button>

                <Button variant="outline" className="justify-start h-auto py-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <Award className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Certificates</p>
                      <p className="text-xs text-muted-foreground">
                        View achievements
                      </p>
                    </div>
                  </div>
                </Button>

                <Button variant="outline" className="justify-start h-auto py-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Target className="h-4 w-4 text-purple-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Set Goals</p>
                      <p className="text-xs text-muted-foreground">
                        Track progress
                      </p>
                    </div>
                  </div>
                </Button>

                <Button variant="outline" className="justify-start h-auto py-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/10">
                      <Users className="h-4 w-4 text-orange-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Study Groups</p>
                      <p className="text-xs text-muted-foreground">
                        Join community
                      </p>
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        )} */}
      </div>
    </div>
  );
};

export default MyLearning;
