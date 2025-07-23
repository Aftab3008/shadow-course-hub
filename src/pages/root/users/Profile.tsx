import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import ShowAvatar from "@/components/shared/ShowAvatar";
import { 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Globe, 
  Edit, 
  BookOpen, 
  Award, 
  Star,
  Users,
  TrendingUp,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock user data
const mockUser = {
  id: "1",
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  profileUrl: "/assets/default.jpg",
  bio: "Full-stack developer passionate about creating amazing user experiences. I love learning new technologies and sharing knowledge with the community.",
  location: "San Francisco, CA",
  website: "https://sarahjohnson.dev",
  phone: "+1 (555) 123-4567",
  joinedDate: "January 2022",
  followers: 2847,
  following: 156,
  totalCourses: 12,
  completedCourses: 8,
  certificates: 15,
  learningStreak: 45,
  skills: [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Python", level: 75 },
    { name: "AWS", level: 70 },
    { name: "Docker", level: 65 }
  ],
  recentCourses: [
    {
      id: "1",
      title: "Advanced React Patterns",
      instructor: "John Doe",
      progress: 75,
      thumbnail: "/assets/default.jpg",
      lastAccessed: "2 hours ago"
    },
    {
      id: "2", 
      title: "TypeScript Masterclass",
      instructor: "Jane Smith",
      progress: 60,
      thumbnail: "/assets/default.jpg",
      lastAccessed: "1 day ago"
    },
    {
      id: "3",
      title: "AWS Cloud Fundamentals", 
      instructor: "Mike Wilson",
      progress: 30,
      thumbnail: "/assets/default.jpg",
      lastAccessed: "3 days ago"
    }
  ],
  achievements: [
    {
      id: "1",
      title: "Course Completion Master",
      description: "Completed 10+ courses",
      icon: "🏆",
      earnedDate: "March 2024"
    },
    {
      id: "2",
      title: "Learning Streak Champion",
      description: "45 day learning streak",
      icon: "🔥",
      earnedDate: "April 2024"
    },
    {
      id: "3",
      title: "Skill Developer",
      description: "Mastered 5+ technologies",
      icon: "⚡",
      earnedDate: "February 2024"
    }
  ]
};

export default function Profile() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <ShowAvatar 
                  profileUrl={mockUser.profileUrl}
                  name={mockUser.name}
                  className="h-24 w-24 md:h-32 md:w-32"
                />
                <div className="mt-4 text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-bold">{mockUser.name}</h1>
                  <p className="text-muted-foreground mt-1">{mockUser.bio}</p>
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{mockUser.totalCourses}</div>
                      <div className="text-sm text-muted-foreground">Total Courses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{mockUser.completedCourses}</div>
                      <div className="text-sm text-muted-foreground">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{mockUser.certificates}</div>
                      <div className="text-sm text-muted-foreground">Certificates</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{mockUser.learningStreak}</div>
                      <div className="text-sm text-muted-foreground">Day Streak</div>
                    </div>
                  </div>
                  <Link to="/my-profile/edit">
                    <Button variant="outline" size="sm" className="ml-4">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {mockUser.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {mockUser.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {mockUser.joinedDate}
                  </div>
                  {mockUser.website && (
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      <a href={mockUser.website} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        Website
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="font-semibold">{mockUser.followers}</span> followers
                  </div>
                  <div>
                    <span className="font-semibold">{mockUser.following}</span> following
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Learning Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Learning Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Course Completion</span>
                      <span>{Math.round((mockUser.completedCourses / mockUser.totalCourses) * 100)}%</span>
                    </div>
                    <Progress value={(mockUser.completedCourses / mockUser.totalCourses) * 100} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-primary">{mockUser.learningStreak}</div>
                      <div className="text-xs text-muted-foreground">Days Streak</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-primary">{mockUser.certificates}</div>
                      <div className="text-xs text-muted-foreground">Certificates</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockUser.recentCourses.slice(0, 3).map((course) => (
                    <div key={course.id} className="flex items-center gap-3">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{course.title}</p>
                        <p className="text-xs text-muted-foreground">{course.lastAccessed}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {course.progress}%
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockUser.recentCourses.map((course) => (
                <Card key={course.id}>
                  <CardContent className="p-4">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <h3 className="font-semibold mb-1">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">by {course.instructor}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                      <p className="text-xs text-muted-foreground">Last accessed: {course.lastAccessed}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockUser.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockUser.achievements.map((achievement) => (
                <Card key={achievement.id}>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                    <Badge variant="secondary">{achievement.earnedDate}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}