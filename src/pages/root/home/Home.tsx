import CoursesGrid from "@/components/course/CoursesGrid";
import Demo from "@/components/shared/Demo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFeaturedCourses } from "@/hooks/Courses";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Award, BookOpen, Play, Search, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { toast } = useToast();
  const {
    data: courses,
    isLoading: coursesLoading,
    error: coursesError,
    isError: isCoursesError,
    refetch: refetchCourses,
  } = useFeaturedCourses(5);

  return (
    <main className="min-h-screen">
      <section className="relative py-24 px-4 bg-gradient-to-br from-background via-muted/20 to-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 leading-tight">
              Learn Skills That
              <span className="block mt-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Matter Most
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Join millions of learners worldwide and unlock your potential with
              our expert-led courses designed for real-world success
            </p>

            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-16">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
                <Input
                  placeholder="What do you want to learn today?"
                  className="pl-12 h-14 bg-background/80 backdrop-blur-sm border-border text-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                />
              </div>
              <Button
                size="lg"
                className="h-14 px-10 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Search Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center space-y-3 p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:bg-card/70 transition-colors duration-200">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">50M+</div>
                  <div className="text-muted-foreground">Global Students</div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-3 p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:bg-card/70 transition-colors duration-200">
                <div className="p-3 bg-green-100 rounded-full">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    200K+
                  </div>
                  <div className="text-muted-foreground">Expert Courses</div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-3 p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:bg-card/70 transition-colors duration-200">
                <div className="p-3 bg-blue-200 rounded-full">
                  <Award className="h-8 w-8 text-blue-500" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">98%</div>
                  <div className="text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Featured Courses
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Handpicked courses from our top instructors to help you master
                in-demand skills
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="self-start lg:self-end hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              <Link to="/courses">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <CoursesGrid
            courses={courses?.data}
            isLoading={coursesLoading}
            isError={isCoursesError}
            error={coursesError?.message}
            refetch={refetchCourses}
          />
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Explore Top Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover courses across various fields and industries. From
              technology to business, find the perfect course to advance your
              skills and career.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Web Development", icon: "💻", courses: "1,200+" },
              { name: "Data Science", icon: "📊", courses: "800+" },
              { name: "Design", icon: "🎨", courses: "600+" },
              { name: "Business", icon: "💼", courses: "500+" },
              { name: "Photography", icon: "📸", courses: "400+" },
              { name: "Marketing", icon: "📈", courses: "350+" },
            ].map((category, index) => (
              <Card
                key={index}
                className="group border-border bg-card hover:bg-card/80 transition-all duration-200 hover:shadow-lg cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.courses} courses
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why Choose LearnHub?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're committed to providing the best learning experience with
              cutting-edge technology and expert instruction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group text-center border-border bg-gradient-to-br from-card to-card/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Play className="h-10 w-10 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-200">
                  Expert-Led Content
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Learn from industry professionals with years of real-world
                  experience and proven track records
                </p>
              </CardContent>
            </Card>

            <Card className="group text-center border-border bg-gradient-to-br from-card to-card/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <BookOpen className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-200">
                  Lifetime Access
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get unlimited access to your courses with no expiration dates
                  and regular content updates
                </p>
              </CardContent>
            </Card>

            <Card className="group text-center border-border bg-gradient-to-br from-card to-card/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Award className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-200">
                  Certificates
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Earn certificates upon completion to showcase your
                  achievements and advance your career
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Trusted by Millions Worldwide
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Join a global community of learners and achieve your goals
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-5xl lg:text-6xl font-bold mb-3 group-hover:scale-110 transition-transform duration-200">
                50K+
              </div>
              <div className="text-lg text-primary-foreground/80">
                Active Students
              </div>
            </div>
            <div className="text-center group">
              <div className="text-5xl lg:text-6xl font-bold mb-3 group-hover:scale-110 transition-transform duration-200">
                1,500+
              </div>
              <div className="text-lg text-primary-foreground/80">
                Online Courses
              </div>
            </div>
            <div className="text-center group">
              <div className="text-5xl lg:text-6xl font-bold mb-3 group-hover:scale-110 transition-transform duration-200">
                200+
              </div>
              <div className="text-lg text-primary-foreground/80">
                Expert Instructors
              </div>
            </div>
            <div className="text-center group">
              <div className="text-5xl lg:text-6xl font-bold mb-3 group-hover:scale-110 transition-transform duration-200">
                4.8/5
              </div>
              <div className="text-lg text-primary-foreground/80">
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      <Demo />

      <section className="py-24 px-4 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl lg:text-2xl text-primary-foreground/90 mb-12 leading-relaxed">
            Join our community of learners and start your journey towards
            mastering new skills today. Your future self will thank you.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="text-lg px-8 py-4 h-auto shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Link to="/courses">
                Browse Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-4 h-auto shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              asChild
            >
              <Link to="/instructor/dashboard">
                Become an Instructor
                <Users className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
