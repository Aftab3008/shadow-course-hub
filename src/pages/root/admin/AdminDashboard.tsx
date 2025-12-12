import { userAuthStore } from "@/store/auth.store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, TrendingUp, Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = userAuthStore();

  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      description: "+12% from last month",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Courses",
      value: "143",
      description: "+5 new this week",
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      title: "Revenue",
      value: "$54,231",
      description: "+18% from last month",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Admin Actions",
      value: "89",
      description: "This month",
      icon: Shield,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" asChild className="mb-4">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your platform today.
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <Shield className="mr-1 h-3 w-3" />
          Administrator
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer">
              <span className="text-sm">Manage Users</span>
              <Users className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer">
              <span className="text-sm">Review Courses</span>
              <BookOpen className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer">
              <span className="text-sm">System Settings</span>
              <Shield className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">
              <div className="flex justify-between items-center">
                <span>New user registered</span>
                <span className="text-muted-foreground">2m ago</span>
              </div>
            </div>
            <div className="text-sm">
              <div className="flex justify-between items-center">
                <span>Course "React Basics" approved</span>
                <span className="text-muted-foreground">1h ago</span>
              </div>
            </div>
            <div className="text-sm">
              <div className="flex justify-between items-center">
                <span>System backup completed</span>
                <span className="text-muted-foreground">3h ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
