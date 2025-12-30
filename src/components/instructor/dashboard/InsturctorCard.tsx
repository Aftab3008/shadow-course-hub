import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Course } from "@/types/course";
import { formatDate, formatTitle } from "@/utils/utils";
import {
  Edit,
  Eye,
  Users,
  DollarSign,
  Star,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import PublishButton from "./PublishButton";
import { m } from "framer-motion";

interface InsturctorCardProps {
  course: Partial<Course>;
}

export default function InstructorCard({ course }: InsturctorCardProps) {
  const { enrollments = 0, reviews = 0 } = course._count || {};

  const averageRating =
    course.published && reviews > 0
      ? (
          course.reviews.reduce(
            (acc, review) => acc + review.rating.rating,
            0
          ) / course.reviews.length
        ).toFixed(1)
      : "N/A";

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <m.div variants={itemVariants}>
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-0">
          {/* Course Thumbnail */}
          <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
            {!course.thumbnail ? (
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <span className="text-sm text-muted-foreground font-medium">
                  No Thumbnail
                </span>
              </div>
            ) : (
              <img
                src={course.thumbnail}
                alt={course.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-3 left-3">
              <Badge
                variant={course.published ? "default" : "secondary"}
                className="backdrop-blur-sm"
              >
                {course.published ? "Published" : "Draft"}
              </Badge>
            </div>
          </div>

          {/* Course Content */}
          <CardContent className="flex-1 p-5">
            <h3 className="font-bold text-foreground text-lg leading-tight mb-3 line-clamp-2 group-hover:text-primary transition-colors">
              {course.title}
            </h3>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="p-1.5 bg-blue-500/10 rounded">
                  <Users className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    Students
                  </span>
                  <div className="font-semibold text-foreground">
                    {enrollments}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="p-1.5 bg-green-500/10 rounded">
                  <DollarSign className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Revenue</span>
                  <div className="font-semibold text-foreground">${"0"}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="p-1.5 bg-yellow-500/10 rounded">
                  <Star className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-500" />
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Rating</span>
                  <div className="font-semibold text-foreground">
                    {averageRating}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="p-1.5 bg-purple-500/10 rounded">
                  <MessageSquare className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Reviews</span>
                  <div className="font-semibold text-foreground">
                    {course.published ? reviews : "N/A"}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-3 border-t border-border/50">
              <span className="text-xs text-muted-foreground">
                Updated: {formatDate(course.updatedAt)}
              </span>
              <div className="flex gap-2">
                {!course.published && (
                  <PublishButton courseId={course.id} title={course.title} />
                )}
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="hover:bg-primary/10 hover:border-primary/30"
                >
                  <Link to={`/instructor/edit-course/${course.id}`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                {course.published && (
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="hover:bg-primary/10 hover:border-primary/30"
                  >
                    <Link
                      to={`/course/${formatTitle(course.title)}/${course.id}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </m.div>
  );
}
