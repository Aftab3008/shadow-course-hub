import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  PlusCircle, 
  BookOpen, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Star,
  Edit,
  Eye,
  Upload,
  Video
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Instructor = () => {
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  const { toast } = useToast();

  // Mock instructor data
  const instructorStats = {
    totalStudents: 45230,
    totalCourses: 12,
    totalRevenue: 125400,
    averageRating: 4.8,
    totalReviews: 8920
  };

  // Mock courses data
  const instructorCourses = [
    {
      id: 1,
      title: "Complete React Development Bootcamp 2024",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
      students: 15420,
      rating: 4.8,
      reviews: 3240,
      revenue: 42500,
      status: "published",
      lastUpdated: "2 days ago"
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop",
      students: 8960,
      rating: 4.7,
      reviews: 1890,
      revenue: 28900,
      status: "published",
      lastUpdated: "1 week ago"
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=450&fit=crop",
      students: 0,
      rating: 0,
      reviews: 0,
      revenue: 0,
      status: "draft",
      lastUpdated: "3 days ago"
    }
  ];

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Course Created!",
      description: "Your new course has been created successfully.",
    });
    setIsCreateCourseOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Instructor Dashboard</h1>
            <p className="text-muted-foreground">Manage your courses and track your success</p>
          </div>
          
          <Dialog open={isCreateCourseOpen} onOpenChange={setIsCreateCourseOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <PlusCircle className="h-5 w-5 mr-2" />
                Create Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-popover border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Create New Course</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateCourse} className="space-y-4">
                <div>
                  <Label htmlFor="courseTitle" className="text-foreground">Course Title</Label>
                  <Input 
                    id="courseTitle" 
                    placeholder="Enter course title"
                    className="bg-background border-border"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="courseDescription" className="text-foreground">Description</Label>
                  <Textarea 
                    id="courseDescription" 
                    placeholder="Brief course description"
                    className="bg-background border-border"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="courseCategory" className="text-foreground">Category</Label>
                  <Select required>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="programming">Programming</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="coursePrice" className="text-foreground">Price ($)</Label>
                  <Input 
                    id="coursePrice" 
                    type="number" 
                    placeholder="99.99"
                    className="bg-background border-border"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateCourseOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Course</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="border-border bg-card">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{instructorStats.totalStudents.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Students</div>
            </CardContent>
          </Card>
          
          <Card className="border-border bg-card">
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{instructorStats.totalCourses}</div>
              <div className="text-sm text-muted-foreground">Total Courses</div>
            </CardContent>
          </Card>
          
          <Card className="border-border bg-card">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">${instructorStats.totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </CardContent>
          </Card>
          
          <Card className="border-border bg-card">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{instructorStats.averageRating}</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
          
          <Card className="border-border bg-card">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{instructorStats.totalReviews.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Reviews</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="mt-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-foreground">My Courses</h2>
                <div className="flex space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40 bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="all">All Courses</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {instructorCourses.map((course) => (
                  <Card key={course.id} className="border-border bg-card hover:shadow-lg transition-all duration-300">
                    <div className="flex">
                      <div className="w-32 h-24 relative overflow-hidden rounded-l-lg flex-shrink-0">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <CardContent className="flex-1 p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-foreground line-clamp-2 flex-1 mr-2">
                            {course.title}
                          </h3>
                          <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                            {course.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-muted-foreground">Students: </span>
                            <span className="font-medium text-foreground">{course.students.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Revenue: </span>
                            <span className="font-medium text-foreground">${course.revenue.toLocaleString()}</span>
                          </div>
                          {course.status === 'published' && (
                            <>
                              <div>
                                <span className="text-muted-foreground">Rating: </span>
                                <span className="font-medium text-foreground">{course.rating}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Reviews: </span>
                                <span className="font-medium text-foreground">{course.reviews}</span>
                              </div>
                            </>
                          )}
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            Updated {course.lastUpdated}
                          </span>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline" asChild>
                              <Link to={`/instructor/edit-course/${course.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            {course.status === 'published' && (
                              <Button size="sm" variant="outline" asChild>
                                <Link to={`/course/${course.id}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Analytics Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Monthly Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-2">$12,340</div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500">+15.3%</span>
                      <span className="text-muted-foreground ml-1">from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">New Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-2">1,247</div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500">+8.7%</span>
                      <span className="text-muted-foreground ml-1">from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Course Completion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-2">73%</div>
                    <Progress value={73} className="mt-2" />
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Average Rating</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-2">4.8</div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="mt-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Instructor Resources</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-border bg-card">
                  <CardContent className="p-6 text-center">
                    <Video className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Video Guidelines</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn best practices for creating engaging video content
                    </p>
                    <Button variant="outline" size="sm">View Guide</Button>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardContent className="p-6 text-center">
                    <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Upload Center</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload and manage your course videos and materials
                    </p>
                    <Button variant="outline" size="sm">Upload Content</Button>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Instructor Handbook</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Complete guide to becoming a successful instructor
                    </p>
                    <Button variant="outline" size="sm">Read Handbook</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Instructor;
