import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Course } from "@/types/course";
import { Link } from "react-router-dom";
import CourseInstructor from "./CourseInstructor";
import CoursePrice from "./CoursePrice";
import CourseStats from "./CourseStats";

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border bg-card">
      <Link to={`/course/${course.id}`}>
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className="bg-background/80 text-foreground capitalize"
            >
              {course.level}
            </Badge>
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link to={`/course/${course.id}`}>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {course.title}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {course.description}
        </p>

        <div className="mb-3">
          <CourseInstructor instructor={course.instructor} />
        </div>

        <div className="flex items-center justify-between mb-3">
          {/* <CourseRating rating={course.rating} reviews={course.reviews} /> */}
        </div>

        <div className="mb-3">
          <CourseStats
            enrollments={course.enrollments.length}
            duration={course.duration}
          />
        </div>

        <Badge variant="outline" className="text-xs capitalize">
          {course.category.name}
        </Badge>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <CoursePrice
          price={course.price}
          originalPrice={course.OriginalPrice}
        />
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
