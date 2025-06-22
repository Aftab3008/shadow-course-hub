import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Clock, Users } from "lucide-react";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    instructor: {
      name: string;
      avatar: string;
    };
    rating: number;
    reviews: number;
    students: number;
    duration: string;
    price: number;
    originalPrice?: number;
    category: string;
    level: string;
  };
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
              className="bg-background/80 text-foreground"
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

        <div className="flex items-center space-x-2 mb-3">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={course.instructor.avatar}
              alt={course.instructor.name}
            />
            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
              {course.instructor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            {course.instructor.name}
          </span>
        </div>

        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{course.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({course.reviews})
            </span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-sm">{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{course.duration}</span>
          </div>
        </div>

        <Badge variant="outline" className="text-xs">
          {course.category}
        </Badge>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-foreground">
              ${course.price}
            </span>
            {course.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${course.originalPrice}
              </span>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
