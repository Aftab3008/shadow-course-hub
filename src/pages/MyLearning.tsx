
import { useState } from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import CourseCard from "@/components/Course/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Clock, BookOpen, Award, Play } from "lucide-react";
import { Link } from "react-router-dom";

const MyLearning = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for enrolled courses
  const enrolledCourses = [
    {
      id: "1",
      title: "Complete React Development Bootcamp 2024",
      description: "Master React, Redux, Hooks, Context API, and modern development practices",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
      instructor: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop"
      },
      rating: 4.8,
      reviews: 12450,
      students: 45230,
      duration: "42h 30m",
      price: 89.99,
      originalPrice: 199.99,
      category: "Programming",
      level: "Intermediate",
      progress: 45,
      lastWatched: "2 hours ago",
      nextLesson: "React Hooks - useEffect"
    },
    {
      id: "2",
      title: "UI/UX Design Masterclass - Figma to Production",
      description: "Learn design principles, user research, prototyping, and development handoff",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=450&fit=crop",
      instructor: {
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop"
      },
      rating: 4.9,
      reviews: 8920,
      students: 23470,
      duration: "35h 15m",
      price: 79.99,
      originalPrice: 159.99,
      category: "Design",
      level: "Beginner",
      progress: 78,
      lastWatched: "5 days ago",
      nextLesson: "Advanced Prototyping Techniques"
    },
    {
      id: "3",
      title: "Machine Learning with Python - Complete Course",
      description: "From basics to advanced ML algorithms, neural networks, and real-world projects",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop",
      instructor: {
        name: "Dr. Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop"
      },
      rating: 4.7,
      reviews: 15680,
      students: 38940,
      duration: "58h 45m",
      price: 119.99,
      originalPrice: 249.99,
      category: "Data Science",
      level: "Advanced",
      progress: 23,
      lastWatched: "1 week ago",
      nextLesson: "Introduction to Neural Networks"
    }
  ];

  // Mock completed courses
  const completedCourses = [
    {
      id: "4",
      title: "JavaScript Fundamentals for Beginners",
      description: "Learn JavaScript from scratch with practical examples and projects",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop",
      instructor: {
        name: "Alex Thompson",
        avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop"
      },
      rating: 4.6,
      reviews: 7230,
      students: 18950,
      duration: "28h 20m",
      price: 69.99,
      originalPrice: 129.99,
      category: "Programming",
      level: "Beginner",
      completedDate: "2 weeks ago",
      certificateAvailable: true
    }
  ];

  const wishlistCourses = [
    {
      id: "5",
      title: "Full Stack Web Development - MERN Stack",
      description: "Build complete web applications with MongoDB, Express, React, and Node.js",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
      instructor: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop"
      },
      rating: 4.8,
      reviews: 11340,
      students: 32180,
      duration: "65h 15m",
      price: 139.99,
      originalPrice: 279.99,
      category: "Programming",
      level: "Advanced"
    }
  ];

  const filteredEnrolledCourses = enrolledCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalProgress = enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">My Learning</h1>
          
          {/* Learning Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardContent className="p-4 text-center">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{enrolledCourses.length}</div>
                <div className="text-sm text-muted-foreground">Enrolled Courses</div>
              </CardContent>
            </Card>
            
            <Card className="border-border bg-card">
              <CardContent className="p-4 text-center">
                <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{completedCourses.length}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </CardContent>
            </Card>
            
            <Card className="border-border bg-card">
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">
                  {enrolledCourses.reduce((acc, course) => {
                    const totalHours = parseFloat(course.duration.split('h')[0]);
                    return acc + (totalHours * course.progress / 100);
                  }, 0).toFixed(1)}h
                </div>
                <div className="text-sm text-muted-foreground">Hours Learned</div>
              </CardContent>
            </Card>
            
            <Card className="border-border bg-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{totalProgress.toFixed(0)}%</div>
                <div className="text-sm text-muted-foreground mb-2">Average Progress</div>
                <Progress value={totalProgress} className="h-2" />
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search your courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>
        </div>

        {/* Course Tabs */}
        <Tabs defaultValue="enrolled" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="enrolled">In Progress ({enrolledCourses.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedCourses.length})</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist ({wishlistCourses.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="enrolled" className="mt-8">
            {filteredEnrolledCourses.length > 0 ? (
              <div className="space-y-6">
                {filteredEnrolledCourses.map((course) => (
                  <Card key={course.id} className="border-border bg-card hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-80 flex-shrink-0">
                          <Link to={`/learn/${course.id}/1`}>
                            <div className="aspect-video relative overflow-hidden rounded-lg group">
                              <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Play className="h-12 w-12 text-white" />
                              </div>
                            </div>
                          </Link>
                        </div>
                        
                        <div className="flex-1 space-y-4">
                          <div>
                            <Link to={`/course/${course.id}`}>
                              <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                                {course.title}
                              </h3>
                            </Link>
                            <p className="text-muted-foreground mt-1">By {course.instructor.name}</p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Progress</span>
                              <span className="text-sm font-medium text-foreground">{course.progress}% complete</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">{course.category}</Badge>
                            <Badge variant="outline">{course.level}</Badge>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Last watched: {course.lastWatched}</p>
                              <p className="text-sm text-foreground">Next: {course.nextLesson}</p>
                            </div>

                            <Button asChild>
                              <Link to={`/learn/${course.id}/1`}>
                                Continue Learning
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? "Try adjusting your search" : "Start learning by enrolling in a course"}
                </p>
                <Button asChild variant="outline">
                  <Link to="/courses">Browse Courses</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-8">
            {completedCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedCourses.map((course) => (
                  <Card key={course.id} className="border-border bg-card hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-green-600">Completed</Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">By {course.instructor.name}</p>
                      <p className="text-sm text-muted-foreground mb-4">Completed {course.completedDate}</p>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/course/${course.id}`}>View Course</Link>
                        </Button>
                        {course.certificateAvailable && (
                          <Button size="sm">
                            <Award className="h-4 w-4 mr-1" />
                            Certificate
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No completed courses yet</h3>
                <p className="text-muted-foreground">Complete a course to earn your first certificate!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="wishlist" className="mt-8">
            {wishlistCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Your wishlist is empty</h3>
                <p className="text-muted-foreground mb-4">Add courses to your wishlist to save them for later</p>
                <Button asChild variant="outline">
                  <Link to="/courses">Browse Courses</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default MyLearning;
