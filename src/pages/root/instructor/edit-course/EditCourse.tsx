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
import {
  ArrowLeft,
  BookOpen,
  Edit3,
  Settings,
  Sparkles,
  Layers,
} from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { m } from "framer-motion";
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
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Section */}
      <m.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b border-border/50 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10 max-w-6xl">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Button
              variant="outline"
              size="sm"
              asChild
              className="mb-6 hover:bg-primary/10 transition-all duration-200 hover:scale-105 border-border/50 backdrop-blur-sm"
            >
              <Link to="/instructor/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>

            <Card className="shadow-xl border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="pb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 shrink-0">
                      <Edit3 className="h-6 w-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3">
                        <Sparkles className="w-3 h-3 text-primary" />
                        <span className="text-xs font-medium text-primary">
                          Edit Mode
                        </span>
                      </div>
                      <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground truncate">
                        {isLoading ? (
                          <Skeleton className="h-8 w-80" />
                        ) : (
                          course?.data?.title || "Untitled Course"
                        )}
                      </CardTitle>
                      {isLoading ? (
                        <Skeleton className="h-5 w-64 mt-2" />
                      ) : (
                        <CardDescription className="text-muted-foreground mt-2 text-base">
                          Edit your course content, settings, and curriculum
                        </CardDescription>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="shrink-0 bg-primary/10 text-primary border-primary/20 px-4 py-2"
                  >
                    {isLoading ? (
                      <Skeleton className="h-5 w-16" />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Layers className="h-3 w-3" />
                        <span>
                          {course?.data?.sections?.length || 0} sections
                        </span>
                      </div>
                    )}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          </m.div>
        </div>
      </m.section>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs
            value={currentTab}
            onValueChange={(value) => setSearchParams({ tab: value })}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-card/50 to-card/30 backdrop-blur-sm border border-border/50 shadow-lg h-14 p-1.5 mb-8 gap-2 rounded-lg">
              <TabsTrigger
                value="curriculum"
                className="flex items-center justify-center gap-2 h-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-md font-medium transition-all duration-300 hover:bg-primary/10 rounded-md"
              >
                <BookOpen className="h-4 w-4 transition-transform duration-200 data-[state=active]:scale-110" />
                <span className="hidden sm:inline">Curriculum</span>
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="flex items-center justify-center gap-2 h-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-md font-medium transition-all duration-300 hover:bg-primary/10 rounded-md"
              >
                <Edit3 className="h-4 w-4 transition-transform duration-200 data-[state=active]:scale-110" />
                <span className="hidden sm:inline">Course Details</span>
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex items-center justify-center gap-2 h-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-md font-medium transition-all duration-300 hover:bg-primary/10 rounded-md"
              >
                <Settings className="h-4 w-4 transition-transform duration-200 data-[state=active]:scale-110" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="curriculum"
              className="mt-0 animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
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
              className="mt-0 animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
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
              className="mt-0 animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
            >
              <AdvancedSettings
                thumbnail={course?.data.thumbnail}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </m.div>
      </div>
    </main>
  );
};

export default EditCourse;
