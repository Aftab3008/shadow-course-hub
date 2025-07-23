import CreateCourse from "@/components/instructor/dashboard/CreateCourse";
import InstructorAnalytics from "@/components/instructor/dashboard/InstructorAnalytics";
import InstructorCourses from "@/components/instructor/dashboard/InstructorCourses";
import InstructorResources from "@/components/instructor/dashboard/InstructorResources";
import InstructorStats from "@/components/instructor/dashboard/InstructorStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetInstructorCourses } from "@/hooks/Instructor";
import { useSearchParams } from "react-router-dom";

const InstructorDashboard = () => {
  const { data: instructorCourses, isLoading } = useGetInstructorCourses();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "courses";

  const instructorStats = {
    totalStudents: 45230,
    totalCourses: 12,
    totalRevenue: 125400,
    averageRating: 4.8,
    totalReviews: 8920,
  };

  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Instructor Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your courses and track your success
            </p>
          </div>
          <CreateCourse />
        </div>

        <InstructorStats
          totalStudents={instructorStats.totalStudents}
          totalCourses={instructorStats.totalCourses}
          totalRevenue={instructorStats.totalRevenue}
          averageRating={instructorStats.averageRating}
          totalReviews={instructorStats.totalReviews}
          isLoading={isLoading}
        />

        <Tabs
          value={currentTab}
          onValueChange={(value) => setSearchParams({ tab: value })}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="mt-8">
            <InstructorCourses
              instructorCourses={instructorCourses?.data}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <InstructorAnalytics isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="resources" className="mt-8">
            <InstructorResources isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default InstructorDashboard;
