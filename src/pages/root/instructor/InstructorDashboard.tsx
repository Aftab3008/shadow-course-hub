import InstructorAnalytics from "@/components/instructor/dashboard/InstructorAnalytics";
import InstructorCourses from "@/components/instructor/dashboard/InstructorCourses";
import InstructorResources from "@/components/instructor/dashboard/InstructorResources";
import InstructorStats from "@/components/instructor/dashboard/InstructorStats";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetInstructorCourses } from "@/hooks/Instructor";
import {
  PlusCircle,
  ArrowLeft,
  Sparkles,
  GraduationCap,
  BarChart3,
  Rocket,
  Library,
} from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const InstructorDashboard = () => {
  const { data: instructorCourses, isLoading } = useGetInstructorCourses();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "courses";
  const navigate = useNavigate();

  const instructorStats = {
    totalStudents: 45230,
    totalCourses: 12,
    totalRevenue: 125400,
    averageRating: 4.8,
    totalReviews: 8920,
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b border-border/50 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="container mx-auto px-4 py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="mb-6 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Home
            </Button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    Instructor Portal
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Welcome Back, Instructor
                </h1>
                <p className="text-lg text-muted-foreground flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-primary" />
                  Manage your courses and inspire learners worldwide
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  size="lg"
                  asChild
                  className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group h-12 px-6"
                >
                  <Link
                    to="/instructor/create-course"
                    className="flex items-center"
                  >
                    <PlusCircle className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    Create New Course
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <InstructorStats
            totalStudents={instructorStats.totalStudents}
            totalCourses={instructorStats.totalCourses}
            totalRevenue={instructorStats.totalRevenue}
            averageRating={instructorStats.averageRating}
            totalReviews={instructorStats.totalReviews}
            isLoading={isLoading}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs
            value={currentTab}
            onValueChange={(value) => setSearchParams({ tab: value })}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-muted/50 backdrop-blur-sm p-1 h-auto border border-border/50 rounded-xl">
              <TabsTrigger
                value="courses"
                className="data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-200 h-11 font-semibold rounded-lg"
              >
                <Library className="h-4 w-4 mr-2" />
                My Courses
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-200 h-11 font-semibold rounded-lg"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className="data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-200 h-11 font-semibold rounded-lg"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Resources
              </TabsTrigger>
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
        </motion.div>
      </div>
    </main>
  );
};

export default InstructorDashboard;
