import AdvancedSettings from "@/components/instructor/edit-course/AdvancedSettings";
import CourseDetails from "@/components/instructor/edit-course/CourseDetails";
import AddSection from "@/components/instructor/edit-course/sections/AddSection";
import SectionsManager from "@/components/instructor/edit-course/sections/SectionsManager";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInstructorCourse } from "@/hooks/Instructor";
import { ArrowLeft } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";

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
      return (
        <div className="container mx-auto px-4 py-8 w-full h-screen flex flex-col items-center justify-center space-y-4">
          <h2 className="text-2xl font-bold text-red-600">Course Not Found</h2>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8 w-full h-screen flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-red-600">
          Error Loading Course
        </h2>
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }
  // Todo: Edit functionality for lessons
  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col justify-between items-start md:items-center mb-8">
          <div className="w-full flex items-center justify-start space-x-2 mb-4 md:mb-0">
            <Button variant="outline" size="sm" asChild>
              <Link to="/instructor/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          <div className="flex items-center justify-between w-full mt-8">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div>
                {isLoading ? (
                  <div>
                    <Skeleton className="h-10 w-full rounded" />
                  </div>
                ) : (
                  course &&
                  course.data && (
                    <h1 className="text-3xl font-bold text-foreground">
                      {course.data.title}
                    </h1>
                  )
                )}
                <p className="text-muted-foreground">
                  Edit your course content and settings
                </p>
              </div>
            </div>
          </div>
        </div>

        <Tabs
          value={currentTab}
          onValueChange={(value) => setSearchParams({ tab: value })}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 bg-muted mb-8">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="details">Course Details</TabsTrigger>
            <TabsTrigger value="settings">Advanced Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="curriculum">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-foreground">
                  Course Curriculum
                </h2>
                <div className="flex items-center space-x-2">
                  <AddSection refetch={refetchCourse} courseId={courseId} />
                </div>
              </div>
              <SectionsManager
                sections={course?.data.sections}
                isLoading={isLoading}
              />
            </div>
          </TabsContent>

          <TabsContent value="details">
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  Course Details
                </h2>
              </div>
              <CourseDetails
                title={course?.data.title}
                price={course?.data.price}
                description={course?.data.description}
                category={course?.data.category}
                level={course?.data.level}
                isLoading={isLoading}
              />
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Advanced Settings
                </h2>
              </div>
              <AdvancedSettings
                thumbnail={course?.data.thumbnail}
                isLoading={isLoading}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default EditCourse;
