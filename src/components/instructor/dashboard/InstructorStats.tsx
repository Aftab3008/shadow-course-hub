import InstructorStatsSkeleton from "@/components/shared/skeletons/InstructorStatsSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, DollarSign, Star, TrendingUp, Users } from "lucide-react";

export default function InstructorStats({
  totalStudents,
  totalCourses,
  totalRevenue,
  averageRating,
  totalReviews,
  isLoading,
}: {
  totalStudents: number;
  totalCourses: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <InstructorStatsSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <Card className="border-border bg-card">
        <CardContent className="p-4 text-center">
          <Users className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">
            {totalStudents.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Total Students</div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardContent className="p-4 text-center">
          <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">
            {totalCourses}
          </div>
          <div className="text-sm text-muted-foreground">Total Courses</div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardContent className="p-4 text-center">
          <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Total Revenue</div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardContent className="p-4 text-center">
          <Star className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">
            {averageRating}
          </div>
          <div className="text-sm text-muted-foreground">Avg Rating</div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardContent className="p-4 text-center">
          <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">
            {totalReviews.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Total Reviews</div>
        </CardContent>
      </Card>
    </div>
  );
}
