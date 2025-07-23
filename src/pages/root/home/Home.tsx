import CoursesGrid from "@/components/course/CoursesGrid";
import Demo from "@/components/shared/Demo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useCourses } from "@/hooks/Courses";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Award, BookOpen, Play, Search, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { toast } = useToast();
  const {
    data: courses,
    isLoading: coursesLoading,
    error: coursesError,
  } = useCourses();

  if (coursesError) {
    toast({
      title: "Error",
      description: "Failed to load courses",
      variant: "destructive",
    });
  }

  const featuredCourses = courses?.slice(0, 3) || [];

  return (
    <main>
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

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Explore Top Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover courses across various fields and industries. From
              technology to business, find the perfect course to advance your
              skills.
            </p>
          </div>

          {/* {categoriesLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : categories ? (
            <CategoriesGrid categories={categories} />
          ) : (
            <div className="text-center py-12 text-2xl">
              <p className="text-muted-foreground">
                No categories available at the moment
              </p>
            </div>
          )} */}
        </div>
      </section>

      {/* <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Explore Top Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover courses across various fields and industries. From
              technology to business, find the perfect course to advance your
              skills.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {testCategories.map((category) => {
              return (
                <Link
                  key={category.id}
                  to={`/courses?category=${category.query.toLowerCase()}`}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <div className="h-12 w-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors"></div>
                      <h3 className="font-semibold mb-2">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.courseCount.toLocaleString()} courses
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section> */}

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

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-primary-foreground/80">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,500+</div>
              <div className="text-primary-foreground/80">Online Courses</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-primary-foreground/80">
                Expert Instructors
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8/5</div>
              <div className="text-primary-foreground/80">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      <Demo />
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
              <Link to="/courses">
                Browse Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link to="/instructor/dashboard">Become an Instructor</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
