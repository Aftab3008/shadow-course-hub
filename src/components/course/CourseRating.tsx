
import { Star } from "lucide-react";

interface CourseRatingProps {
  rating: number;
  reviews: number;
}

const CourseRating = ({ rating, reviews }: CourseRatingProps) => {
  return (
    <div className="flex items-center space-x-1">
      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      <span className="text-sm font-medium">{rating}</span>
      <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
  );
};

export default CourseRating;
