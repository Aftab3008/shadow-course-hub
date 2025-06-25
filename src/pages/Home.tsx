import { Link } from "react-router-dom";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import CoursesGrid from "@/components/course/CoursesGrid";
import CategoriesGrid from "@/components/category/CategoriesGrid";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Play, Users, BookOpen, Award } from "lucide-react";
import { useCourses, useCategories } from "@/hooks/useCourses";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const { toast } = useToast();
  const {
    data: courses,
    isLoading: coursesLoading,
    error: coursesError,
  } = useCourses();

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  // Show error toasts
  if (coursesError) {
    toast({
      title: "Error",
      description: "Failed to load courses",
      variant: "destructive",
    });
  }

  if (categoriesError) {
    toast({
      title: "Error",
      description: "Failed to load categories",
      variant: "destructive",
    });
  }

  const featuredCourses = courses?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-background via-background to-muted">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Learn Skills That
            <span className="text-primary block mt-2">Matter Most</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join millions of learners worldwide and unlock your potential with
            our expert-led courses
          </p>

          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="What do you want to learn?"
                className="pl-10 h-12 bg-background border-border"
              />
            </div>
            <Button size="lg" className="h-12 px-8">
              Search Courses
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">50M+ Students</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">200K+ Courses</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">Expert Instructors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              Featured Courses
            </h2>
            <Button variant="outline" asChild>
              <Link to="/courses">View All Courses</Link>
            </Button>
          </div>

          {coursesLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <CoursesGrid courses={featuredCourses} />
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Explore by Category
          </h2>

          {categoriesLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : categories ? (
            <CategoriesGrid categories={categories} />
          ) : null}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Why Choose LearnHub?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-border bg-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Expert-Led Content
                </h3>
                <p className="text-muted-foreground">
                  Learn from industry professionals with years of real-world
                  experience
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border bg-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Lifetime Access
                </h3>
                <p className="text-muted-foreground">
                  Get unlimited access to your courses with no expiration dates
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border bg-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Certificates
                </h3>
                <p className="text-muted-foreground">
                  Earn certificates upon completion to showcase your
                  achievements
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join our community of learners and start your journey towards
            mastering new skills today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/courses">Browse Courses</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link to="/instructor">Become an Instructor</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
