import CoursesGrid from "@/components/course/CoursesGrid";
import Demo from "@/components/shared/Demo";
import PrefetchLink from "@/components/shared/PrefetchLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFeaturedCourses } from "@/hooks/Courses";
import { fetchCourses } from "@/services/courses.services";
import {
  ArrowRight,
  Award,
  BookOpen,
  Play,
  Search,
  Users,
  CheckCircle2,
  Sparkles,
  Zap,
  Globe,
  Target,
  TrendingUp,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
  cardVariants,
} from "@/constants/animations";
import { categoryData } from "@/components/home/CategoryIcons";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: courses,
    isLoading: coursesLoading,
    error: coursesError,
    isError: isCoursesError,
    refetch: refetchCourses,
  } = useFeaturedCourses(5);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/courses");
    }
  };

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-4 overflow-hidden bg-background">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-mesh-gradient"></div>
        <div className="absolute inset-0 bg-dot-pattern opacity-30"></div>

        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <motion.div
          className="container mx-auto text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Transform Your Career Journey
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-hero font-bold text-foreground mb-6 tracking-tight"
            >
              Master Skills That
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Shape Your Future
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-body-lg text-muted-foreground mb-12 max-w-3xl mx-auto"
            >
              Join a global community of learners gaining real-world skills from
              industry experts. Start your journey to success with courses
              designed for impact.
            </motion.p>

            {/* Search Bar */}
            <motion.form
              variants={itemVariants}
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-16"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for courses, skills, or topics..."
                  className="pl-12 h-14 bg-card border-border text-base shadow-sm hover:shadow-md focus:shadow-md transition-shadow duration-300"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-14 px-8 text-base font-semibold magnetic-button group"
              >
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.form>

            {/* Stats Cards */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {[
                {
                  icon: Users,
                  value: "50K+",
                  label: "Active Learners",
                  color: "text-primary",
                },
                {
                  icon: BookOpen,
                  value: "1,500+",
                  label: "Quality Courses",
                  color: "text-primary",
                },
                {
                  icon: Award,
                  value: "4.8/5",
                  label: "Average Rating",
                  color: "text-primary",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  className="group relative p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 professional-card"
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className={`h-7 w-7 ${stat.color}`} />
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-foreground mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-24 px-4 bg-background">
        <motion.div
          className="container mx-auto max-w-7xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-14">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-primary uppercase tracking-wide">
                  Most Popular
                </span>
              </div>
              <h2 className="text-section-title font-bold text-foreground mb-3">
                Featured Courses
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Discover our most popular courses, carefully selected by our
                community and taught by industry leaders
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="group border-2 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <PrefetchLink
                  to="/courses"
                  prefetchQuery={{
                    queryKey: ["courses"],
                    queryFn: () => fetchCourses(),
                  }}
                >
                  Browse All
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </PrefetchLink>
              </Button>
            </motion.div>
          </div>
          <motion.div variants={itemVariants}>
            <CoursesGrid
              courses={courses?.data}
              isLoading={coursesLoading}
              isError={isCoursesError}
              error={coursesError?.message}
              refetch={refetchCourses}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-4 bg-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>

        <motion.div
          className="container mx-auto max-w-7xl relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Globe className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wide">
                Explore Topics
              </span>
            </div>
            <h2 className="text-section-title font-bold text-foreground mb-4">
              Browse by Category
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Discover your next skill across diverse fields, from cutting-edge
              technology to creative arts and beyond
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-5"
          >
            {categoryData.slice(0, 12).map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full border-border bg-card hover:border-primary/30 transition-all duration-300 cursor-pointer professional-card overflow-hidden">
                    <CardContent className="p-5 text-center relative">
                      {/* Hover gradient overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                      ></div>

                      <div className="relative z-10">
                        <div
                          className={`inline-flex items-center justify-center w-14 h-14 mb-3 rounded-xl bg-gradient-to-br ${category.gradient} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                        >
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1.5 text-sm group-hover:text-primary transition-colors duration-200">
                          {category.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {category.courses} courses
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="group border-2 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Link to="/courses">
                View All Categories
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-background relative">
        <div className="absolute inset-0 bg-mesh-gradient opacity-50"></div>

        <motion.div
          className="container mx-auto max-w-7xl relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wide">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-section-title font-bold text-foreground mb-4">
              Your Success, Our Priority
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Experience a learning platform built with your growth in mind,
              backed by cutting-edge technology and expert instruction
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Play,
                title: "Expert-Led Content",
                description:
                  "Learn from industry leaders with proven experience and real-world insights that matter",
                gradient: "from-primary to-primary/70",
              },
              {
                icon: BookOpen,
                title: "Lifetime Access",
                description:
                  "Own your learning journey with unlimited course access and regular content updates",
                gradient: "from-emerald-500 to-teal-500",
              },
              {
                icon: Award,
                title: "Recognized Certificates",
                description:
                  "Showcase your achievements with industry-recognized certificates that boost your career",
                gradient: "from-amber-500 to-orange-500",
              },
              {
                icon: CheckCircle2,
                title: "Practical Projects",
                description:
                  "Build real-world projects that demonstrate your skills to potential employers",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Users,
                title: "Community Support",
                description:
                  "Connect with peers, mentors, and experts in our vibrant learning community",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: TrendingUp,
                title: "Career Growth",
                description:
                  "Track your progress and unlock opportunities with personalized learning paths",
                gradient: "from-rose-500 to-red-500",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Card className="h-full border-border bg-card hover:border-primary/30 professional-card text-center relative overflow-hidden">
                    <CardContent className="p-8">
                      {/* Gradient overlay on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                      ></div>

                      <div className="relative z-10">
                        <div className="relative inline-block mb-6">
                          <div
                            className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}
                          >
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          {/* Glow effect */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                          ></div>
                        </div>

                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Banner */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>

        <motion.div
          className="container mx-auto px-4 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-14">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Trusted by Learners Worldwide
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Join thousands of students transforming their careers through
              quality education
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          >
            {[
              { value: "50K+", label: "Active Students", icon: Users },
              { value: "1,500+", label: "Quality Courses", icon: BookOpen },
              { value: "200+", label: "Expert Instructors", icon: Award },
              { value: "4.8/5", label: "Student Rating", icon: Sparkles },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                  className="text-center group cursor-default"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 mb-4 rounded-xl bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-base lg:text-lg text-primary-foreground/80">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-muted/10">
        <motion.div
          className="container mx-auto max-w-7xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wide">
                Student Success
              </span>
            </div>
            <h2 className="text-section-title font-bold text-foreground mb-4">
              Loved by Learners Everywhere
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              See what our students have to say about their learning experience
            </p>
          </motion.div>
          <Demo />
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <section className="py-28 px-4 bg-gradient-to-br from-primary via-primary/95 to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>

        <motion.div
          className="container mx-auto text-center relative z-10 max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">
                Start Your Journey Today
              </span>
            </div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight"
          >
            Ready to Transform Your Career?
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl lg:text-2xl text-primary-foreground/90 mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            Join thousands of learners advancing their skills and careers. Your
            journey to success starts here.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div variants={itemVariants}>
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="text-base px-10 py-6 h-auto magnetic-button group font-semibold"
              >
                <PrefetchLink
                  to="/courses"
                  prefetchQuery={{
                    queryKey: ["courses"],
                    queryFn: () => fetchCourses(),
                  }}
                >
                  Start Learning Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </PrefetchLink>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-2 border-primary-foreground hover:bg-primary-foreground hover:text-primary text-base px-10 py-6 h-auto group font-semibold transition-all duration-300"
                asChild
              >
                <Link to="/instructor/dashboard">
                  Teach on Our Platform
                  <Users className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-center justify-center gap-8 text-primary-foreground/80"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm">7-day money back</span>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
};

export default Home;
