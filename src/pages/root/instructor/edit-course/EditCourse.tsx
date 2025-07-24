import AdvancedSettings from "@/components/instructor/edit-course/AdvancedSettings";
import CourseDetails from "@/components/instructor/edit-course/CourseDetails";
import SectionsManager from "@/components/instructor/edit-course/sections/SectionsManager";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInstructorCourse } from "@/hooks/Instructor";
import { ArrowLeft, BookOpen, Edit3, Settings } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ErrorCourse from "./ErrorCourse";
import ErrorCourseAuth from "./ErrorCourseAuth";

const EditCourse = () => {
  const { courseId } = useParams();
  const {
    data: course,
    isLoading,
    isError,
    error,
    refetch: refetchCourse,
  } = useInstructorCourse(courseId);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "curriculum";

  if (isError && error) {
    if ("status" in error && error.status === 403) {
      return <ErrorCourseAuth />;
    }

    return <ErrorCourse error={error.message || null} />;
  }

  // Todo: Edit functionality for lessons
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="mb-6 hover:bg-primary/10 transition-colors"
          >
            <Link to="/instructor/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>

          <Card className="shadow-xl border-0 bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Edit3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">
                      {isLoading ? (
                        <Skeleton className="h-8 w-80" />
                      ) : (
                        course?.data?.title || "Untitled Course"
                      )}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground mt-2 text-base">
                      {isLoading ? (
                        <Skeleton className="h-5 w-64 mt-2" />
                      ) : (
                        "Edit your course content, settings, and curriculum"
                      )}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {isLoading ? (
                    <Skeleton className="h-5 w-16" />
                  ) : (
                    `${course?.data?.sections?.length || 0} sections`
                  )}
                </Badge>
              </div>
            </CardHeader>
          </Card>
        </div>

        <Tabs
          value={currentTab}
          onValueChange={(value) => setSearchParams({ tab: value })}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm border shadow-sm h-12 p-1 mb-8 gap-2">
            <TabsTrigger
              value="curriculum"
              className="flex items-center gap-2 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium transition-all duration-200 hover:bg-primary/10"
            >
              <BookOpen className="h-4 w-4 transition-transform duration-200 group-data-[state=active]:scale-110" />
              <span className="hidden sm:inline">Curriculum</span>
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="flex items-center gap-2 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium transition-all duration-200 hover:bg-primary/10"
            >
              <Edit3 className="h-4 w-4 transition-transform duration-200 group-data-[state=active]:scale-110" />
              <span className="hidden sm:inline">Course Details</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center gap-2 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium transition-all duration-200 hover:bg-primary/10"
            >
              <Settings className="h-4 w-4 transition-transform duration-200 group-data-[state=active]:scale-110" />
              <span className="hidden sm:inline">Advanced Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="curriculum"
            className="mt-0 animate-in fade-in-0 slide-in-from-right-1 duration-200"
          >
            <SectionsManager
              sections={course?.data.sections || []}
              isLoading={isLoading}
              isError={isError}
              refetch={refetchCourse}
            />
          </TabsContent>

          <TabsContent
            value="details"
            className="mt-0 animate-in fade-in-0 slide-in-from-right-1 duration-200"
          >
            <CourseDetails
              title={course?.data.title}
              price={course?.data.price}
              description={course?.data.description}
              category={course?.data.category}
              level={course?.data.level}
              briefDescription={course?.data.briefDescription}
              requirements={course?.data.requirements}
              objectives={course?.data.objectives}
              language={course?.data.language}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent
            value="settings"
            className="mt-0 animate-in fade-in-0 slide-in-from-right-1 duration-200"
          >
            <AdvancedSettings
              thumbnail={course?.data.thumbnail}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EditCourse;
