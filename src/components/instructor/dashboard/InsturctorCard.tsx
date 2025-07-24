import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Course } from "@/types/course";
import { formatDate } from "@/utils/utils";
import { Edit, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import PublishButton from "./PublishButton";

interface InsturctorCardProps {
  course: Partial<Course>;
}

export default function InstructorCard({ course }: InsturctorCardProps) {
  return (
    <Card
      key={course.id}
      className="border-border bg-card hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row"
    >
      <div className="w-full sm:w-32 h-48 sm:h-full relative overflow-hidden rounded-t-lg sm:rounded-l-lg flex-shrink-0">
        {!course.thumbnail ? (
          <div className="absolute inset-0 bg-muted opacity-50 flex items-center justify-center">
            <span className="text-xs text-muted-foreground">No Thumbnail</span>
          </div>
        ) : (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <CardContent className="flex-1 p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-foreground line-clamp-2 flex-1 mr-2">
            {course.title}
          </h3>
          <Badge variant={course.published ? "default" : "secondary"}>
            {course.published ? "Published" : "Draft"}
          </Badge>
        </div>

        <div className="flex items-center mb-4 gap-2 text-xs">
          {/* //grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-3 */}
          <div>
            <span className="text-muted-foreground">Students: </span>
            <span className="font-medium text-foreground">
              {course.enrollments.length.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Revenue: </span>
            <span className="font-medium text-foreground">${"0"}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Rating: </span>
              <span className="font-medium text-foreground">
                {course.published && course.reviews.length > 0
                  ? (
                      course.reviews.reduce(
                        (acc, review) => acc + review.rating.rating,
                        0
                      ) / course.reviews.length
                    ).toFixed(1)
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Reviews: </span>
              <span className="font-medium text-foreground">
                {course.published ? course.reviews.length : "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center">
          <span className="text-xs text-muted-foreground mb-2 sm:mb-0">
            Updated on: {formatDate(course.updatedAt)}
          </span>
          <div className="flex space-x-1">
            {!course.published && (
              <PublishButton courseId={course.id} title={course.title} />
            )}
            <Button size="sm" variant="outline" asChild>
              <Link to={`/instructor/edit-course/${course.id}`}>
                <Edit className="h-4 w-4" />
              </Link>
            </Button>
            {course.published && (
              <Button size="sm" variant="outline" asChild>
                <Link to={`/course/${course.id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
