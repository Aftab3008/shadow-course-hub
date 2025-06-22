
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Upload,
  Video,
  GripVertical,
  Save,
  Eye,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChapterManager from "@/components/Course/ChapterManager";
import VideoUploadDialog from "@/components/Course/VideoUploadDialog";
import CourseSettingsDialog from "@/components/Course/CourseSettingsDialog";

const EditCourse = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [course, setCourse] = useState<any>(null);
  const [isVideoUploadOpen, setIsVideoUploadOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  // Mock course data - in real app this would come from API
  useEffect(() => {
    const mockCourse = {
      id: id,
      title: "Complete React Development Bootcamp 2024",
      description: "Learn React from basics to advanced concepts with hands-on projects",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
      category: "programming",
      level: "beginner",
      price: 99.99,
      chapters: [
        {
          id: "1",
          title: "Introduction to React",
          description: "Get started with React fundamentals",
          order: 1,
          lessons: [
            {
              id: "1-1",
              title: "What is React?",
              description: "Understanding React and its benefits",
              duration: "15:30",
              videoUrl: "",
              order: 1
            },
            {
              id: "1-2", 
              title: "Setting up the development environment",
              description: "Installing Node.js, VS Code, and creating your first app",
              duration: "20:45",
              videoUrl: "",
              order: 2
            }
          ]
        },
        {
          id: "2",
          title: "Components and JSX",
          description: "Learn about React components and JSX syntax",
          order: 2,
          lessons: [
            {
              id: "2-1",
              title: "Creating your first component",
              description: "Building functional components",
              duration: "18:20",
              videoUrl: "",
              order: 1
            }
          ]
        }
      ]
    };
    setCourse(mockCourse);
  }, [id]);

  const handleSaveCourse = () => {
    toast({
      title: "Course Updated!",
      description: "Your course changes have been saved successfully.",
    });
  };

  const handlePreviewCourse = () => {
    window.open(`/course/${id}`, '_blank');
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Button variant="outline" size="sm" asChild>
              <Link to="/instructor">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{course.title}</h1>
              <p className="text-muted-foreground">Edit your course content and settings</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePreviewCourse}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </DialogTrigger>
              <CourseSettingsDialog 
                course={course} 
                onSave={(updatedCourse) => {
                  setCourse(updatedCourse);
                  setIsSettingsOpen(false);
                }} 
              />
            </Dialog>
            
            <Button onClick={handleSaveCourse}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="curriculum" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted mb-8">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="details">Course Details</TabsTrigger>
            <TabsTrigger value="settings">Advanced Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="curriculum">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-foreground">Course Curriculum</h2>
                <Dialog open={isVideoUploadOpen} onOpenChange={setIsVideoUploadOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Chapter
                    </Button>
                  </DialogTrigger>
                  <VideoUploadDialog 
                    onSave={(chapterData) => {
                      // Handle new chapter creation
                      setIsVideoUploadOpen(false);
                      toast({
                        title: "Chapter Added!",
                        description: "New chapter has been created successfully.",
                      });
                    }}
                  />
                </Dialog>
              </div>

              <ChapterManager 
                chapters={course.chapters}
                onChaptersUpdate={(updatedChapters) => {
                  setCourse({ ...course, chapters: updatedChapters });
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="details">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Course Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="courseTitle" className="text-foreground">Course Title</Label>
                    <Input 
                      id="courseTitle" 
                      value={course.title}
                      onChange={(e) => setCourse({ ...course, title: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="coursePrice" className="text-foreground">Price ($)</Label>
                    <Input 
                      id="coursePrice" 
                      type="number"
                      value={course.price}
                      onChange={(e) => setCourse({ ...course, price: parseFloat(e.target.value) })}
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="courseDescription" className="text-foreground">Description</Label>
                  <Textarea 
                    id="courseDescription" 
                    value={course.description}
                    onChange={(e) => setCourse({ ...course, description: e.target.value })}
                    className="bg-background border-border min-h-[120px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="courseCategory" className="text-foreground">Category</Label>
                    <Select value={course.category} onValueChange={(value) => setCourse({ ...course, category: value })}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
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
                    <Label htmlFor="courseLevel" className="text-foreground">Level</Label>
                    <Select value={course.level} onValueChange={(value) => setCourse({ ...course, level: value })}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-foreground">Course Thumbnail</Label>
                  <div className="mt-2 flex items-center space-x-4">
                    <img 
                      src={course.thumbnail} 
                      alt="Course thumbnail"
                      className="w-32 h-20 object-cover rounded border"
                    />
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Change Thumbnail
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-foreground">Default Video Quality</Label>
                  <Select defaultValue="1080p">
                    <SelectTrigger className="bg-background border-border mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="480p">480p (Standard)</SelectItem>
                      <SelectItem value="720p">720p (HD)</SelectItem>
                      <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                      <SelectItem value="1440p">1440p (2K)</SelectItem>
                      <SelectItem value="2160p">2160p (4K)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    This setting applies to new video uploads. Existing videos keep their current quality.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default EditCourse;
