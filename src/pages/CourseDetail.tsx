import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Star,
  Clock,
  Users,
  Play,
  CheckCircle,
  Globe,
  Award,
  Download,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CourseDetail = () => {
  const { id } = useParams();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { toast } = useToast();

  // Mock course data
  const course = {
    id: "1",
    title: "Complete React Development Bootcamp 2024",
    description:
      "Master React, Redux, Hooks, Context API, and modern development practices with hands-on projects",
    longDescription:
      "This comprehensive React development course will take you from a complete beginner to an advanced React developer. You'll learn the latest features of React, including hooks, context API, and modern development practices. The course includes real-world projects, best practices, and everything you need to become a professional React developer.",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
    instructor: {
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop",
      bio: "Senior Software Engineer at Google with 8+ years of experience in React development. Passionate about teaching and helping others learn to code.",
      students: 45230,
      courses: 12,
      rating: 4.8,
    },
    rating: 4.8,
    reviews: 12450,
    students: 45230,
    duration: "42h 30m",
    price: 89.99,
    originalPrice: 199.99,
    category: "Programming",
    level: "Intermediate",
    language: "English",
    lastUpdated: "December 2024",
    features: [
      "42.5 hours on-demand video",
      "15 articles",
      "25 downloadable resources",
      "Full lifetime access",
      "Access on mobile and TV",
      "Certificate of completion",
    ],
    requirements: [
      "Basic HTML, CSS, and JavaScript knowledge",
      "A computer with internet connection",
      "No prior React experience required",
    ],
    curriculum: [
      {
        id: 1,
        title: "Introduction to React",
        duration: "2h 30m",
        lectures: [
          { id: 1, title: "What is React?", duration: "15:30", type: "video" },
          {
            id: 2,
            title: "Setting up Development Environment",
            duration: "20:45",
            type: "video",
          },
          {
            id: 3,
            title: "Your First React Component",
            duration: "18:20",
            type: "video",
          },
          {
            id: 4,
            title: "Understanding JSX",
            duration: "22:15",
            type: "video",
          },
        ],
      },
      {
        id: 2,
        title: "React Components and Props",
        duration: "3h 15m",
        lectures: [
          {
            id: 5,
            title: "Functional vs Class Components",
            duration: "25:30",
            type: "video",
          },
          {
            id: 6,
            title: "Props and PropTypes",
            duration: "28:45",
            type: "video",
          },
          {
            id: 7,
            title: "Component Composition",
            duration: "32:20",
            type: "video",
          },
          {
            id: 8,
            title: "Exercise: Building a User Card",
            duration: "45:15",
            type: "exercise",
          },
        ],
      },
      {
        id: 3,
        title: "State Management with Hooks",
        duration: "4h 20m",
        lectures: [
          {
            id: 9,
            title: "Introduction to useState",
            duration: "30:30",
            type: "video",
          },
          { id: 10, title: "useEffect Hook", duration: "35:45", type: "video" },
          { id: 11, title: "Custom Hooks", duration: "40:20", type: "video" },
          {
            id: 12,
            title: "Project: Todo List App",
            duration: "65:15",
            type: "project",
          },
        ],
      },
    ],
  };

  const handleEnroll = () => {
    setIsEnrolled(true);
    toast({
      title: "Enrolled successfully!",
      description: "You can now access all course content.",
    });
  };

  const reviews = [
    {
      id: 1,
      user: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Excellent course! Sarah explains everything clearly and the projects are very practical.",
    },
    {
      id: 2,
      user: "Jane Smith",
      avatar:
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop",
      rating: 5,
      date: "1 month ago",
      comment:
        "Best React course I've taken. The content is up-to-date and well-structured.",
    },
    {
      id: 3,
      user: "Mike Johnson",
      avatar:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop",
      rating: 4,
      date: "3 weeks ago",
      comment:
        "Great course content. Would love to see more advanced topics covered.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {course.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-muted-foreground">
                    ({course.reviews.toLocaleString()} reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Globe className="h-5 w-5" />
                  <span>{course.language}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {course.instructor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Link
                    to={`/instructor/${course.instructor.name}`}
                    className="font-semibold text-foreground hover:text-primary"
                  >
                    {course.instructor.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {course.instructor.students.toLocaleString()} students •{" "}
                    {course.instructor.courses} courses
                  </p>
                </div>
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-muted">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      What you'll learn
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "Build modern React applications from scratch",
                        "Master React Hooks and functional components",
                        "Implement state management with Redux",
                        "Create responsive user interfaces",
                        "Work with APIs and handle asynchronous data",
                        "Deploy React applications to production",
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Course Description
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {course.longDescription}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Requirements
                    </h3>
                    <ul className="space-y-2">
                      {course.requirements.map((req, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-foreground">
                    Course Content
                  </h3>
                  <span className="text-muted-foreground">
                    {course.curriculum.length} sections •{" "}
                    {course.curriculum.reduce(
                      (acc, section) => acc + section.lectures.length,
                      0
                    )}{" "}
                    lectures • {course.duration}
                  </span>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {course.curriculum.map((section) => (
                    <AccordionItem
                      key={section.id}
                      value={`section-${section.id}`}
                      className="border-border"
                    >
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex justify-between items-center w-full mr-4">
                          <span className="font-medium text-foreground">
                            {section.title}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {section.lectures.length} lectures •{" "}
                            {section.duration}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {section.lectures.map((lecture) => (
                            <div
                              key={lecture.id}
                              className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <Play className="h-4 w-4 text-muted-foreground" />
                                <span className="text-foreground">
                                  {lecture.title}
                                </span>
                                {lecture.type === "video" && (
                                  <Badge variant="outline" className="text-xs">
                                    Video
                                  </Badge>
                                )}
                                {lecture.type === "exercise" && (
                                  <Badge variant="outline" className="text-xs">
                                    Exercise
                                  </Badge>
                                )}
                                {lecture.type === "project" && (
                                  <Badge variant="outline" className="text-xs">
                                    Project
                                  </Badge>
                                )}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {lecture.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>

              <TabsContent value="instructor" className="space-y-6">
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                          {course.instructor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-foreground mb-2">
                          {course.instructor.name}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {course.instructor.bio}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-foreground">
                              {course.instructor.rating}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Instructor Rating
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-foreground">
                              {course.instructor.students.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Students
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-foreground">
                              {course.instructor.courses}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Courses
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-foreground">
                              8+
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Years Experience
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-foreground">
                    Student Reviews
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-muted-foreground">
                      ({course.reviews.toLocaleString()} reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className="border-border bg-card">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={review.avatar}
                              alt={review.user}
                            />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {review.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-foreground">
                                {review.user}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {review.date}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-muted-foreground">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Course Preview */}
              <Card className="border-border bg-card">
                <div className="aspect-video relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-t-lg">
                    <Button size="lg" className="rounded-full">
                      <Play className="h-6 w-6 mr-2" />
                      Preview Course
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-3xl font-bold text-foreground">
                      ${course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${course.originalPrice}
                      </span>
                    )}
                  </div>

                  {isEnrolled ? (
                    <div className="space-y-3">
                      <Button asChild className="w-full" size="lg">
                        <Link to={`/learn/${course.id}/1`}>
                          Continue Learning
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full">
                        Download Resources
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        onClick={handleEnroll}
                        className="w-full"
                        size="lg"
                      >
                        Enroll Now
                      </Button>
                      <Button variant="outline" className="w-full">
                        Add to Wishlist
                      </Button>
                    </div>
                  )}

                  <div className="mt-6 space-y-3">
                    <h4 className="font-semibold text-foreground">
                      This course includes:
                    </h4>
                    <div className="space-y-2">
                      {course.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetail;
